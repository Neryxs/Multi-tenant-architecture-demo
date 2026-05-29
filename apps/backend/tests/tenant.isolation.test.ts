
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

beforeEach(async () => {
  // Borra datos de pruebas para evitar conflictos de email/tenant
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();
});

describe('Tenant Isolation', () => {
  it('should not allow tenant data leakage', async () => {
    // Register user in Acme
    const acmeRes = await request(app)
      .post('/api/auth/register')
      .set('x-tenant', 'acme')
      .send({ email: 'isotest@acme.com', password: 'Admin123!', tenant: 'acme' });
    const acmeToken = acmeRes.body.accessToken;

    // Register user in Globex
    const globexRes = await request(app)
      .post('/api/auth/register')
      .set('x-tenant', 'globex')
      .send({ email: 'isotest@globex.com', password: 'Admin123!', tenant: 'globex' });
    const globexToken = globexRes.body.accessToken;

    // Acme crea proyecto
    const project = await request(app)
      .post('/api/projects')
      .set('x-tenant', 'acme')
      .set('Authorization', `Bearer ${acmeToken}`)
      .send({ name: 'Proyecto Acme' });
    expect(project.status).toBe(201);

    // Globex NO puede ver proyectos de Acme
    const globexProjects = await request(app)
      .get('/api/projects')
      .set('x-tenant', 'globex')
      .set('Authorization', `Bearer ${globexToken}`);
    expect(
      globexProjects.body.find((p: { name: string }) => p.name === 'Proyecto Acme'),
    ).toBeUndefined();
  });
});
