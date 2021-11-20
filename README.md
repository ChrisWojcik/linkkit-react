# Linkkit

Linkkit is a WIP of a reddit clone built with [NestJS](https://nestjs.com/) and [React](https://reactjs.org/)/[Next.js](https://nextjs.org/).

## Project Structure

This project is structured as a monorepo using npm's [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

```
├── api           // NestJS backend api
├── web           // Next.js frontend
```

## Local Development Setup

This project requires node v16.10.0 and npm >= 7. Assuming you are using [Node Version Manager](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

Install dependencies.

```bash
npm install
```

Copy the `.env.example` file in the `./api` project as `.env` and change any desired values (e.g. postgres password).

Start the local [Postgres](https://www.postgresql.org/) database (managed via a [Docker](https://www.docker.com/) container) and run migrations and seeds.

This guide will assume you are using [Docker Desktop](https://www.docker.com/products/docker-desktop).

```bash
npm run dev-env -- start
npm run db:migrate
npm run db:seed:all
```

Start the application.

```bash
npm run dev
```

## Git Hooks

Git Hooks are set up via [Husky](https://typicode.github.io/husky/#/).

- **pre-commit** - linting
- **pre-push** - unit tests
