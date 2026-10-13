# SamaBiz

**SamaBiz — Ton business. Un seul endroit.**

SamaBiz est une base SaaS multi-tenant pour aider les entrepreneurs, commerçants, freelances et petites entreprises à gérer clients, produits, ventes, commandes, factures, dépenses, stock, statistiques, utilisateurs et abonnements depuis une seule plateforme.

## Architecture

```text
samabiz/
├── front/  # Angular, Tailwind CSS, Angular Router, Reactive Forms
└── back/   # Node.js, TypeScript, Express, Prisma, PostgreSQL
```

Le backend suit une Clean Architecture:

```text
presentation -> application -> domain
infrastructure -> domain
```

Les use cases dépendent d'interfaces du domaine. Les controllers ne manipulent pas Prisma directement.

## Prérequis

- Node.js 22+
- npm 10+
- Docker et Docker Compose
- PostgreSQL si lancement sans Docker

## Installation

```bash
cd back
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

```bash
cd front
npm install
npm start
```

## Docker

```bash
docker compose up --build
```

Services par défaut:

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api
- Swagger: http://localhost:3000/api/docs
- PostgreSQL: localhost:5432

## Variables d'environnement backend

Voir [back/.env.example](/home/khadidiatou/Documents/Projet%20PERSO/Sunubiz/back/.env.example).

## Commandes backend

```bash
npm run dev
npm run build
npm run start
npm run test
npm run prisma:generate
npm run prisma:migrate
```

## Commandes frontend

```bash
npm start
npm run build
npm run test
```

## Roadmap MVP

1. Authentification, JWT, refresh token, rôles et entreprise.
2. Isolation multi-tenant dans les use cases.
3. Clients et produits.
4. Ventes avec mouvements de stock.
5. Dashboard et statistiques.
6. Abonnements, paiements et notifications.
