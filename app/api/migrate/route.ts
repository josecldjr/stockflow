import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { prisma } from '@/lib/prisma'

/**
 * Endpoint para executar migrações manualmente
 * Útil para manutenção ou quando as migrações automáticas falharem
 *
 * Uso: POST /api/migrate
 * Headers: Authorization: Bearer <token-secreto>
 */
export async function POST(request: NextRequest) {
  try {
    // Verificação de segurança básica
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.MIGRATION_TOKEN || 'dev-migration-token'

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autorização necessário' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer '

    if (token !== expectedToken) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 403 }
      )
    }

    console.log('🔄 Iniciando migrações manuais...')

    // Verificar conexão com o banco
    try {
      await prisma.$connect()
      console.log('✅ Conexão com banco estabelecida')
    } catch (error) {
      console.error('❌ Erro de conexão:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return NextResponse.json(
        { error: 'Não foi possível conectar ao banco de dados', details: errorMessage },
        { status: 500 }
      )
    }

    // Executar migrações
    try {
      console.log('🔄 Executando prisma migrate deploy...')
      execSync('npx prisma migrate deploy', {
        stdio: 'pipe',
        cwd: process.cwd()
      })
      console.log('✅ Migrações executadas com sucesso')
    } catch (error: any) {
      console.error('❌ Erro nas migrações:', error.message)
      return NextResponse.json(
        {
          error: 'Falha ao executar migrações',
          details: error.message,
          stdout: error.stdout?.toString(),
          stderr: error.stderr?.toString()
        },
        { status: 500 }
      )
    }

    // Gerar cliente Prisma
    try {
      console.log('🔄 Gerando cliente Prisma...')
      execSync('npx prisma generate', {
        stdio: 'pipe',
        cwd: process.cwd()
      })
      console.log('✅ Cliente Prisma gerado')
    } catch (error: any) {
      console.error('❌ Erro ao gerar cliente:', error.message)
      return NextResponse.json(
        {
          error: 'Falha ao gerar cliente Prisma',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Migrações executadas com sucesso',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('💥 Erro interno:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * Endpoint GET para verificar status das migrações
 */
export async function GET() {
  try {
    await prisma.$connect()

    // Verificar se as tabelas principais existem
    const tables = ['users', 'organizations']
    const tableStatus: Record<string, boolean> = {}

    for (const table of tables) {
      try {
        const result = await prisma.$queryRaw`SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = ${table}
        )` as any[]

        tableStatus[table] = result[0]?.exists || false
      } catch {
        tableStatus[table] = false
      }
    }

    // Verificar migrações aplicadas
    let migrationsApplied = []
    try {
      migrationsApplied = await prisma.$queryRaw`
        SELECT migration_name, finished_at
        FROM _prisma_migrations
        WHERE finished_at IS NOT NULL
        ORDER BY finished_at DESC
        LIMIT 5
      ` as any[]
    } catch {
      migrationsApplied = []
    }

    return NextResponse.json({
      database: 'connected',
      tables: tableStatus,
      migrationsApplied: migrationsApplied.length,
      recentMigrations: migrationsApplied,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
