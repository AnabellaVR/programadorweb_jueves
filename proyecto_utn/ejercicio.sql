-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-06-2025 a las 19:13:43
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ejercicio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almohadones`
--

DROP TABLE IF EXISTS `almohadones`;
CREATE TABLE IF NOT EXISTS `almohadones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_id` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `titulo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cuerpo` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almohadones`
--

INSERT INTO `almohadones` (`id`, `img_id`, `titulo`, `cuerpo`) VALUES
(1, 'dccg0cj41rp1jvyvgjgc', 'Almohadón \"Aurum Helénico\"', 'Un dúo de almohadones que combina el lujo del negro con el esplendor del dorado, inspirados en la elegancia de la Grecia clásica. El detalle central en pasamanería griega con flecos otorga un aire de distinción y carácter, ideal para ambientes sobrios con acentos de sofisticación. Perfectos para realzar un sillón de cuero, una cama neutra o un rincón de lectura con impronta clásica y atemporal.'),
(2, 'fjc4rcelnegxf7wk02cw', 'Almohadón \"Estocolmo\"', 'Diseño minimalista con franjas en blanco, gris, dorado y negro. Sofisticado y moderno, ideal para ambientes nórdicos o urbanos con estilo.'),
(5, 'qdwl8bhhdtidvnclcp0h', 'Almohadón \"Esmeralda\"', 'Almohadón de terciopelo verde profundo con costuras en diagonal y una franja dorada central. Elegante y vibrante, perfecto para sumar lujo y textura.'),
(6, 'vfkrwztmsfu3firmnbeb', 'Almohadón \"Perla Zigzag, Flor de Nieve, Arabesco\"', ' Diseño en chevron bordado con cuentas. Elegante, delicado y perfecto para dar un toque glam a camas o sillones en tonos neutros.\r\nAlmohadón con flores en relieve suave y etéreo su textura aporta calidez visual, perfecta para combinar. '),
(7, 'xnf1gsobx9tizviee2qg', 'Almohadón \"Abeja Real y Colmena Gris\"', 'Este modelo combina sobriedad y carácter con un diseño bordado de abeja sobre lino claro. Ideal para quienes aman los detalles únicos y sofisticados.\r\n Con estructura geométrica y tonos neutros, este almohadón evoca la precisión de una colmena. Aporta contraste y estructura, complementando el diseño majestuoso de Abeja Real.'),
(8, 'zrdgagec0rkr22j7w0tk', 'Almohadones \"Terra\"', 'Hecho en lana tejida con motivos en relieve y cuadros, en tonos tierra y verdes apagados. Aporta calidez y profundidad visual a todo tipo de espacios.'),
(9, 'qyhzun0n2u680elothl3', 'Almohadón \"Fresno\"', 'Estampado con ramas y hojas en tonos verdes sobre fondo marfil, este almohadón transmite frescura y naturaleza. Ideal para ambientes cálidos, rincones de lectura o livings con detalles botánicos.'),
(10, 'g7no9wggrzlklxnr74cx', 'Almohadón \"Ondas de Seda\"', 'Diseñado con una textura diagonal que genera movimiento visual, este modelo en tono marfil aporta suavidad, elegancia y dinamismo a cualquier dormitorio o sofá de líneas delicadas.'),
(11, 'eybru5jbcmj8mwqdprdk', 'Almohadón \"Lino Dorado\"', 'Confeccionado en lino sintético color dorado tostado, este almohadón de acabado sobrio y atemporal aporta presencia sin estridencias. Una pieza versátil para sumar textura y calidez a tu decoración.'),
(12, 'uadnmegheshempsjijbz', 'Almohadón \"Pecan\"', 'Confeccionado en tela de algodón texturado color crudo, realzado con una cinta de terciopelo color caramelo que lo atraviesa sutilmente. Ideal para aportar calidez y sofisticación a camas o sillones en tonos neutros'),
(13, 'tz4mhkdxanuen2tmstfz', 'Almohadón \"Cuadro Ivory\"', 'Minimalismo y textura se combinan en este almohadón de gamuza sintética color marfil. Las costuras marcadas en forma de cuadrícula aportan un diseño moderno y limpio. Perfecto para ambientes contemporáneos y luminosos.'),
(14, 'qjelgpxwljw2albr6qkg', 'Almohadón \"Chocolate Urbano\"', 'De estilo moderno e impactante, este almohadón de gamuza en tono chocolate oscuro incluye un diseño geométrico de costuras a tono. Viene en conjunto con un modelo más pequeño para completar la escena. Ideal para un living elegante o un rincón de lectura con personalidad.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `id_emp` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `trabajo` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `edad` int NOT NULL,
  `salario` int NOT NULL,
  `mail` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_emp`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_emp`, `nombre`, `apellido`, `trabajo`, `edad`, `salario`, `mail`) VALUES
(1, 'Juan', 'Hagan', 'Programador Senior', 32, 120000, 'juan_hagan@bignet.com'),
(2, 'Gonzalo', 'Pillai', 'Programador Senior', 32, 110000, 'g_pillai@bignet.com'),
(3, 'Ana', 'Dharma', 'Desarrollador Web', 27, 90000, 'ana@bignet.com'),
(4, 'Maria', 'Anchor', 'Desarrollador Web', 26, 85000, 'mary@bignet.com'),
(5, 'Alfredo', 'Fernandez', 'Programador', 31, 75000, 'af@bignet.com'),
(6, 'Juan', 'Aguero', 'Programador', 34, 80000, 'juan@bignet.com'),
(7, 'Eduardo', 'Sacan', 'Programador', 25, 75000, 'eddie@bignet.com'),
(8, 'Alejandro', 'Nanda', 'Programador', 32, 70000, 'alenanda@bignet.com'),
(10, 'Paublo', 'Simon', 'Especialista Multimedia', 43, 85000, 'ps@bignet.com'),
(11, 'Arturo', 'Hernandez', 'Especialista Multimedia', 32, 75000, 'arturo@bignet.com'),
(12, 'Jimena', 'Cazado', 'Dise ador Web Senior', 32, 110000, 'jimena@bignet.com'),
(13, 'Roberto', 'Luis', 'Administrador de Sistemas', 35, 100000, 'roberto@bignet.com'),
(14, 'Daniel', 'Gutierrez', 'Administrador de Sistemas', 34, 90000, 'daniel@bignet.com'),
(15, 'Miguel', 'Harper', 'Ejecutivo de Ventas Senior', 36, 120000, 'miguel@bignet.com'),
(16, 'Monica', 'Sanchez', 'Ejecutivo de Ventas', 30, 90000, 'monica@bignet.com'),
(17, 'Alicia', 'Simlai', 'Ejecutivo de Ventas', 27, 70000, 'alicia@bignet.com'),
(18, 'Jose', 'Iriarte', 'Ejecutivo de Ventas', 27, 72000, 'jose@bignet.com'),
(19, 'Sabrina', 'Allende', 'Gerente de Soporte Tecnico', 32, 200000, 'sabrina@bignet.com'),
(20, 'Pedro', 'Campion', 'Gerente de Finanzas', 36, 220000, 'pedro@bignet.com'),
(21, 'Mariano', 'Dharma', 'Presidente', 28, 300000, 'mariano@bignet.com'),
(22, 'Francisco', 'Pérez', 'Programador', 26, 90000, 'francisco@bignet.com'),
(24, 'Agustin', 'Gayol', 'Diseñador Web', 28, 130000, 'ag@bignet.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `titulo` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `img_id`, `titulo`) VALUES
(1, 'fknypyi0mopefbdzkg9g', 'Almohadón \"Oro y Obsidiana\"'),
(2, 'gmzury3bqhjgir89fqc5', 'Almohadón \"Botánica Tropical\"'),
(3, 'irmvkq7s3snhpxnrcd5l', 'Almohadón \"Brisa Marina\"'),
(4, 'djih29wvmrmtv1gx6jej', 'Almohadón \"Alanna y Dalia\"');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'flavia', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Anabella', 'f38fef4c0e4988792723c29a0bd3ca98');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
