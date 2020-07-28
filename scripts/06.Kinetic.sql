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
CREATE TABLE `BodyParts`
(
    `id`           tinyint UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(20)      NOT NULL,
    `creationDate` date             NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `BodyParts`
    ADD UNIQUE `AK_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Sensors`
(
    `bodyPartId`   tinyint UNSIGNED NOT NULL,
    `productId`    int UNSIGNED     NOT NULL,
    `creationDate` date             NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`bodyPartId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `Sensors`
    ADD CONSTRAINT `FK_sensor_product` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`),
    ADD CONSTRAINT `FK_sensor_bodyPart` FOREIGN KEY (`bodyPartId`) REFERENCES `BodyParts` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Sessions`
(
    `id`           char(36)    NOT NULL,
    `durationTime` time        NOT NULL,
    `badgeId`      char(36)    NOT NULL,
    `personId`     char(36)    NOT NULL,
    `createdAt`    datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Sessions`
    ADD INDEX `IX_badge_person` (`badgeId`, `personId`);

--
-- Constraints
--
ALTER TABLE `Sessions`
    ADD CONSTRAINT `FK_session_badge` FOREIGN KEY (`badgeId`) REFERENCES `Badges` (`id`),
    ADD CONSTRAINT `FK_session_person` FOREIGN KEY (`personId`) REFERENCES `Persons` (`userId`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `PostureStates`
(
    `id`           tinyint UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(32)      NOT NULL,
    `creationDate` date             NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `PostureStates`
    ADD UNIQUE `AX_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Postures`
(
    `sessionId`      char(36)          NOT NULL,
    `count`          smallint UNSIGNED NOT NULL,
    `postureStateId` tinyint UNSIGNED  NOT NULL,
    `sensorId`       int UNSIGNED      NOT NULL,
    PRIMARY KEY (`sessionId`, `postureStateId`, `sensorId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `Postures`
    ADD CONSTRAINT `FK_posture_session` FOREIGN KEY (`sessionId`) REFERENCES `Sessions` (`id`),
    ADD CONSTRAINT `FK_posture_state` FOREIGN KEY (`postureStateId`) REFERENCES `PostureStates` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Disorders`
(
    `id`           tinyint UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(32)      NOT NULL,
    `creationDate` date             NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Disorders`
    ADD UNIQUE `AK_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `DisordersBodyParts`
(
    `disorderId`   tinyint UNSIGNED NOT NULL,
    `bodyPartId`   tinyint UNSIGNED NOT NULL,
    `creationDate` date             NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`disorderId`, `bodyPartId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `DisordersBodyParts`
    ADD CONSTRAINT `FK_db_disorder` FOREIGN KEY (`disorderId`) REFERENCES `Disorders` (`id`),
    ADD CONSTRAINT `FK_db_bodyPart` FOREIGN KEY (`bodyPartId`) REFERENCES `BodyParts` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `SickLeaves`
(
    `id`         int UNSIGNED     NOT NULL AUTO_INCREMENT,
    `personId`   char(36)         NOT NULL,
    `disorderId` tinyint UNSIGNED NOT NULL,
    `startDate`  date             NOT NULL,
    `endDate`    date             NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `SickLeaves`
    ADD CONSTRAINT `FK_sl_person` FOREIGN KEY (`personId`) REFERENCES `Persons` (`userId`),
    ADD CONSTRAINT `FK_sl_disorder` FOREIGN KEY (`disorderId`) REFERENCES `Disorders` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `DisorderPredictions`
(
    `personId`      char(36)         NOT NULL,
    `bodyPartId`    tinyint UNSIGNED NOT NULL,
    `prediction`    tinyint UNSIGNED NOT NULL,
    `lastUpdatedAt` datetime(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`personId`, `bodyPartId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `DisorderPredictions`
    ADD CONSTRAINT `FK_MSDP_person` FOREIGN KEY (`personId`) REFERENCES `Persons` (`userId`),
    ADD CONSTRAINT `FK_MSDP_bodyPart` FOREIGN KEY (`bodyPartId`) REFERENCES `BodyParts` (`id`);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
