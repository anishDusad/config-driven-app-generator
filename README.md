# Config-Driven Fullstack Application Generator

A dynamic config-driven application generator that converts structured JSON configurations into fully functional fullstack applications.

The platform dynamically generates:
- frontend UI
- backend APIs
- data handling workflows
- authentication flows
- database interactions

without hardcoded business logic.

Inspired by modern internal tooling and low-code platforms like Base44, Retool, and Appsmith.

---

# Live Demo

https://buildo-ml690al3h-anish-dusads-projects.vercel.app

---

# Problem Statement

Traditional applications are rigid and tightly coupled to predefined schemas and UI logic.

This project solves that problem by building a flexible runtime system that:
- reads JSON configurations
- dynamically renders applications
- handles inconsistent inputs
- supports changing schemas
- allows extensibility without rewriting core logic

The system is designed to remain stable even when:
- configurations are incomplete
- fields are missing
- unknown components are introduced
- schemas evolve over time

---

# Core Features

## Dynamic Application Runtime

The platform dynamically interprets JSON configurations to generate:
- forms
- tables
- CRUD workflows
- API interactions

No entity-specific UI is hardcoded.

---

## Dynamic Frontend Rendering

The frontend automatically generates UI based on configuration files.

Supported capabilities:
- dynamic forms
- dynamic tables
- loading states
- error handling
- unsupported field handling
- responsive layouts

The rendering engine is extensible and supports adding new field types easily.

---

## Dynamic Backend APIs

The backend provides:
- dynamic CRUD operations
- validation handling
- error handling
- flexible JSON-based storage

The architecture avoids rigid entity-specific API implementations.

---

## PostgreSQL + JSONB Architecture

Instead of generating new SQL schemas for every entity, the platform uses PostgreSQL JSONB storage.

Benefits:
- schema flexibility
- resilience to config changes
- optional field support
- easier edge-case handling
- dynamic extensibility

Example stored structure:

```json
{
  "fullName": "Anish",
  "email": "anish@gmail.com",
  "notes": "Dynamic app generator"
}
```

---

## Authentication System

Implemented authentication features:
- email/password signup
- JWT-based login
- bcrypt password hashing
- protected API routes
- user-scoped data access

Each user can only access their own records.

---

## CSV Import System

The platform supports:
- CSV uploads
- dynamic parsing
- record insertion
- automatic rendering in tables

CSV imports work directly with the config-driven architecture.

Example CSV:

```csv
fullName,email,age,notes
Anish,anish@gmail.com,23,Imported via CSV
```

---

## Localization Support

The application includes:
- multi-language support
- dynamic language switching
- configurable translation structure

---

## Responsive SaaS UI

The frontend is designed with:
- responsive layouts
- dashboard-style architecture
- modern SaaS-inspired styling
- clean component structure

---

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- PostgreSQL
- Neon PostgreSQL

## Authentication
- JWT
- bcrypt

## Deployment
- Vercel
- Render

---

# Project Structure

```txt
app-generator/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── validators/
│   │   └── index.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── fields/
│   │   │   └── renderer/
│   │   ├── lib/
│   │   ├── styles/
│   │   └── types/
│   │
│   ├── package.json
│   └── next.config.ts
│
├── configs/
│   └── crm.json
│
└── README.md
```

---

# How The System Works

## 1. Config Definition

Applications are defined using JSON configuration files.

Example:

```json
{
  "entity": "customers",
  "label": "Customers",
  "fields": [
    {
      "name": "fullName",
      "label": "Full Name",
      "type": "text",
      "required": true
    },
    {
      "name": "email",
      "label": "Email",
      "type": "email"
    }
  ]
}
```

---

## 2. Frontend Runtime Generation

The frontend reads the config and dynamically generates:
- input components
- forms
- tables
- labels
- placeholders

without writing entity-specific JSX.

---

## 3. Backend Processing

Submitted form data is sent to dynamic API endpoints.

The backend:
- validates requests
- stores records
- returns structured responses
- handles malformed inputs safely

---

## 4. Flexible Data Storage

Records are stored using PostgreSQL JSONB fields.

This allows:
- changing schemas
- optional fields
- unknown fields
- extensibility

without database migrations.

---

# API Overview

## Authentication Routes

### Signup

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/login
```

---

## Record Routes

### Create Record

```http
POST /api/records/:entity
```

### Get Records

```http
GET /api/records/:entity
```

---

# Extensibility

The architecture is intentionally modular.

New functionality can be added by:
- registering new field components
- extending config schemas
- adding validators
- introducing new renderers
- extending backend handlers

without rewriting the core runtime.

---

# Edge Cases Handled

The system handles:
- missing config fields
- unsupported components
- invalid CSV structures
- optional fields
- schema mismatches
- authentication failures
- malformed requests
- empty datasets
- dynamic rendering failures

---

# Local Development Setup

## Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

```bash
cd app-generator
```

---

# Backend Setup

## Install Dependencies

```bash
cd backend
```

```bash
npm install
```

---

## Create Environment File

Create:

```txt
backend/.env
```

Add:

```env
PORT=5000

DATABASE_URL=YOUR_DATABASE_URL

JWT_SECRET=your_secret_key
```

---

## Start Backend

```bash
npm run dev
```

---

# Frontend Setup

## Install Dependencies

```bash
cd frontend
```

```bash
npm install
```

---

## Create Environment File

Create:

```txt
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Start Frontend

```bash
npm run dev
```

---

# Production Deployment

## Frontend Deployment
- Vercel

## Backend Deployment
- Render

## Database Hosting
- Neon PostgreSQL

---

# Production Environment Variables

## Frontend

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL
```

## Backend

```env
DATABASE_URL=YOUR_NEON_DATABASE_URL

JWT_SECRET=your_secret_key
```

---

# License

MIT License

Use it.
Fork it.
Break it.
Scale it.
Deploy it.

If your dynamically generated CRM becomes self-aware and starts asking for equity, that part is on you.
