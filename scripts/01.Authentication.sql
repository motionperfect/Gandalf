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
CREATE TABLE `Users`
(
    `id`              char(36)     NOT NULL,
    `email`           varchar(320) NOT NULL,
    `isEmailVerified` tinyint      NOT NULL DEFAULT '0',
    `isBanned`        tinyint      NOT NULL DEFAULT '0',
    `createdAt`       datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Users`
    ADD UNIQUE `AK_email` (`email`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `LocalAccounts`
(
    `userId`                       char(36)         NOT NULL,
    `lastPasswordFailureDate`      datetime                  DEFAULT NULL,
    `loginFailureSinceLastSuccess` tinyint UNSIGNED NOT NULL DEFAULT '0',
    `password`                     varchar(64)      NOT NULL,
    `lastPasswordChangeDate`       datetime                  DEFAULT NULL,
    `emailConfirmationToken`       varchar(36)      NOT NULL,
    `createdAt`                    datetime(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`userId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `LocalAccounts`
    ADD CONSTRAINT `FK_localAccount_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
