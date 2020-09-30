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

#### Required environment variables
* DB_HOST - Database host
* DB_PORT - Database host port
* DB_PROVIDER - Database type
* DB_SCHEMA - Database name to connect to
* DB_USER - Database username
* DB_PASSWORD - Database password

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

## Known bugs

* Empty error message when trying to sign-up with incorrect e-mail
