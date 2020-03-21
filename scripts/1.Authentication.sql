-- MySQL Script generated by MySQL Workbench
-- ven. 20 mars 2020 22:22:25 EDT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Authentication
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Authentication
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Authentication` DEFAULT CHARACTER SET utf8;
USE `Authentication`;

-- -----------------------------------------------------
-- Table `Authentication`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Authentication`.`BoundaryUsers`
(
    `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstname`   VARCHAR(45)  NOT NULL,
    `lastname`    VARCHAR(80)  NOT NULL,
    `email`       VARCHAR(320) NOT NULL,
    `lastLoginAt` TIMESTAMP    NULL     DEFAULT NULL,
    `banned`      TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC)
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Authentication`.`LocalAccounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Authentication`.`LocalAccounts`
(
    `fkUserId`                       INT UNSIGNED     NOT NULL,
    `lastPasswordFailureAt`          TIMESTAMP        NULL     DEFAULT NULL,
    `passwordFailureSinceLastSucess` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `password`                       VARCHAR(120)     NOT NULL,
    `passwordChangedAt`              TIMESTAMP        NULL     DEFAULT NULL,
    `emailVerified`                  TINYINT(1)       NOT NULL DEFAULT 0,
    `emailConfirmationToken`         VARCHAR(128)     NOT NULL,
    `createdAt`                      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`fkUserId`),
    UNIQUE INDEX `confirmationToken_UNIQUE` (`emailConfirmationToken` ASC),
    CONSTRAINT `LocalAccountsUsers`
        FOREIGN KEY (`fkUserId`)
            REFERENCES `Authentication`.`BoundaryUsers` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Authentication`.`OAuth2Providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Authentication`.`OAuth2Providers`
(
    `id`   TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45)      NOT NULL,
    UNIQUE INDEX `name_UNIQUE` (`name` ASC),
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Authentication`.`OpenIDAccounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Authentication`.`OpenIDAccounts`
(
    `fkUserId`      INT UNSIGNED     NOT NULL,
    `subject`       VARCHAR(45)      NOT NULL,
    `emailVerified` TINYINT(1)       NOT NULL DEFAULT 0,
    `fkProviderId`  TINYINT UNSIGNED NOT NULL,
    `createdAt`     TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`fkUserId`, `fkProviderId`),
    INDEX `fk_OpenIDAccounts_1_idx` (`fkProviderId` ASC),
    CONSTRAINT `OpenIDAccountsUsers`
        FOREIGN KEY (`fkUserId`)
            REFERENCES `Authentication`.`BoundaryUsers` (`id`)
            ON DELETE RESTRICT
            ON UPDATE CASCADE,
    CONSTRAINT `OpenIDAccountsOAuth2Providers`
        FOREIGN KEY (`fkProviderId`)
            REFERENCES `Authentication`.`OAuth2Providers` (`id`)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    COMMENT = 'https://openid.net/specs/openid-connect-core-1_0.html';
#StandardClaims'';


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
