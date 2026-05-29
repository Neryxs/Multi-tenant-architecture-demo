# Makefile para tareas comunes
up:
	docker compose up --build

stop:
	docker compose down

seed:
	cd apps/backend && npx prisma db seed

lint:
	npm run lint

test:
	npm run test

format:
	npm run format
