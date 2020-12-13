-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2020 at 04:44 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` text DEFAULT NULL,
  `start_date` text DEFAULT NULL,
  `end_date` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `location`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Niagara Freewheelers Bicycle Touring Club 2020', 'The Niagara Freewheelers Bicycle Touring Club is open to all ages, abilities, and interests. Members can take part in any of the 400+ organized rides scheduled annually, with routes showcasing the beauty of Niagara and beyond. Join us at club social events throughout the year, and attend club meetings and information sessions. ', '145 Carlton St, St. Catharines, ON L2R 1R5, Canada', '2020-01-03', '2020-12-30', 1, NULL, NULL),
(2, '200 Hour Yoga Teacher Training in Rishikesh India', '200 Hour Hatha and Ashtanga Yoga Teacher Training Course at Arogya Yoga School, Rishikesh. Certified by Yoga Alliance USA. If you are looking to bring a change into your life by learning yoga for self-rejuvenation or transfer the benefits to others, by getting a professional certificate and expertise, then Arogya Yoga School is the perfect fit for you.', 'Egypt', '2020-01-03', '2020-12-28', 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
