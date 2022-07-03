## Rate The Landlord

A simple website for Renter's to rate their Landlord

## Running the app

1. [Download](https://www.docker.com/products/docker-desktop/) Docker desktop.

2. Created `.env` file based on `.env.example`

3. Run docker compose to start the required services:
```bash
# development
$ docker compose up api-dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lint

```bash
$ npm run lint
```

## Formatting

```bash
$ npm run format
```

## Migrations

Migrations are located in `src/database/migrations`. They are automatically ran on startup.

For more info, [Ley](https://github.com/lukeed/ley).