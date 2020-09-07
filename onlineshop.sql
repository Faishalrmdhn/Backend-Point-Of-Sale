-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2020 at 11:50 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlineshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(25) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_status` int(1) NOT NULL,
  `category_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_status`, `category_created_at`, `category_update_at`) VALUES
(1, 'Minuman', 1, '2020-09-06 09:41:36', '2020-09-06 09:41:36'),
(2, 'makanan', 2, '2020-09-06 09:43:06', '2020-09-06 09:43:06');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(25) NOT NULL,
  `invoice` int(6) NOT NULL,
  `order_id` int(25) NOT NULL,
  `history_created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `history_subtotal` int(100) NOT NULL,
  `history_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `invoice`, `order_id`, `history_created_at`, `history_subtotal`, `history_updated_at`) VALUES
(1, 33075, 3, '2020-09-06 09:54:45.144000', 6900, '2020-09-07 03:06:53'),
(2, 410054, 0, '2020-09-06 20:18:27.879000', 48000, '2020-09-06 20:18:27'),
(3, 222505, 0, '2020-09-06 20:28:41.287000', 48000, '2020-09-06 20:28:40'),
(4, 919659, 0, '2020-09-06 20:30:03.185000', 541000, '2020-09-06 20:30:02');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(25) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_price` int(100) NOT NULL,
  `order_qty` int(15) NOT NULL,
  `order_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `order_price`, `order_qty`, `order_created_at`) VALUES
(1, 1, 79000, 2, '2020-09-06 09:48:50'),
(2, 2, 79000, 2, '2020-09-06 09:49:50'),
(3, 4, 69000, 3, '2020-09-06 09:49:50');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(50) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `category_id` int(1) NOT NULL,
  `product_created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `product_updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_image`, `category_id`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(1, 'Espresso', 10000, 'product_image-2020-09-06T08-53-21.427Z-item1.png', 1, '2020-09-06 08:53:21.431000', '2020-09-06 08:53:21.432414', 1),
(2, 'Coffee Latte', 15000, 'product_image-2020-09-06T08-54-50.740Z-item2.png', 1, '2020-09-06 08:54:50.754000', '2020-09-06 08:54:50.759645', 1),
(3, 'Cappucino', 5000, 'product_image-2020-09-06T08-55-35.050Z-item3.png', 1, '2020-09-06 08:55:35.053000', '2020-09-06 08:55:35.061328', 1),
(4, 'Red Velvet Latte', 33000, 'product_image-2020-09-06T08-56-02.839Z-item4.png', 1, '2020-09-06 08:56:02.842000', '2020-09-06 08:56:02.848186', 1),
(5, 'Choco Rhum', 28000, 'product_image-2020-09-06T08-56-42.348Z-item5.png', 2, '2020-09-06 08:56:42.352000', '2020-09-06 08:56:42.358318', 1),
(6, 'Black Forest', 30000, 'product_image-2020-09-06T08-57-03.349Z-item6.png', 2, '2020-09-06 08:57:03.352000', '2020-09-06 08:57:03.354365', 1),
(7, 'Chicken Katsu Dabu-dabu', 60000, 'product_image-2020-09-06T08-57-33.960Z-item7.png', 2, '2020-09-06 08:57:33.964000', '2020-09-06 08:57:33.968446', 1),
(8, 'Salmon Truffle Teriyaki', 60000, 'product_image-2020-09-06T08-57-55.900Z-item8.png', 2, '2020-09-06 08:57:55.903000', '2020-09-06 08:57:55.904761', 1),
(9, 'Wiener Schnitzel', 69000, 'product_image-2020-09-06T08-58-27.921Z-item9.png', 2, '2020-09-06 08:58:27.924000', '2020-09-06 08:58:27.940104', 1),
(10, 'ketoprak', 600, 'product_image-2020-09-06T15-42-03.484Z-item9.png', 2, '2020-09-06 15:42:03.519000', '2020-09-06 15:42:03.522864', 1),
(11, 'cingcau', 600, 'product_image-2020-09-06T15-42-14.167Z-item9.png', 2, '2020-09-06 15:42:14.198000', '2020-09-06 15:42:14.199008', 1),
(12, 'mentega', 50000, 'product_image-2020-09-07T05-37-22.791Z-Stupa_Borobudur.jpg', 2, '2020-09-06 15:42:50.282000', '2020-09-07 05:37:23.047000', 1),
(13, 'tes Redis', 999, 'product_image-2020-09-07T03-26-19.115Z-bghd2.jpg', 2, '2020-09-07 03:26:19.150000', '2020-09-07 03:26:19.178494', 1),
(14, 'tes', 50000, 'product_image-2020-09-07T07-06-30.282Z-Stupa_Borobudur.jpg', 2, '2020-09-07 07:05:24.414000', '2020-09-07 07:06:30.348000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(25) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `user_updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(1, 'superadmin', 'superadmin@gmail.com', '$2b$10$Brg5rxTELn0XWYCwD9AoIu27GOpljuIQKjnO8rMyw0dnwaN1bsrHS', 1, 1, '2020-09-06 08:19:21.025000', '2020-09-06 08:19:21.032545'),
(2, 'alfa', 'alfa@gmail.com', '$2b$10$99CHLzJI6qc/Z5Q9OCsPPuIeXQaU/NIgqjqfsuo0kEKUKfNfrFVMG', 2, 0, '2020-09-06 08:27:15.604000', '2020-09-06 08:27:15.610832'),
(3, 'beta', 'beta@gmail.com', '$2b$10$ok/W7erq5byMUWqnOHKxBegPZPxbwybGP8YJiNU1IwGi45d2nAd3q', 2, 1, '2020-09-06 08:29:39.463000', '2020-09-06 08:29:39.466279'),
(4, 'gamma', 'gamma@gmail.com', '$2b$10$e85koD6ozYaHjpYi8rUPx.JewUeY5xWDbDqZZBHbpIHCDvwF7oYeW', 2, 1, '2020-09-07 07:01:53.880000', '2020-09-07 07:01:53.885266');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;