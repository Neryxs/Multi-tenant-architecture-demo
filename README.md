# Multi-Tenant Architecture Demo

![Logo Placeholder](docs/logo-placeholder.png)

## Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Stack Tecnológico](#stack-tecnológico)
- [Flujo de Autenticación](#flujo-de-autenticación)
- [Aislamiento de Tenants](#aislamiento-de-tenants)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instrucciones Docker](#instrucciones-docker)
- [Ejemplos de Requests](#ejemplos-de-requests)
- [Screenshots](#screenshots)
- [Créditos](#créditos)

## Descripción

Este proyecto demuestra una arquitectura multi-tenant moderna, con aislamiento lógico por tenant, autenticación JWT, roles, RBAC, branding, auditoría, tests y despliegue listo para producción.

## Arquitectura

- **Frontend:** Next.js 15, TypeScript, TailwindCSS, shadcn/ui
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Redis
- **Infraestructura:** Docker, Docker Compose, Nginx (reverse proxy), CI/CD, Makefile

![Arquitectura Placeholder](docs/architecture-placeholder.png)

## Stack Tecnológico

- Next.js 15, TypeScript, TailwindCSS, shadcn/ui, Axios, Zustand
- Node.js, Express, Prisma, PostgreSQL, JWT, Zod, Swagger, Redis, Morgan, Helmet, CORS
- Docker, Docker Compose, Nginx, CI/CD, ESLint, Prettier

## Flujo de Autenticación

1. Usuario se registra o inicia sesión
2. Se resuelve el tenant por subdominio/header
3. Se genera JWT con userId, tenantId, role
4. Acceso a endpoints y datos filtrados por tenant

## Aislamiento de Tenants

- Middleware detecta tenant por hostname/header
- Todas las queries filtran por tenantId
- Un tenant no puede ver datos de otro

## Estructura del Proyecto

```
/apps
  /frontend
  /backend
/packages
  /shared
/docker
/docs
```

## Instrucciones Docker

```sh
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- DB: localhost:5432
- Redis: localhost:6379

## Ejemplos de Requests

### Registro

POST /auth/register

```
{
  "email": "admin@acme.com",
  "password": "Admin123!",
  "tenant": "acme"
}
```

### Login

POST /auth/login

```
{
  "email": "admin@acme.com",
  "password": "Admin123!"
}
```

### Obtener proyectos

GET /projects (con JWT)

## Screenshots

- ![Pantalla Login](docs/screenshot-login-placeholder.png)
- ![Dashboard](docs/screenshot-dashboard-placeholder.png)

> Las imágenes son placeholders, reemplazar por capturas reales tras el deploy.

## Créditos

Desarrollado por [Neryxs].

---

> Para detalles técnicos, ver la documentación en /docs y comentarios en el código.
