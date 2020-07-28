SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+02:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Industries`
(
    `id`           smallint UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(32)       NOT NULL,
    `description`  text                       DEFAULT NULL,
    `creationDate` date              NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Industries`
    ADD UNIQUE `AK_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Activities`
(
    `id`          int UNSIGNED      NOT NULL AUTO_INCREMENT,
    `name`        varchar(32)       NOT NULL,
    `description` text DEFAULT NULL,
    `industryId`  smallint UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Activities`
    ADD UNIQUE `AK_name` (`name`);

--
-- Constraints
--
ALTER TABLE `Activities`
    ADD CONSTRAINT `FK_activity_industry` FOREIGN KEY (`industryId`) REFERENCES `Industries` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Companies`
(
    `id`           int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(32)  NOT NULL,
    `description`  text                  DEFAULT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Companies`
    ADD UNIQUE `AK_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `CompaniesActivities`
(
    `companyId`    int UNSIGNED NOT NULL,
    `activityId`   int UNSIGNED NOT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`companyId`, `activityId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `CompaniesActivities`
    ADD CONSTRAINT `FK_ca_company` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`),
    ADD CONSTRAINT `FK_ca_activity` FOREIGN KEY (`activityId`) REFERENCES `Activities` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Countries`
(
    `id`           smallint UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(32)       NOT NULL,
    `creationDate` date              NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Countries`
    ADD UNIQUE `AK_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Premises`
(
    `id`           int UNSIGNED      NOT NULL AUTO_INCREMENT,
    `label`        varchar(32)       NOT NULL,
    `companyId`    int UNSIGNED      NOT NULL,
    `countryId`    smallint UNSIGNED NOT NULL,
    `creationDate` date              NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Premises`
    ADD UNIQUE `AK_label` (`label`);

--
-- Constraints
--
ALTER TABLE `Premises`
    ADD CONSTRAINT `FK_premise_company` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`),
    ADD CONSTRAINT `FK_premise_country` FOREIGN KEY (`countryId`) REFERENCES `Countries` (`id`);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
