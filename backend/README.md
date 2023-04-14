## Rate The Landlord

A simple website for Renter's to rate their Landlord

## MVP API Routes

Get all Reviews (Later to be changed to get first set of reviews for pagination)
`GET /api/review`

Change a Review (This is done after Admin Review)
`PUT /api/review/:id`

Delete a Review (Done after Admin Review)
`DELETE /api/review/:id`

Create new review in the DB
`POST /api/create-review`

Get all reviews that have been flagged for Admin Review
`GET /api/flagged`

Log in to Admin Panel
`POST /api/auth`

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
