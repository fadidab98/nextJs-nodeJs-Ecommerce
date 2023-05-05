-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2023 at 07:58 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodeapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_title` varchar(100) NOT NULL,
  `category_meta_title` varchar(100) NOT NULL,
  `category_description` text NOT NULL,
  `category_meta_description` text NOT NULL,
  `status` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_title`, `category_meta_title`, `category_description`, `category_meta_description`, `status`) VALUES
(1, 'mobile', 'mobile', 'A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today’s mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.\r\n\r\nAlso, while mobile phones used to be mainly known as “cell phones” or cellular phones, today’s mobile phones are more commonly called “smartphones” because of all of the extra voice and data services that they offer.', '9', '1'),
(2, 'computer', 'computer', 'A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today’s mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.\r\n\r\nAlso, while mobile phones used to be mainly known as “cell phones” or cellular phones, today’s mobile phones are more commonly called “smartphones” because of all of the extra voice and data services that they offer.', '9', '0');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_title` varchar(100) NOT NULL,
  `product_meta_title` varchar(100) NOT NULL,
  `product_description` text NOT NULL,
  `product_meta_description` text NOT NULL,
  `quantity` int(10) NOT NULL,
  `product_price` float NOT NULL,
  `status` enum('0','1') NOT NULL,
  `category_id` int(11) NOT NULL,
  `color` varchar(100) NOT NULL,
  `product_image` varchar(200) NOT NULL,
  `product_sub_image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_title`, `product_meta_title`, `product_description`, `product_meta_description`, `quantity`, `product_price`, `status`, `category_id`, `color`, `product_image`, `product_sub_image`) VALUES
(2, 'Samsung a30', 'Samsung a30', 'A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today’s mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.\r\n\r\nAlso, while mobile phones used to be mainly known as “cell phones” or cellular phones, today’s mobile phones are more commonly called “smartphones” because of all of the extra voice and data services that they offer.', 'A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today’s mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.\r\n\r\nAlso, while mobile phones used to be mainly known as “cell phones” or cellular phones, today’s mobile phones are more commonly called “smartphones” because of all of the extra voice and data services that they offer.', 1, 0, '1', 2, 'white', 'a.js', ''),
(3, 'Samsung A22', 'Samsung A22', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 0, 212, '1', 1, 'white', 'sdasd', 'asdasd'),
(4, 'Samsung A23 New', 'Samsung A23 New', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 0, 212, '1', 1, 'white', 'sdasd', 'asdasd'),
(5, 'Samsung A24', 'Samsung A24', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 0, 212, '1', 1, 'white', 'sdasd', 'asdasd'),
(6, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(7, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 2, 'white', 'sdsad', 'sdsdsd'),
(8, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(9, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(10, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(11, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(12, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(13, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(14, 'Samsung A25', 'Samsung A25', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 111, 222, '1', 1, 'white', 'sdsad', 'sdsdsd'),
(16, 'adadadasdadadad', 'adadadadadadad', 'adadadadadadad', 'adadadadadadad', 69, 69, '1', 1, 'red,yellow', '1', '2'),
(17, 'product 3/12 name', 'product 3/12 name', 'product 3/12 description', 'product 3/12 description', 312, 312, '0', 1, '[object Object],[object Object]', '1', '2'),
(18, 'productTwo3/12 name 1', 'productTwo3/12 name 1', 'productTwo3/12 description', 'productTwo3/12 description', 22, 22, '1', 1, 'green,blue', '1', '2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('0','1') NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`) VALUES
(11, 'admin2', 'admin2@gmail.com', '1', '$2a$10$CeKyN7kTJViX2WMPIKh0deq5diurlA7eKWR/8H/wk9I'),
(12, 'fadidab1998', 'fadidab1998@gmail.com', '1', '$2a$10$B0aC5No2FElfmq4OYiCmLeyM03kXGUOcwoUyJ859RIG'),
(13, 'dwdwadwd', 'wadwadwd@gmail.com', '0', '$2a$10$HWmKO0mTbNWKAfdkylHcHu2OLyhi1pl/MAxTUnNy7nF'),
(14, 'fadidab19dasdw', 'fadidab19dasdw@gmail.com', '1', '$2a$10$KztIVFZSvHZw3fQap5yDaeC1WgNRpVWZttrVoNQ6OVj'),
(15, 'dsadsad', 'dsasdas@gmail.com', '0', '$2a$10$r/ZPQHNj9Fdx8fLMa5yF.eJZTdgQtRI0zXWpX9JKohy'),
(16, 'admin3', 'admin3@gmail.com', '1', '$2a$10$FbEyQvaNpYEmwFFR6g.x5.tDvg5ANzIVTkz77Rvi2aS'),
(17, 'mohamad', 'adwwwwwwwwwww@gmail.com', '1', '$2a$10$ybIAJ/HDbLk2ZiFDvjJqaOV.1J6IrG1CMHF3DQkXn16'),
(18, 'Fadi', 'fadiwork08@gmail.com', '0', '$2a$10$oWonndh6cW7LKCOHVc2d5OC3F2z5vWbFTWN/qif8xoq'),
(19, 'fadidab19981', 'fadidab19981@gmail.com', '1', '$2a$10$6ZG8aarZ3BDQATaaaWmaUOiKsMt8uUs8pa3tKInY7RM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
