
-- MySQL 2 PostgreSQL dump

SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;

DROP SEQUENCE IF EXISTS "BoundaryUsers_id_seq" CASCADE;
CREATE SEQUENCE "BoundaryUsers_id_seq" INCREMENT BY 1
    NO MAXVALUE NO MINVALUE CACHE 1;
SELECT pg_catalog.setval('"BoundaryUsers_id_seq"', 1, true);

-- Table: BoundaryUsers
DROP TABLE IF EXISTS "BoundaryUsers" CASCADE;
CREATE TABLE "BoundaryUsers" (
                                 "id" bigint DEFAULT nextval('"BoundaryUsers_id_seq"'::regclass) NOT NULL,
                                 "firstname" character varying(45) NOT NULL,
                                 "lastname" character varying(80) NOT NULL,
                                 "email" character varying(320) NOT NULL,
                                 "lastLoginAt" timestamp without time zone,
                                 "banned" boolean DEFAULT false NOT NULL
)
    WITHOUT OIDS;

-- Table: LocalAccounts
DROP TABLE IF EXISTS "LocalAccounts" CASCADE;
CREATE TABLE "LocalAccounts" (
                                 "fkUserId" bigint NOT NULL,
                                 "lastPasswordFailureAt" timestamp without time zone,
                                 "passwordFailureSinceLastSuccess" smallint DEFAULT 0 NOT NULL,
                                 "password" character varying(120) NOT NULL,
                                 "passwordChangedAt" timestamp without time zone,
                                 "emailVerified" boolean DEFAULT false NOT NULL,
                                 "emailConfirmationToken" character varying(128) NOT NULL,
                                 "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
)
    WITHOUT OIDS;

DROP SEQUENCE IF EXISTS "OAuth2Providers_id_seq" CASCADE;
CREATE SEQUENCE "OAuth2Providers_id_seq" INCREMENT BY 1
    NO MAXVALUE NO MINVALUE CACHE 1;
SELECT pg_catalog.setval('"OAuth2Providers_id_seq"', 1, true);

-- Table: OAuth2Providers
DROP TABLE IF EXISTS "OAuth2Providers" CASCADE;
CREATE TABLE "OAuth2Providers" (
                                   "id" smallint DEFAULT nextval('"OAuth2Providers_id_seq"'::regclass) NOT NULL,
                                   "name" character varying(45) NOT NULL
)
    WITHOUT OIDS;

-- Table: OpenIDAccounts
DROP TABLE IF EXISTS "OpenIDAccounts" CASCADE;
CREATE TABLE "OpenIDAccounts" (
                                  "fkUserId" bigint NOT NULL,
                                  "subject" character varying(45) NOT NULL,
                                  "emailVerified" boolean DEFAULT false NOT NULL,
                                  "fkProviderId" smallint NOT NULL,
                                  "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
)
    WITHOUT OIDS;
COMMENT ON TABLE "OpenIDAccounts" is 'https://openid.net/specs/openid-connect-core-1_0.html';

ALTER TABLE "BoundaryUsers" ADD CONSTRAINT "BoundaryUsers_id_pkey" PRIMARY KEY("id");

DROP INDEX IF EXISTS "BoundaryUsers_email" CASCADE;
CREATE UNIQUE INDEX "BoundaryUsers_email" ON "BoundaryUsers" ("email");

ALTER TABLE "LocalAccounts" ADD CONSTRAINT "LocalAccounts_fkUserId_pkey" PRIMARY KEY("fkUserId");
DROP INDEX IF EXISTS "LocalAccounts_emailConfirmationToken" CASCADE;
CREATE UNIQUE INDEX "LocalAccounts_emailConfirmationToken" ON "LocalAccounts" ("emailConfirmationToken");

ALTER TABLE "OAuth2Providers" ADD CONSTRAINT "OAuth2Providers_id_pkey" PRIMARY KEY("id");
DROP INDEX IF EXISTS "OAuth2Providers_name" CASCADE;
CREATE UNIQUE INDEX "OAuth2Providers_name" ON "OAuth2Providers" ("name");

ALTER TABLE "OpenIDAccounts" ADD CONSTRAINT "OpenIDAccounts_fkUserId_fkProviderId_pkey" PRIMARY KEY("fkUserId", "fkProviderId");
DROP INDEX IF EXISTS "OpenIDAccounts_fkProviderId" CASCADE;
CREATE INDEX "OpenIDAccounts_fkProviderId" ON "OpenIDAccounts" ("fkProviderId");

ALTER TABLE "LocalAccounts" ADD FOREIGN KEY ("fkUserId")
    REFERENCES "BoundaryUsers"(id);ALTER TABLE "OpenIDAccounts" ADD FOREIGN KEY ("fkProviderId")
    REFERENCES "OAuth2Providers"(id);

ALTER TABLE "OpenIDAccounts" ADD FOREIGN KEY ("fkUserId")
    REFERENCES "BoundaryUsers"(id);
