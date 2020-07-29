SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = '+02:00';

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

INSERT INTO Companies(`id`, `name`, `description`)
VALUES (1, 'Amazon',
        'Amazon est une entreprise de commerce électronique américaine basée à Seattle. Elle est un des géants du Web, regroupés sous l\'acronyme GAFAM'),
       (2, 'SVM Blois ', 'SVM Blois Entreprosage et stockage non frigorifique'),
       (3, 'ARMOR Aviron', 'ARMOR Aviron construction de bateau de plaisance'),
       (4, 'VALEO EMBRAYAGES', 'VALEO EMBRAYAGES Fabrication d\'équipement intérieurs, extérieurs de véhicules'),
       (5, 'T.E.V.L', 'T.E.V.L Entreprise de déménagement'),
       (6, 'TRANSIFER', 'TRANSIFER transport ferroviaire'),
       (7, 'SNC SWETEE', 'SNC SWETEE location, location-bail de matériels de transport par eau'),
       (8, 'TRANSDEV AUXERROIS', 'TRANSDEV AUXERROIS transport local, régional');

-- --------------------------------------------------------

INSERT INTO Industries(`id`, `name`, `description`)
VALUES (1, 'Agroalimentaire',
        'L’industrie agroalimentaire est l\'ensemble des activités industrielles qui transforment des productions alimentaires issues de l\'agriculture ou de la pêche en aliments industriels destinés essentiellement à la consommation humaine.'),
       (2, 'Construction',
        'Le secteur économique de la construction, appelé « bâtiment et travaux publics » (BTP) dans le monde francophone, regroupe toutes les activités de conception et de construction des bâtiments publics et privés, industriels ou non, et des infrastructures telles que les routes ou les canalisations'),
       (3, 'Défense militaire',
        'L\'industrie de l\'armement (defense militaire) est la branche du secteur industriel consacrée à la fabrication et au commerce des armes dans les domaines civil et militaire et de systèmes et fournitures militaires'),
       (4, 'Distribution',
        'La distribution est la partie du commerce ou du négoce qui correspond à la vente de détail au consommateur final. Elle peut être faite directement par le producteur, par exemple dans les marchés ou chez des producteurs qui possèdent un réseau commercial intégré ou franchisé.'),
       (5, 'Électronique',
        'Industrie électronique. L\'industrie électronique regroupe l\'ensemble des entreprises qui fabriquent les composants, circuits et appareils électroniques. ... Les appareils électroniques fabriqués ont des applications très diverses, de l\'électronique grand public à l\'industrie spatiale'),
       (6, 'Énergie et matériel',
        'Un secteur d\'utilisation de l\'énergie est un regroupement conventionnel de consommateurs d\'énergie pouvant servir de référence dans une analyse de la consommation énergétique. La couverture sectorielle d\'un secteur peut varier d\'une étude à l\'autre.'),
       (7, 'Équipements, mécanique, usinage',
        'L\'usinage est une famille de techniques de fabrication de pièces par enlèvement de copeaux. Le principe de l\'usinage est d\'enlever de la matière de façon à donner à la pièce brute la forme et les dimensions voulues, à l\'aide d\'une machine-outil.'),
       (8, 'Imprimeries et papier',
        'L\'industrie graphique est l\'ensemble des acteurs qui constituent la chaîne de production d\'un produit graphique. Cela va de la conception et la préparation du travail jusqu\'à la production en grande série par un procédé d\'impression.'),
       (9, 'Meubles et composantes de bois',
        'L’industrie du bois est une industrie d’exploitation des ressources naturelles très importante dans le monde. On abat des arbres pour divers usages dans la plupart des pays.'),
       (10, 'Pharmaceutiques',
        'L\'industrie pharmaceutique est le secteur économique qui regroupe les activités de recherche, de fabrication et de commercialisation des médicaments pour la médecine humaine ou vétérinaire'),
       (11, 'Plastique',
        'L\'industrie des plastiques conçoit, fabrique (plasturgie) et commercialise des matériaux polymères — communément dénommés « plastiques » — utilisés pour de nombreux usages (ex. : emballage, construction, électronique, industrie aérospatiale, transport, agriculture, sylviculture, jouets, gadgets'),
       (12, 'Services',
        'L\'industrie de service est une industrie qui fournit un service aux personnes mais n\'aboutit pas à la production de biens'),
       (13, 'Textile et chaussures',
        'L\'industrie textile rassemble l\'ensemble des activités de conception, de fabrication et commercialisation des textiles et donc, entre autres, de l\'habillement');

-- --------------------------------------------------------

INSERT INTO Activities(`id`, `name`, `description`, `industryId`)
VALUES (1, 'Logistique',
        'La logistique est l\'activité qui a pour objet de gérer les flux physiques, et les données s\'y rapportant, dans le but de mettre à disposition les ressources correspondant à des besoins déterminés',
        4),
       (2, 'Entreprosage et Stockage non frigorifique',
        'l\'exploitation pour compte de tiers d\'installations d\'entreposage non frigorifique ou de lieux de stockage (entrepôts, silos, réservoirs, hangars,etc.), y compris à caractère industriel ou agricole',
        4),
       (3, 'Construction bateau de plaisance',
        'la construction de bateaux et de canots pneumatiques, la construction de voiliers, avec ou sans moteur auxiliaire ,la construction de bateaux de plaisance à moteur tels que yachts, hors-bords, etc.',
        2),
       (4, 'Fabrication équipement  véhicules',
        'la fabrication de parties et accessoires pour carrosseries de véhicules automobiles : ceintures de sécurité, coussins gonflables de sécurité, portières, pare-chocs, etc, la fabrication de sièges de voitures, l\'assemblage de sous-ensembles complets, de parties et d\'accessoires pour véhicules automobiles, pour compte de tiers',
        7),
       (5, 'Déménagement',
        'Un déménagement est une action qui consiste à ôter tout ou partie des biens mobiliers contenus dans un local pour les transporter vers un autre.',
        12),
       (6, 'Transport ferroviaire',
        'Le transport ferroviaire est un moyen de transférer des passagers et des marchandises sur des véhicules à roues circulant sur des rails, qui sont situés sur des voies.',
        12),
       (7, 'Location',
        'La location est l\'action qui consiste à louer un logement, un local, un véhicule, ou tout autre bien matériel à une personne',
        12),
       (8, 'Transport local',
        'Trafic local: Ce sont des lignes qui servent à la desserte capillaire de localités. Elles couvrent un rayon de 1,5 km au maximum au-delà du réseau principal de transports publics, avec de courtes distances entre les arrêts. Le trafic local ne bénéficie pas d’indemnités fédérales et est généralement financé par les cantons et communes.',
        12),
       (9, 'Transport régional',
        'Trafic régional de voyageurs avec fonction de desserte: Une ligne a une fonction de desserte lorsqu’il y a un point de jonction avec le réseau principal des transports publics à une des extrémités de la ligne au moins et une localité à l’autre extrémité ou entre les extrémités',
        12);

-- --------------------------------------------------------

INSERT INTO Products(`id`, `reference`)
VALUES (1, 'Kinetic Spine'),
       (2, 'Kinetic Shoulder'),
       (3, 'Kinetic Hip'),
       (4, 'Kinetic Arm'),
       (5, 'Docking Station');


-- --------------------------------------------------------

INSERT INTO BodyParts(`id`, `name`)
VALUES (1, 'Costal artilage'),
       (2, 'Spine'),
       (3, 'Achilles tendon'),
       (4, 'Shoulder Right'),
       (5, 'Shoulder Left'),
       (6, 'Wrist Right'),
       (7, 'Wrist Left'),
       (8, 'Knee Right'),
       (9, 'Knee Left'),
       (10, 'Foot Right'),
       (11, 'Foot Left'),
       (12, 'Sacroiliac'),
       (13, 'Hip'),
       (14, 'Arm Right'),
       (15, 'Arm Left'),
       (16, 'Elbow Right'),
       (17, 'Elbow Left'),
       (18, 'Muscle');

-- --------------------------------------------------------

INSERT INTO Sensors(`bodyPartId`, `productId`)
VALUES (2, 1),
       (4, 2),
       (5, 2),
       (13, 3),
       (14, 4),
       (15, 4);

-- --------------------------------------------------------

INSERT INTO PostureStates(`id`, `name`)
VALUES (1, 'Safe'),
       (2, 'Risk'),
       (3, 'Dangerous');

-- --------------------------------------------------------

INSERT INTO DisordersBodyParts(`disorderId`, `bodyPartId`)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (4, 5),
       (5, 6),
       (5, 7),
       (6, 6),
       (6, 7),
       (7, 2),
       (8, 4),
       (8, 5),
       (9, 8),
       (9, 9),
       (10, 18),
       (11, 6),
       (11, 7),
       (12, 10),
       (12, 11),
       (13, 6),
       (13, 7),
       (13, 14),
       (13, 15),
       (14, 12),
       (15, 4),
       (15, 5),
       (16, 4),
       (16, 5),
       (17, 4),
       (17, 5),
       (18, 4),
       (18, 5),
       (19, 4),
       (19, 5),
       (20, 4),
       (20, 5),
       (21, 13),
       (22, 16),
       (22, 17);

-- --------------------------------------------------------

INSERT INTO Disorders(`id`, `name`)
VALUES (1, 'Costochondritis'),
       (2, 'Idiopathic skeletal hyperostosis'),
       (3, 'Enthesophytes'),
       (4, 'Dead arm syndrome'),
       (5, 'Repetitive strain injury'),
       (6, 'Cumulative trauma disorders'),
       (7, 'Radiculitis'),
       (8, 'Hill–Sachs lesion'),
       (9, 'Knee pain'),
       (10, 'Microtrauma'),
       (11, 'Carpal tunnel syndrome'),
       (12, 'Peroneal nerve paralysis'),
       (13, 'Radial tunnel syndrome'),
       (14, 'Sacroiliac joint syndrome'),
       (15, 'Sternoclavicular separation'),
       (16, 'Tendinitis Shoulder'),
       (17, 'Bursitis'),
       (18, 'Impingement syndrome'),
       (19, 'Rotator cuff tears'),
       (20, 'SLAP tear'),
       (21, 'Iliopsoas tendinitis'),
       (22, 'Ulnar nerve entrapment');

-- --------------------------------------------------------

INSERT INTO CompaniesActivities(`companyId`, `activityId`)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
