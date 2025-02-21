# Community Forums

## Techstack

- Frontend: Typescript, Next JS, NextAuth, React, Shadcn UI, Tailwind CSS, CSS
- Backend: Node, Typescript, Prisma ORM, PostgreSQL
- Architecture: Client-Server with REST API

## Features & Requirements

### Authentication

- Users must be able to sign up and sign in using any authentication provider.
- Used NextAuth.JS for authentication using github as a provider

### Forums

- Users can create, update, and delete their own forums.
- Each forum have:
- Title
- Description
- Tags (JSONB field)
- Created timestamp
- Only the creator of a forum can edit or delete it.

### Comments & Questions

- Other users can comment or ask questions under a forum.
- Each comment/question should have:
- Content
- Timestamp
- User who posted it
- Only the comment owner can delete their own comments.

## Dependecies

- Next JS v14
- Node JS v18.18.0
- NPM v9.8.1

# Frontend App

# Configuration

Create a .env file and add the below configuration

```
GITHUB_ID=<YOUR_GITHUB_ID>
GITHUB_SECRET=<GITHUB_SECRET>
NEXTAUTH_SECRET=iiuBTkMSoYKG/5gV81nYqnZhP+oel3AIqjB45O0O1xc=
BACKEND_URL=http://localhost:3001 or <backend url>
NEXT_PUBLIC_BACKEND_SERVER_URL=http://localhost:3001 or  <backend url>
```

## How to run the project

navigate to project root directory /forums-frontend

```
npm install
```

```
npm run dev
```

# Backend App

## Configuration

Create a database named

```
forumsdb
```

Create and update your postgreql connection in .env

```
DATABASE_URL="postgresql://postgres:<your_user_name>@<your_host>:<port_number>/forumsdb"
PORT=3001
```

## How to run the project

navigate to project root directory /forums-backend

Install dependecies

```
npm install
```

Migrate database from schema.prisma

```
npx prisma migrate dev
```

Run the server

```
npm run start
```
