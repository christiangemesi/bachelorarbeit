-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 11:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thekre`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blocked_period`
--

CREATE TABLE `tbl_blocked_period` (
                                      `pk_blocked_period` int(11) NOT NULL,
                                      `reason` text NOT NULL,
                                      `startdate` date NOT NULL,
                                      `enddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
                                `pk_category` int(11) NOT NULL,
                                `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`pk_category`, `name`) VALUES
                                                       (1, '-'),
                                                       (2, 'Themenkiste'),
                                                       (6, 'Elektronische Geräte');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_delivery`
--

CREATE TABLE `tbl_delivery` (
                                `pk_delivery` int(11) NOT NULL,
                                `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_delivery`
--

INSERT INTO `tbl_delivery` (`pk_delivery`, `type`) VALUES
                                                       (1, 'Abholung an Ort'),
                                                       (2, 'Lieferung an Aargauer Schulen'),
                                                       (3, 'Gebrauch in der Bibliothek');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hourly_order`
--

CREATE TABLE `tbl_hourly_order` (
                                    `pk_hourly_order` int(11) NOT NULL,
                                    `fk_themebox` int(11) NOT NULL,
                                    `startdate` datetime NOT NULL,
                                    `enddate` datetime NOT NULL,
                                    `name` varchar(40) NOT NULL,
                                    `surname` varchar(40) NOT NULL,
                                    `email` varchar(60) NOT NULL,
                                    `phonenumber` mediumtext NOT NULL,
                                    `nebisusernumber` mediumtext NOT NULL,
                                    `fk_status` int(11) NOT NULL,
                                    `datecreated` date DEFAULT NULL,
                                    `ordernumber` varchar(10) NOT NULL,
                                    `fk_delivery` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_hourly_order`
--

INSERT INTO `tbl_hourly_order` (`pk_hourly_order`, `fk_themebox`, `startdate`, `enddate`, `name`, `surname`, `email`, `phonenumber`, `nebisusernumber`, `fk_status`, `datecreated`, `ordernumber`, `fk_delivery`) VALUES
                                                                                                                                                                                                                      (3, 93, '2024-01-09 09:00:00', '2024-01-09 10:00:00', 'gemesi', 'christian', 'christian.gemesi@hotmail.ch', '0123456789', '0123', 1, '2023-12-26', '3OaL3i20AR', 3),
                                                                                                                                                                                                                      (4, 93, '2024-01-09 10:30:00', '2024-01-09 11:30:00', 'gemesi', 'christian', 'christian.gemesi@hotmail.ch', '0123456789', '0123', 1, '2023-12-26', 'PBGDF1ed8v', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
                             `pk_login` int(11) NOT NULL,
                             `password` text NOT NULL,
                             `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`pk_login`, `password`, `email`) VALUES
                                                              (1, '$2y$12$C8vX0ohh3muHBqStrL5A0ek2s10fUJs5kQ61w0207IM8ZqSsgXA.K', 'christian.gemesi@hotmail.ch'),
                                                              (2, '$2y$10$53RC2xhBxY39.M1MuSYwCO68MdK.p6b/vYGYVlVppgbSs/EstWneu', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mail`
--

CREATE TABLE `tbl_mail` (
                            `pk_mail` int(11) NOT NULL,
                            `mail_text` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
                            `mail_description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
                            `edit_legend` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_mail`
--

INSERT INTO `tbl_mail` (`pk_mail`, `mail_text`, `mail_description`, `edit_legend`) VALUES
                                                                                       (1, '<style>    p {        font-size: 16px;        line-height: 22px;        font-family: Helvetica;    }</style><p><b>Achtung diese E-Mail dient nur zu Testzwecken!</b></p><p><b>Wenn Sie diese E-Mail erhalten, dann leiten Sie diese bitte an nick.koch@fhnw.ch weiter.</b></p><p><b>Danke.</b></p><p><b><br></b></p><p><b><br></b></p><p>Guten Tag</p><p>Besten Dank für die Bestellung folgender Themenkiste</p><p><b>Titel:</b>&nbsp;!titel!</p><p><b>Signatur: </b>!signatur!</p><p>    Wir bitten Sie, diese am <b>!startdatum!&nbsp;</b>abzuholen.    Falls Sie die Kiste nicht am vereinbarten Termin abholen können, wird die Kiste zurück ins Regal gestellt und steht dann den anderen Benutzenden wieder zur Verfügung. </p><p><br></p><table style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); width: 343px;\"><tbody><tr><td style=\"width: 136px;\">!extra_text!</td></tr></tbody></table><p><br>    Ihre Bestellung können Sie unter <a href=\"http://server1121.cs.technik.fhnw.ch/user/loginForm\">Bestellverwaltung</a> mit den folgenden Daten bearbeiten:    <br>    Nachname Bestellperson:  <b>!name!</b><br>    Bestellnummer: <b>!bestellnummer!</b><br></p><p>    Vielen Dank und freundliche Grüsse<br>    Ihr Team der FHNW Bibliothek Brugg-Windisch</p><p><br></p><h4 style=\"font-family: Raleway, serif; color: rgb(51, 51, 51);\">Test aller möglicher Variablennamen:</h4><table style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); width: 343px;\"><tbody><tr><td style=\"width: 209px;\">Titel der Themenkiste</td><td style=\"width: 136px;\">!titel!</td></tr><tr><td style=\"width: 209px;\">Signatur</td><td style=\"width: 136px;\">!signatur!</td></tr><tr><td style=\"width: 209px;\">Startdatum</td><td style=\"width: 136px;\">!startdatum!</td></tr><tr><td style=\"width: 209px;\">Enddatum</td><td style=\"width: 136px;\">!enddatum!</td></tr><tr><td style=\"width: 209px;\">E-Mail des Empfängers</td><td style=\"width: 136px;\">!email!</td></tr><tr><td style=\"width: 209px;\">Name des Empfängers</td><td style=\"width: 136px;\">!name!</td></tr><tr><td style=\"width: 209px;\">Vorname des Empfängers</td><td style=\"width: 136px;\">!vorname!</td></tr><tr><td style=\"width: 209px;\">Bestellnummer</td><td style=\"width: 136px;\">!bestellnummer!</td></tr></tbody></table>', 'mail_delivery_pickup', '<h4>Legende m&ouml;glicher Variablennamen:</h4>\r\n<table style=\"width: 343px;\">\r\n<tbody>\r\n<tr>\r\n<td style=\"width: 209px;\">Titel der Themenkiste</td>\r\n<td style=\"width: 136px;\">!titel!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Signatur</td>\r\n<td style=\"width: 136px;\">!signatur!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Startdatum</td>\r\n<td style=\"width: 136px;\">!startdatum!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Enddatum</td>\r\n<td style=\"width: 136px;\">!enddatum!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">E-Mail des Empf&auml;ngers</td>\r\n<td style=\"width: 136px;\">!email!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Name des Empf&auml;ngers</td>\r\n<td style=\"width: 136px;\">!name!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Vorname des Empf&auml;ngers</td>\r\n<td style=\"width: 136px;\">!vorname!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Bestellnummer</td>\r\n<td style=\"width: 136px;\">!bestellnummer!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Extratext</td>\r\n<td style=\"width: 136px;\">!extra_text!</td>\r\n</tr>\r\n</tbody>\r\n</table>'),
                                                                                       (2, '<style>    p {        font-size: 16px;        line-height: 22px;        font-family: Helvetica;    }</style><p><b>Achtung diese E-Mail dient nur zu Testzwecken!</b></p><p><b>Wenn Sie diese E-Mail erhalten, dann leiten Sie diese bitte an nick.koch@fhnw.ch weiter.</b></p><p><b>Danke.</b></p><p><b><br></b></p><p><b><br></b></p><p>Guten Tag</p><p>Besten Dank für die Bestellung folgender Themenkiste mit <b>Lieferung an Ihre Schule</b>:<br></p><p><b>Titel:</b> !titel!</p><p><b>Signatur:</b> !signatur!</p><p>    Die Themenkiste wird am <b> !startdatum!&nbsp;</b> an Ihre Schule geliefert.<br>    Bitte stellen Sie die Themenkiste am Montagmorgen, <b>!abholdatum!&nbsp;</b>wieder zum Abholen bereit. Sie wird in dieser Woche bis spätestens Donnerstag abgeholt.<br>    Für den Versand der Themenkiste werden Ihrem NEBIS-Konto Gebühren von <b>Fr. 50.- </b> belastet. Die Rechnung erhalten Sie im folgenden Monat von der NEBIS-Gebührenverwaltung.    <br></p><p><br></p><table style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); width: 343px;\"><tbody><tr><td style=\"width: 136px;\">!extra_text!</td></tr></tbody></table><p><br>    Ihre Bestellung können Sie unter <a href=\"http://server1121.cs.technik.fhnw.ch/user/loginForm\">Bestellverwaltung</a> mit den folgenden Daten bearbeiten:    <br>    Nachname Bestellperson:  <b>!name!</b><br>    Bestellnummer: <b>!bestellnummer!</b><br></p><p>    Vielen Dank und freundliche Grüsse<br>    Ihr Team der Campusbibliothek Brugg-Windisch</p><p><br></p><h4 style=\"font-family: Raleway, serif; color: rgb(51, 51, 51);\">Test aller möglicher Variablennamen:</h4><table style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); width: 344px;\"><tbody><tr><td style=\"width: 206px;\">Titel der Themenkiste</td><td style=\"width: 136px;\">!titel!</td></tr><tr><td style=\"width: 206px;\">Signatur</td><td style=\"width: 136px;\">!signatur!</td></tr><tr><td style=\"width: 206px;\">Startdatum</td><td style=\"width: 136px;\">!startdatum!</td></tr><tr><td style=\"width: 206px;\">Enddatum</td><td style=\"width: 136px;\">!enddatum!</td></tr><tr><td style=\"width: 206px;\">Abholdatum (bei Schule)</td><td style=\"width: 136px;\">!abholdatum!</td></tr><tr><td style=\"width: 206px;\">E-Mail des Empfängers</td><td style=\"width: 136px;\">!email!</td></tr><tr><td style=\"width: 206px;\">Name des Empfängers</td><td style=\"width: 136px;\">!name!</td></tr><tr><td style=\"width: 206px;\">Vorname des Empfängers</td><td style=\"width: 136px;\">!vorname!</td></tr><tr><td style=\"width: 206px;\">Bestellnummer</td><td style=\"width: 136px;\">!bestellnummer!</td></tr></tbody></table>', 'mail_delivery_school', '<h4>Legende m&ouml;glicher Variablennamen:</h4>\r\n<table style=\"width: 344px;\">\r\n<tbody>\r\n<tr>\r\n<td style=\"width: 206px;\">Titel der Themenkiste</td>\r\n<td style=\"width: 136px;\">!titel!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Signatur</td>\r\n<td style=\"width: 136px;\">!signatur!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Startdatum</td>\r\n<td style=\"width: 136px;\">!startdatum!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Enddatum</td>\r\n<td style=\"width: 136px;\">!enddatum!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Abholdatum (bei Schule)</td>\r\n<td style=\"width: 136px;\">!abholdatum!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">E-Mail des Empf&auml;ngers</td>\r\n<td style=\"width: 136px;\">!email!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Name des Empf&auml;ngers</td>\r\n<td style=\"width: 136px;\">!name!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Vorname des Empf&auml;ngers</td>\r\n<td style=\"width: 136px;\">!vorname!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 206px;\">Bestellnummer</td>\r\n<td style=\"width: 136px;\">!bestellnummer!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 209px;\">Extratext</td>\r\n<td style=\"width: 136px;\">!extra_text!</td>\r\n</tr>\r\n</tbody>\r\n</table>'),
                                                                                       (3, '<p><style><br></style></p><p><style>    p {        font-size: 16px;        line-height: 22px;    }</style></p><p style=\"font-family: Helvetica;\"><b>Achtung diese E-Mail dient nur zu Testzwecken!</b></p><p></p><p style=\"font-family: Helvetica;\"><b>Wenn Sie diese E-Mail erhalten, dann leiten Sie diese bitte an nick.koch@fhnw.ch weiter.</b></p><p style=\"font-family: Helvetica;\"><b>Danke.</b></p><p style=\"font-family: Helvetica;\"><b><br></b></p><p style=\"font-family: Helvetica;\"><b><br></b></p><p></p><p><span style=\"font-family: Helvetica;\">Guten Tag</span></p><p><span style=\"font-family: Helvetica;\">Gerne informieren wir Sie, dass die für Sie reservierte Themenkiste zur Abholung bereit steht.</span></p><p><b><span style=\"font-family: Helvetica;\">Titel:</span></b><span style=\"font-family: Helvetica;\">&nbsp;!titel!</span></p><p><b><span style=\"font-family: Helvetica;\">Signatur:</span></b><span style=\"font-family: Helvetica;\"> !signatur!</span></p><p><span style=\"font-family: Helvetica;\">    Bitte beachten Sie unsere aktuellen Öffnungszeiten.</span></p><p><span style=\"font-family: Helvetica;\">    Ihre Bestellung können Sie unter </span><a href=\"http://server1121.cs.technik.fhnw.ch/user/loginForm\"><span style=\"font-family: Helvetica;\">Bestellverwaltung</span></a><span style=\"font-family: Helvetica;\"> mit den folgenden Daten ansehen:    </span><br><span style=\"font-family: Helvetica;\">    Nachname Bestellperson:  </span><b><span style=\"font-family: Helvetica;\">!name!</span></b><br><span style=\"font-family: Helvetica;\">    Bestellnummer: </span><b><span style=\"font-family: Helvetica;\">!bestellnummer!</span></b><br></p><p><span style=\"font-family: Helvetica;\">    Vielen Dank und freundliche Grüsse</span><br><span style=\"font-family: Helvetica;\">    Ihr Team der Campusbibliothek Brugg-Windisch</span></p><p><span style=\"font-family: Helvetica;\"><br></span></p><h4 style=\"font-family: Raleway, serif; color: rgb(51, 51, 51);\">Test aller möglicher Variablennamen:</h4><table style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); width: 344px;\"><tbody><tr><td style=\"width: 228px;\">Titel der Themenkiste</td><td style=\"width: 133px;\">!titel!</td></tr><tr><td style=\"width: 228px;\">Signatur</td><td style=\"width: 133px;\">!signatur!</td></tr><tr><td style=\"width: 228px;\">E-Mail des Empfängers</td><td style=\"width: 133px;\">!email!</td></tr><tr><td style=\"width: 228px;\">Name des Empfängers</td><td style=\"width: 133px;\">!name!</td></tr><tr><td style=\"width: 228px;\">Vorname des Empfängers</td><td style=\"width: 133px;\">!vorname!</td></tr><tr><td style=\"width: 228px;\">Bestellnummer</td><td style=\"width: 133px;\">!bestellnummer!</td></tr></tbody></table><p></p>', 'mail_ready_pickup', '<h4>Legende m&ouml;glicher Variablennamen:</h4>\r\n<table style=\"width: 344px;\">\r\n<tbody>\r\n<tr>\r\n<td style=\"width: 228px;\">Titel der Themenkiste</td>\r\n<td style=\"width: 133px;\">!titel!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 228px;\">Signatur</td>\r\n<td style=\"width: 133px;\">!signatur!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 228px;\">E-Mail des Empf&auml;ngers</td>\r\n<td style=\"width: 133px;\">!email!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 228px;\">Name des Empf&auml;ngers</td>\r\n<td style=\"width: 133px;\">!name!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 228px;\">Vorname des Empf&auml;ngers</td>\r\n<td style=\"width: 133px;\">!vorname!</td>\r\n</tr>\r\n<tr>\r\n<td style=\"width: 228px;\">Bestellnummer</td>\r\n<td style=\"width: 133px;\">!bestellnummer!</td>\r\n</tr>\r\n</tbody>\r\n</table>');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
                             `pk_order` int(11) NOT NULL,
                             `fk_themebox` int(11) NOT NULL,
                             `startdate` date NOT NULL,
                             `enddate` date NOT NULL,
                             `name` varchar(40) NOT NULL,
                             `surname` varchar(40) NOT NULL,
                             `email` varchar(60) NOT NULL,
                             `phonenumber` mediumtext NOT NULL,
                             `nebisusernumber` mediumtext NOT NULL,
                             `fk_delivery` int(11) NOT NULL,
                             `schoolname` varchar(60) DEFAULT NULL,
                             `schoolstreet` varchar(60) DEFAULT NULL,
                             `schoolcity` varchar(60) DEFAULT NULL,
                             `placeofhandover` varchar(60) DEFAULT NULL,
                             `schoolphonenumber` mediumtext DEFAULT NULL,
                             `comment` text DEFAULT NULL,
                             `ordernumber` varchar(10) NOT NULL,
                             `datecreated` date DEFAULT NULL,
                             `fk_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`pk_order`, `fk_themebox`, `startdate`, `enddate`, `name`, `surname`, `email`, `phonenumber`, `nebisusernumber`, `fk_delivery`, `schoolname`, `schoolstreet`, `schoolcity`, `placeofhandover`, `schoolphonenumber`, `comment`, `ordernumber`, `datecreated`, `fk_status`) VALUES
                                                                                                                                                                                                                                                                                                       (102, 93, '2023-12-25', '2023-12-25', 'gemesi', 'christian', 'christian.gemesi@hotmail.ch', '0123456789', '0123', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OLVHbXYUTT', '2023-12-22', 1),
                                                                                                                                                                                                                                                                                                       (103, 93, '2024-01-03', '2024-01-03', 'gemesi', 'christian', 'christian.gemesi@hotmail.ch', '0123456789', '0123', 1, NULL, NULL, NULL, NULL, NULL, NULL, '39UI2iPt60', '2023-12-22', 1),
                                                                                                                                                                                                                                                                                                       (104, 92, '2023-12-25', '2023-12-26', 'gemesi', 'christian', 'christian.gemesi@hotmail.ch', '0123456789', '0123', 1, NULL, NULL, NULL, NULL, NULL, NULL, '7Pcn246Bwn', '2023-12-22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_type`
--

CREATE TABLE `tbl_order_type` (
                                  `pk_order_type` int(11) NOT NULL,
                                  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_order_type`
--

INSERT INTO `tbl_order_type` (`pk_order_type`, `name`) VALUES
                                                           (1, 'Stundenbasiert (max. 1 Tag)'),
                                                           (2, 'Tagesbasiert (max. 6 Wochen)');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_password_resets`
--

CREATE TABLE `tbl_password_resets` (
                                       `email` varchar(255) NOT NULL,
                                       `token` varchar(255) NOT NULL,
                                       `created_at` timestamp NULL DEFAULT NULL,
                                       `pk_password_resets` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_password_resets`
--

INSERT INTO `tbl_password_resets` (`email`, `token`, `created_at`, `pk_password_resets`) VALUES
    ('christian.gemesi@hotmail.ch', 'iw42RvH0qGxO1C0U4BzbOgvWgbdIzCET78wywW0G09a21AFYY9DU0aVWZuLA0eXB', '2023-12-20 16:56:12', 84);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_status`
--

CREATE TABLE `tbl_status` (
                              `pk_status` int(11) NOT NULL,
                              `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_status`
--

INSERT INTO `tbl_status` (`pk_status`, `name`) VALUES
                                                   (1, 'Neu'),
                                                   (2, 'Bereit'),
                                                   (3, 'im Umlauf'),
                                                   (4, 'zurück gekommen'),
                                                   (5, 'Abgeschlossen'),
                                                   (6, 'Storniert');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_themebox`
--

CREATE TABLE `tbl_themebox` (
                                `pk_themebox` int(11) NOT NULL,
                                `title` varchar(100) NOT NULL,
                                `signatur` varchar(100) NOT NULL,
                                `schoollevel` varchar(100) NOT NULL,
                                `barcode` varchar(100) NOT NULL,
                                `size` varchar(100) NOT NULL,
                                `weight` varchar(100) NOT NULL,
                                `content` text NOT NULL,
                                `complete` tinyint(1) NOT NULL,
                                `extra_text` text DEFAULT NULL,
                                `fk_category` int(11) DEFAULT NULL,
                                `fk_order_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_themebox`
--

INSERT INTO `tbl_themebox` (`pk_themebox`, `title`, `signatur`, `schoollevel`, `barcode`, `size`, `weight`, `content`, `complete`, `extra_text`, `fk_category`, `fk_order_type`) VALUES
                                                                                                                                                                                     (92, '0', '0', '0', '0', '1', '1', 'f', 1, '<p><br></p>', 6, 2),
                                                                                                                                                                                     (93, 'stunden', 'stunden', 'stunden', 'stunden', 'stunden', '2', 'stunden', 1, '<p><br></p>', 6, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_blocked_period`
--
ALTER TABLE `tbl_blocked_period`
    ADD PRIMARY KEY (`pk_blocked_period`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
    ADD PRIMARY KEY (`pk_category`);

--
-- Indexes for table `tbl_delivery`
--
ALTER TABLE `tbl_delivery`
    ADD PRIMARY KEY (`pk_delivery`);

--
-- Indexes for table `tbl_hourly_order`
--
ALTER TABLE `tbl_hourly_order`
    ADD PRIMARY KEY (`pk_hourly_order`),
  ADD KEY `fk_themebox_hourly_order_idx` (`fk_themebox`),
  ADD KEY `fk_status_hourly_order_idx` (`fk_status`),
  ADD KEY `fk_delivery` (`fk_delivery`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
    ADD PRIMARY KEY (`pk_login`);

--
-- Indexes for table `tbl_mail`
--
ALTER TABLE `tbl_mail`
    ADD PRIMARY KEY (`pk_mail`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
    ADD PRIMARY KEY (`pk_order`),
  ADD KEY `fk_themebox_con_idx` (`fk_themebox`),
  ADD KEY `fk_status_con_idx` (`fk_status`),
  ADD KEY `fk_delivery_connection_idx` (`fk_delivery`);

--
-- Indexes for table `tbl_order_type`
--
ALTER TABLE `tbl_order_type`
    ADD PRIMARY KEY (`pk_order_type`);

--
-- Indexes for table `tbl_password_resets`
--
ALTER TABLE `tbl_password_resets`
    ADD PRIMARY KEY (`pk_password_resets`);

--
-- Indexes for table `tbl_status`
--
ALTER TABLE `tbl_status`
    ADD PRIMARY KEY (`pk_status`);

--
-- Indexes for table `tbl_themebox`
--
ALTER TABLE `tbl_themebox`
    ADD PRIMARY KEY (`pk_themebox`),
  ADD KEY `fk_category_connection` (`fk_category`),
  ADD KEY `fk_order_type_connection` (`fk_order_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_blocked_period`
--
ALTER TABLE `tbl_blocked_period`
    MODIFY `pk_blocked_period` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
    MODIFY `pk_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_delivery`
--
ALTER TABLE `tbl_delivery`
    MODIFY `pk_delivery` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_hourly_order`
--
ALTER TABLE `tbl_hourly_order`
    MODIFY `pk_hourly_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_mail`
--
ALTER TABLE `tbl_mail`
    MODIFY `pk_mail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
    MODIFY `pk_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `tbl_order_type`
--
ALTER TABLE `tbl_order_type`
    MODIFY `pk_order_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_password_resets`
--
ALTER TABLE `tbl_password_resets`
    MODIFY `pk_password_resets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `tbl_status`
--
ALTER TABLE `tbl_status`
    MODIFY `pk_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_themebox`
--
ALTER TABLE `tbl_themebox`
    MODIFY `pk_themebox` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_hourly_order`
--
ALTER TABLE `tbl_hourly_order`
    ADD CONSTRAINT `fk_status_hourly_order_connection` FOREIGN KEY (`fk_status`) REFERENCES `tbl_status` (`pk_status`),
  ADD CONSTRAINT `fk_themebox_hourly_order_connection` FOREIGN KEY (`fk_themebox`) REFERENCES `tbl_themebox` (`pk_themebox`);

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
    ADD CONSTRAINT `fk_delivery_connection` FOREIGN KEY (`fk_delivery`) REFERENCES `tbl_delivery` (`pk_delivery`),
  ADD CONSTRAINT `fk_status_connection` FOREIGN KEY (`fk_status`) REFERENCES `tbl_status` (`pk_status`),
  ADD CONSTRAINT `fk_themebox_connection` FOREIGN KEY (`fk_themebox`) REFERENCES `tbl_themebox` (`pk_themebox`);

--
-- Constraints for table `tbl_themebox`
--
ALTER TABLE `tbl_themebox`
    ADD CONSTRAINT `fk_category_connection` FOREIGN KEY (`fk_category`) REFERENCES `tbl_category` (`pk_category`),
  ADD CONSTRAINT `fk_order_type_connection` FOREIGN KEY (`fk_order_type`) REFERENCES `tbl_order_type` (`pk_order_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
