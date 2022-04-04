-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2020 at 02:40 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tictac`
--

-- --------------------------------------------------------

--
-- Table structure for table `rankingstable`
--

CREATE TABLE `rankingstable` (
  `id` int(6) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `time` varchar(10) NOT NULL,
  `ticket` varchar(30) NOT NULL,
  `pills` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rankingstable`
--

INSERT INTO `rankingstable` (`id`, `name`, `lastname`, `date`, `time`, `ticket`, `pills`, `phone`, `email`) VALUES
(1, 'aa', 'aa', '12/22/2020', '8.74612000', 'aa', '5', 'aa', 'aa'),
(2, 'aa', 'aa', '12/22/2020', '90.0', 'aa', '28', 'aa', 'aa'),
(3, 'aa', 'aa', '12/22/2020', '90.0', 'aa', '28', 'aa', 'aa'),
(4, 'aa', 'aa', '12/22/2020', '41.3', 'aa', '28', 'aa', 'aa'),
(5, 'aa', 'aa', '12/22/2020', '90.0', 'aa', '27', 'aa', 'aa'),
(6, 'aa', 'aa', '12/22/2020', '90.0', 'aa', '25', 'aa', 'aa'),
(7, 'aa', 'aa', '12/22/2020', '90.0', 'aa', '30', 'aa', 'aa'),
(8, 'aa', 'aa', '12/22/2020', '90.0', 'aa', '26', 'aa', 'aa'),
(9, 'aa', 'aa', '12/22/2020', '13.3', 'aa', '0', 'aa', 'aa'),
(10, 'aa', 'aa', '12/23/2020', '81.6', 'abc', '28', 'aa', 'aa'),
(11, 'aaaa', 'aa', '12/23/2020', '11.5', 'aav', '2', 'aa', 'aa');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `tickets` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT '',
  `lastname` varchar(30) NOT NULL DEFAULT '',
  `phone` varchar(12) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `dateofbirth` varchar(30) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`tickets`, `name`, `lastname`, `phone`, `email`, `dateofbirth`) VALUES
('aa', 'aa', 'aa', 'aa', 'aa', '1/1/1970'),
('aav', 'aaaa', 'aa', 'aa', 'aa', '6/4/1975'),
('abc', 'aa', 'aa', 'aa', 'aa', '1/1/1970');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rankingstable`
--
ALTER TABLE `rankingstable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`tickets`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rankingstable`
--
ALTER TABLE `rankingstable`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
