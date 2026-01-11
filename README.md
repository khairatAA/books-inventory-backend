# Books Inventory API (Backend)

This is the backend API for the Books Inventory application.  
Built with **NestJS**, **GraphQL**, **TypeORM**, and **SQLite**. The API handles authentication via **Auth0** and provides full CRUD operations for books.

---

## Project Structure

```bash
src/
│
├── auth/ # Authentication module (JWT strategy, guards, roles)
├── book/ # Books module (entity, service, resolver)
├── app.controller.ts # Basic controller for root route
├── app.module.ts # Root module, imports feature modules
├── app.resolver.ts # Global GraphQL resolver
└── main.ts # Application bootstrap
```

---

## Features

- JWT authentication using **Auth0**
- Role-based access control (`admin` role)
- GraphQL API with **Apollo Server**
- CRUD operations for books
- TypeORM integration with SQLite (local database)

---

## Environment Variables

Create a `.env` file in the root and add the following:

```bash
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
```

---

## Running the App

Install dependencies:

```bash
npm install
# or
yarn install
```

Start the server in development mode:

```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at:

```bash
http://localhost:3000
```

GraphQL Playground:

```bash
http://localhost:3000/graphql
```
