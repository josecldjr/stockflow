import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@stockflow.com' },
    update: {},
    create: {
      email: 'admin@stockflow.com',
      name: 'Admin User',
      password: 'password123'
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user@stockflow.com' },
    update: {},
    create: {
      email: 'user@stockflow.com',
      name: 'Regular User',
      password: 'password123'
    }
  })

  console.log('✅ Database seeded successfully')
  console.log('Created users:', { user1, user2 })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
