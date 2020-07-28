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
CREATE TABLE `Labels`
(
    `id`           int UNSIGNED NOT NULL AUTO_INCREMENT,
    `title`        varchar(32)  NOT NULL,
    `description`  tinytext              DEFAULT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Labels`
    ADD UNIQUE `AK_title` (`title`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `Groups`
(
    `id`           int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`         varchar(32)  NOT NULL,
    `description`  tinytext              DEFAULT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes
--
ALTER TABLE `Groups`
    ADD UNIQUE `AK_name` (`name`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `GroupsLabels`
(
    `groupId`      int UNSIGNED NOT NULL,
    `labelId`      int UNSIGNED NOT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`groupId`, `labelId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `GroupsLabels`
    ADD CONSTRAINT `FK_gl_group` FOREIGN KEY (`groupId`) REFERENCES `Groups` (`id`),
    ADD CONSTRAINT `FK_gl_label` FOREIGN KEY (`labelId`) REFERENCES `Labels` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `GroupsRelations`
(
    `parentId`     int UNSIGNED NOT NULL,
    `childId`      int UNSIGNED NOT NULL,
    `creationDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`parentId`, `childId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `GroupsRelations`
    ADD CONSTRAINT `FK_gr_parent` FOREIGN KEY (`parentId`) REFERENCES `Groups` (`id`),
    ADD CONSTRAINT `FK_gr_child` FOREIGN KEY (`childId`) REFERENCES `Groups` (`id`);

-- --------------------------------------------------------

--
-- Table structure
--
CREATE TABLE `EmployeesGroups`
(
    `groupId`  int UNSIGNED NOT NULL,
    `badgeId`  char(36)     NOT NULL,
    `joinDate` date         NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`groupId`, `badgeId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

--
-- Constraints
--
ALTER TABLE `EmployeesGroups`
    ADD CONSTRAINT `FK_eg_group` FOREIGN KEY (`groupId`) REFERENCES `Groups` (`id`),
    ADD CONSTRAINT `FK_eg_badge` FOREIGN KEY (`badgeId`) REFERENCES `Badges` (`id`);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
