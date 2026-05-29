import request from 'supertest';
import app from '../src/app';

describe('Tenant Isolation', () => {
  it('should not allow tenant data leakage', async () => {
    // Register user in Acme
    const acmeRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'isotest@acme.com', password: 'Admin123!', tenant: 'acme' });
    const acmeToken = acmeRes.body.accessToken;

    // Register user in Globex
    const globexRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'isotest@globex.com', password: 'Admin123!', tenant: 'globex' });
    const globexToken = globexRes.body.accessToken;

    // Acme crea proyecto
    const project = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${acmeToken}`)
      .send({ name: 'Proyecto Acme' });
    expect(project.status).toBe(201);

    // Globex NO puede ver proyectos de Acme
    const globexProjects = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${globexToken}`);
    expect(
      globexProjects.body.find((p: { name: string }) => p.name === 'Proyecto Acme'),
    ).toBeUndefined();
  });
});
