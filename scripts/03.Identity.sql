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
CREATE TABLE `Badges`
(
    `id`        char(36)     NOT NULL,
    `premiseId` int UNSIGNED NOT NULL,
    `createdAt` datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `Badges`
    ADD CONSTRAINT `FK_badge_premise` FOREIGN KEY (`premiseId`) REFERENCES `Premises` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Persons`
(
    `userId`        char(36)    NOT NULL,
    `givenName`     varchar(24) NOT NULL,
    `familyName`    varchar(32) NOT NULL,
    `lastUpdatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`userId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Persons`
    ADD UNIQUE `AK_person` (`givenName`, `familyName`);

--
-- Constraints
--
ALTER TABLE `Persons`
    ADD CONSTRAINT `FK_person_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `PersonsBadges`
(
    `badgeId`      char(36)    NOT NULL,
    `personId`     char(36)    NOT NULL,
    `title`        varchar(24) NOT NULL,
    `claimedAt`    datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `disclaimedAt` datetime(6)          DEFAULT NULL,
    PRIMARY KEY (`badgeId`, `personId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `PersonsBadges`
    ADD CONSTRAINT `FK_pb_person` FOREIGN KEY (`personId`) REFERENCES `Persons` (`userId`),
    ADD CONSTRAINT `FK_pb_badge` FOREIGN KEY (`badgeId`) REFERENCES `Badges` (`id`);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
