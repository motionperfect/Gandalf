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
CREATE TABLE `Products`
(
    `id`           int UNSIGNED NOT NULL AUTO_INCREMENT,
    `reference`    varchar(32)  NOT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Products`
    ADD UNIQUE `AK_reference` (`reference`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Firmwares`
(
    `id`           int UNSIGNED  NOT NULL AUTO_INCREMENT,
    `revision`     int UNSIGNED  NOT NULL,
    `description`  text                   DEFAULT NULL,
    `url`          varchar(2048) NOT NULL,
    `sha1`         char(40)      NOT NULL,
    `creationDate` date          NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Firmwares`
    ADD UNIQUE `AK_sha1` (`sha1`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `ProductsFirmwares`
(
    `productId`  int UNSIGNED NOT NULL,
    `firmwareId` int UNSIGNED NOT NULL,
    PRIMARY KEY (`productId`, `firmwareId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `ProductsFirmwares`
    ADD CONSTRAINT `FK_pf_product` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`),
    ADD CONSTRAINT `FK_pf_firmware` FOREIGN KEY (`firmwareId`) REFERENCES `Firmwares` (`id`);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;