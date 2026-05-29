import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.tenant.createMany({
    data: [
      { name: 'Acme', slug: 'acme' },
      { name: 'Globex', slug: 'globex' },
    ],
    skipDuplicates: true,
  });

  const acme = await prisma.tenant.findUnique({ where: { slug: 'acme' } });
  const globex = await prisma.tenant.findUnique({ where: { slug: 'globex' } });

  if (acme) {
    await prisma.user.upsert({
      where: { email: 'admin@acme.com' },
      update: {},
      create: {
        email: 'admin@acme.com',
        password: await hash('Admin123!', 10),
        role: 'ADMIN',
        tenantId: acme.id,
      },
    });
  }
  if (globex) {
    await prisma.user.upsert({
      where: { email: 'admin@globex.com' },
      update: {},
      create: {
        email: 'admin@globex.com',
        password: await hash('Admin123!', 10),
        role: 'ADMIN',
        tenantId: globex.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
