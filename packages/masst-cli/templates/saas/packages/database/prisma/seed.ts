import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if --check flag is passed (just check if DB needs seeding)
  const isCheck = process.argv.includes('--check');

  // Check if database already has data
  const userCount = await prisma.user.count();

  if (isCheck) {
    if (userCount > 0) {
      console.log('has-data');
      return;
    } else {
      console.log('needs-seed');
      // Continue to seed
    }
  }

  // If data exists and not forcing, skip
  if (userCount > 0 && !process.argv.includes('--force')) {
    console.log('Database already has data. Use --force to re-seed.');
    return;
  }

  console.log('🌱 Seeding database...');

  // Create demo tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { slug: 'demo-org' },
    update: {},
    create: {
      name: 'Demo Organization',
      slug: 'demo-org',
    },
  });

  console.log('✅ Created demo tenant:', demoTenant.name);

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'OWNER',
      tenantId: demoTenant.id,
    },
  });

  console.log('✅ Created demo user:', demoUser.email);
  console.log('');
  console.log('📧 Demo credentials:');
  console.log('   Email: demo@example.com');
  console.log('   Password: demo123');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
