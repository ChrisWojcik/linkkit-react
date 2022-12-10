# Linkkit

Linkkit is a WIP of a reddit clone built with [NestJS](https://nestjs.com/) and [React](https://reactjs.org/).

## Project Structure

This project is structured as a monorepo using npm's [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

```
├── api           // NestJS backend api
├── web           // React frontend
```

### Working with workspaces

Commands can be scoped to a particular workspace by using the workspace option `-w` with the name of the workspace. In general, workspace specific dependencies (e.g. `@nestjs/core` for the api, or `react` for the frontend) should be installed to that workspace. Npm scripts can be defined in root `package.json` for convenience as needed.

```bash
# examples only
npm install react -w web
npm run dev -w api
```

See npm's documentation and the project's multiple `package.json` files for further information.

## Local Development Setup

This project requires npm >= 7. Assuming you are using [Node Version Manager](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

Install dependencies (all workspaces).

```bash
npm install
```

A local dev environment (managed via [Docker](https://www.docker.com/) containers) provides a local instance of a [Postgres](https://www.postgresql.org/) database. This guide will assume you are using [Docker Desktop](https://www.docker.com/products/docker-desktop).

The local dev environment is defined via a [Docker Compose](https://docs.docker.com/compose/compose-file/) file, and shorthand commands are available to interact with the Docker containers.

To see available commands:

```bash
npm run dev-env help
```

Copy the `.env.example` file in the `./local-dev-env` folder as `.env` and change any desired values (e.g. postgres password).

Start the local database, run migrations, and seed initial data.

```bash
npm run dev-env start
npm run db:migrate:dev
npm run db:seed:dev
```

Start the application (runs both the frontend and backend).

```bash
npm run dev
```
