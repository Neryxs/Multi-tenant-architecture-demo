import request from 'supertest';
import app from '../src/app';

describe('Auth Integration', () => {
  it('should register and login a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@acme.com', password: 'Admin123!', tenant: 'acme' });
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.accessToken).toBeDefined();

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@acme.com', password: 'Admin123!' });
    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeDefined();
  });
});
