## Description

Stateless authentication service using JWT standard, developed with Nest framework.

## Requirements

1. Node.js 12.x
2. Any TypeORM supported RDBMS

> Warning: only tested with MySQL database

## Installation

> Note: these steps are only for non-docker users

1. Download all dependencies: 
    ```shell script
    npm install
    ```

2. Build service (only for production)
   ```shell script
   npm run build
   ```

## Usage

#### Environment variables
##### Required
* DB_SCHEMA - Database name to connect to
* DB_USER - Database username
* DB_PASSWORD - Database password
* TOKEN_ISSUER - identifies the principal that issued the JWT
* TOKEN_AUDIENCE - Identifies the recipients that the JWT is intended for
##### Optional
* APP_PORT - Application port (default: 3000)
* BCRYPT_ROUNDS - Number of rounds for hashing a password (default: 12)
* DB_HOST - Database host (default: localhost)
* DB_PROVIDER - Database type (default: mysql)
* DB_PORT - Database host port (default: 3306)
* TYPEORM_SYNCHRONIZE - Synchronize entities to database (default: false)
* TOKEN_EXPIRATION - JWT expiration time in minutes (default: 15)

#### Running the app

> Note: these steps are only for non-docker users

###### In development
```shell script
npm run start:debug
```

###### In production
```shell script
npm run start:prod
```

## Features

* Local sign-in/sign-up
* Verification keys distribution using JWK standard
* Rotating signing keys

## Enhancements

* Route "forgot password ?"
* Route for retrieving refresh token
* E-mail verification for local accounts
* Check if user banned
* Move keystore from in-memory to external service (ex: redis)
* Extract scheduler logic from jwtService to workerService
* Better error handling

## Known bugs

* Empty error message when trying to sign-up with incorrect e-mail
