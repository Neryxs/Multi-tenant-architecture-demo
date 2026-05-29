
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

beforeEach(async () => {
  // Borra datos de pruebas para evitar conflictos de email/tenant
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();
});

describe('Auth Integration', () => {
  it('should register and login a user', async () => {
    // Generar datos únicos por test
    const unique = Date.now() + Math.floor(Math.random() * 1000);
    const email = `test${unique}@acme.com`;
    const tenant = `acme${unique}`;

    const res = await request(app)
      .post('/api/auth/register')
      .set('x-tenant', tenant)
      .send({ email, password: 'Admin123!', tenant });
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.accessToken).toBeDefined();

    const login = await request(app)
      .post('/api/auth/login')
      .set('x-tenant', tenant)
      .send({ email, password: 'Admin123!' });
    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeDefined();
  });
});
