// Tipos y utilidades compartidas para el monorepo multi-tenant
export type Role = 'ADMIN' | 'USER';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  tenantId: string;
}

export interface Project {
  id: string;
  name: string;
  tenantId: string;
}

// Puedes agregar más utilidades y tipos compartidos aquí
