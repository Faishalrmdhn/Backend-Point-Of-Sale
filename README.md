<h1 align="center">ExpressJS - #Elcapp PointofSale RESTfull API</h1>

## Project_Background

in a store, the cashier is a measure of business development at the store. The cashier is the gate for revenue entry in a store.

Often the use of offline cashiers is faced with bookkeeping with so much data, not to mention if you want to analyze the development of the business, of course to determine how much daily, monthly and yearly income will be very troublesome.

So i built the ElCapp. Elcapp is a cashier application and mostly known as Point Of Sale Application. This App is provide your need to level up your business. With this App, you can monitor sales transactions that occur, without having to be behind a cash register or store location that you have. What's more, besides functioning as monitoring, the cashier application can also allow you to get real-time sales data analysis.

Some of the advantages of this application are :

1. Time Efficiency
2. Real time business analysis
3. Control your cashflow
4. Cheap Maintenance fee
5. Build more trust to your customer
6. Help increase the profit
7. Minimalize error in your report data
8. Can access in anywhere you want
9. Can use in any device

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>
6. <a href="https://www.npmjs.com/package/jsonwebtoken">JSON Web Token</a>
7. <a href="https://www.npmjs.com/package/multer">multer</a>
8. MySQL
9. <a href="https://www.npmjs.com/package/redis">Redis</a>

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
```

## End Point

**1. GET**

- `/product`(Get all product include sorting, pagination & limit)
- `/product/:id`(Get all product by id)
- `/product/search/name`(Get all product by name)
- `/category`(Get all category)
- `/category/:id`(Get all category by id)
- `/history`(Get all history)
- `/category/:id`(Get all history by id)
- `/orders`(Get all orders)
- `/orders/:id`(Get all orders by id)
- `/users/login`(Get all registered acount)

**2. POST**

- `/product` (Post product)

  - `{ "product_name": "Wiener Schnitzel", "category_id": 1 | 2, "product_price": 69000 , "product_status" : 1 | 0,"product_image : item9.png"}`

- `/category` (Post category)
- `/history` (Post history)
- `/CheckOut` (Post checkout data orders)
- `/orders` (Post orders)
- `/users/register` (Post data registered account)

  **3. PATCH**

- `/product/:id` (Update product by id)
  - `{"product_name" : "Mouse", "category_id" : 1, "product_harga" : 100000, "product_status" : 1 | 0}`
- `/category/:id` (Update category by id)
- `/history/:id` (Update history by id)
- `/users/admin` (Admin can update & controlling cashier status to active/inactive)

**4. DELETE**

- `/product/:id` (Delete product by id)
- `/category/:id` (Delete category by id)

## Postman

- https://web.postman.co/collections/12322022-7d363784-329d-4527-9208-1d232d26574a?version=latest&workspace=03fb1f6a-9425-44f5-808d-a75d7f6d3f7b

## Data Base

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

/_!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT _/;
/_!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS _/;
/_!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION _/;
/_!40101 SET NAMES utf8mb4 _/;

--
-- Database: `onlineshop`
--

---

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

---

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

---

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

---

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

---

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

/_!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT _/;
/_!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS _/;
/_!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION _/;

---unfinished ReadMe---
