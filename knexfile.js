module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/foobar',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/foobartest',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}ssl=true`,
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }
};
