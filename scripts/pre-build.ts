import { execSync } from 'child_process'

/**
 * Script executado antes do build
 * - Gera o cliente Prisma (sempre necessário)
 * - Tenta executar migrations (não falha o build se banco não estiver disponível)
 */
function preBuild() {
  console.log('🔧 Preparando build...')

  // 1. Sempre gera o cliente Prisma (necessário para o build)
  console.log('📦 Gerando cliente Prisma...')
  try {
    execSync('npx prisma generate', {
      stdio: 'inherit',
      cwd: process.cwd()
    })
    console.log('✅ Cliente Prisma gerado com sucesso')
  } catch (error) {
    console.error('❌ Erro ao gerar cliente Prisma:', error)
    process.exit(1)
  }

  // 2. Tenta executar migrations (opcional - não falha o build se não conseguir)
  const shouldRunMigrations =
    process.env.RUN_MIGRATIONS === 'true' ||
    process.env.NODE_ENV === 'production'

  if (shouldRunMigrations) {
    console.log('🔄 Executando migrations...')
    try {
      execSync('npx prisma migrate deploy', {
        stdio: 'inherit',
        cwd: process.cwd()
      })
      console.log('✅ Migrations executadas com sucesso')
    } catch (error) {
      console.warn('⚠️  Não foi possível executar migrations durante o build')
      console.warn('ℹ️  As migrations serão executadas em runtime se necessário')
      // Não falha o build - migrations podem ser executadas depois
    }
  } else {
    console.log('ℹ️  Migrations não executadas (use RUN_MIGRATIONS=true para executar)')
  }

  console.log('✅ Pré-build concluído')
}

try {
  preBuild()
} catch (error) {
  console.error('💥 Erro durante pré-build:', error)
  process.exit(1)
}
