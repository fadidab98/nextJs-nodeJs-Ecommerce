-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 12:50 AM
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

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`) VALUES
(134, 88, 120, 1),
(136, 89, 120, 1),
(137, 89, 121, 1);

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
(2, 'computer', 'computer', 'A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today’s mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.\r\n\r\nAlso, while mobile phones used to be mainly known as “cell phones” or cellular phones, today’s mobile phones are more commonly called “smartphones” because of all of the extra voice and data services that they offer.', 'A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today’s mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.\n', '1'),
(39, 'adsdsad', 'dasdasdsadasd', 'asdsadasdsadasdasdas', 'sadasdasdsadsadsadasdsad', ''),
(40, 'dasdasdasd', 'asdasdasdasd', 'sdsadasdasdasd', 'asdasdsadsadasdsad', '1');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(250) NOT NULL,
  `user_id` int(100) NOT NULL,
  `products` varchar(100) NOT NULL,
  `total` float NOT NULL,
  `subtotal` float NOT NULL,
  `delivery_status` varchar(30) NOT NULL,
  `payment_status` varchar(30) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `user_id`, `products`, `total`, `subtotal`, `delivery_status`, `payment_status`, `date`) VALUES
(3, 'cs_test_b1o4ulHgOO2G2Y0Pr30nExY7eMPOrJf4orlyF0iwM7KUxzplj4evQizRuR', 89, '[120,121]', 24400, 24400, 'pending', 'paid', '2023-05-07 22:13:22'),
(4, 'cs_test_b1pDVRvwc4RDJof5NXTKVcGDWMFJBkrO6JldVoH9e4joU837buNFuPiDqa', 89, '[120,121]', 24400, 24400, 'pending', 'paid', '2023-05-07 22:46:14');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`) VALUES
(2, 'show-product'),
(4, 'delete-product'),
(6, 'view-products'),
(8, 'create-product'),
(10, 'view-category'),
(11, 'edit-category'),
(12, 'delete-category'),
(13, 'create-category'),
(14, 'view-categories'),
(15, 'edit-product'),
(16, 'view-users'),
(17, 'view-user'),
(18, 'edit-user'),
(19, 'create-user'),
(20, 'delete-user');

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
  `product_sub_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_title`, `product_meta_title`, `product_description`, `product_meta_description`, `quantity`, `product_price`, `status`, `category_id`, `color`, `product_image`, `product_sub_image`) VALUES
(120, 'Samsung A25SG', 'Samsung A25SG', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 12, 122, '1', 1, 'red', 'https://res.cloudinary.com/dg2c3liap/image/upload/v1681763880/ilgdbgdkta68m5717v2x.jpg', '[\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681763881/yyq4rerb3udhluxnzovc.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681763881/ug0eue8zcuycbukjk72i.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681763881/irjjsfygc1ntvgq0rvjd.jpg\"]'),
(121, 'Samsung A30', 'Samsung A30', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 12, 122, '1', 1, 'red,green', 'https://res.cloudinary.com/dg2c3liap/image/upload/v1681767278/okglx33o9tmze38v2nhh.jpg', '[\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681767278/x5tr67ryrwarmjintlhc.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681767278/rlij0tl3gmifxc9yfz75.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681767278/kndzgctdr88cstg8xfm4.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681767278/zhqtkhcrq1g0yhjeyuue.jpg\"]'),
(122, 'Samsung A30 plus', 'Samsung A30 plus', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 12, 212, '1', 1, 'red', 'https://res.cloudinary.com/dg2c3liap/image/upload/v1681768133/sz4mftcaermvs5mpvefk.jpg', '[\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768135/t61dwzs2sbdkhtyutjhp.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768134/nmdnagqocgg7a3ubzs5h.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768134/zpcekbci42h7yuo8kq8w.jpg\"]'),
(123, 'Samsung A31', 'Samsung A31', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 12, 122, '1', 1, 'red,green', 'https://res.cloudinary.com/dg2c3liap/image/upload/v1681768236/qviik7wtupipmblur38y.jpg', '[\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768237/fkctlik7szrvecayjcot.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768237/ocgrrhujyga7hrdoxb1t.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768237/kchr9heg18iejuudk3vh.jpg\"]'),
(124, 'Samsung A31 plus', 'Samsung A31 plus', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 12, 122, '1', 1, 'red', 'https://res.cloudinary.com/dg2c3liap/image/upload/v1681768282/ujfwfdcliyywmwjzowsk.jpg', '[\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768283/zs2b8uerggmzg4neuocn.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768283/znm3j1pqtrun3niadett.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768283/psuxv9fk3xdfuhx2v48i.jpg\"]'),
(125, 'Samsung A33', 'Samsung A33', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 'An API, or application programming interface, is a set of pre-prepared coding instructions that third-party apps can subsume into their designs. These coding instructions provide third-party apps with pre-prepared functions, relieving developers of the responsibility to code in those functions from scratch. A mobile app development API is just an API meant to assist programmers in setting up mobile apps and providing them with various features.', 12, 122, '1', 1, 'red', 'https://res.cloudinary.com/dg2c3liap/image/upload/v1681768500/dmhq88oekgxhhlgjstxv.jpg', '[\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768500/xfvfesfygksn83vc4k1l.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768500/kuxfyrj5epvboejdxuxo.jpg\",\"https://res.cloudinary.com/dg2c3liap/image/upload/v1681768500/gqkukdsxcwswbqodi8qb.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `user_id`, `permission_id`) VALUES
(172, 89, 13),
(173, 89, 8),
(174, 89, 19),
(175, 89, 12),
(176, 89, 4),
(177, 89, 20),
(178, 89, 11),
(179, 89, 15),
(180, 89, 18),
(181, 89, 2),
(182, 89, 14),
(183, 89, 10),
(184, 89, 6),
(185, 89, 17),
(186, 89, 16),
(187, 89, 13),
(188, 89, 8),
(189, 89, 19),
(190, 89, 12),
(191, 89, 4),
(192, 89, 20),
(193, 89, 11),
(194, 89, 15),
(195, 89, 18),
(196, 89, 2),
(197, 89, 14),
(198, 89, 10),
(199, 89, 6),
(200, 89, 17),
(201, 89, 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('0','1') NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`) VALUES
(88, 'admin2', 'fadidab1998@gmail.com', '0', '$2a$10$mD5Km4Id2X1nhREumkrBb.m/9KPFDZRLu5EUac4lRfIMd0K811dFm'),
(89, 'admin2', 'admin2@gmail.com', '1', '$2a$10$Ni5InDYK8rRoloWbVUXubOd14w5tKbbS0Df6td74TKEpShUuAOoeK');

-- --------------------------------------------------------

--
-- Table structure for table `usertoken`
--

CREATE TABLE `usertoken` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usertoken`
--

INSERT INTO `usertoken` (`id`, `token`, `user_id`) VALUES
(2673, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODksInJvbGUiOiIxIiwicGVybWlzc2lvbiI6WyJzaG93LXByb2R1Y3QiLCJzaG93LXByb2R1Y3QiLCJkZWxldGUtcHJvZHVjdCIsImRlbGV0ZS1wcm9kdWN0Iiwidmlldy1wcm9kdWN0cyIsInZpZXctcHJvZHVjdHMiLCJjcmVhdGUtcHJvZHVjdCIsImNyZWF0ZS1wcm9kdWN0Iiwidmlldy1jYXRlZ29yeSIsInZpZXctY2F0ZWdvcnkiLCJlZGl0LWNhdGVnb3J5IiwiZWRpdC1jYXRlZ29yeSIsImRlbGV0ZS1jYXRlZ29yeSIsImRlbGV0ZS1jYXRlZ29yeSIsImNyZWF0ZS1jYXRlZ29yeSIsImNyZWF0ZS1jYXRlZ29yeSIsInZpZXctY2F0ZWdvcmllcyIsInZpZXctY2F0ZWdvcmllcyIsImVkaXQtcHJvZHVjdCIsImVkaXQtcHJvZHVjdCIsInZpZXctdXNlcnMiLCJ2aWV3LXVzZXJzIiwidmlldy11c2VyIiwidmlldy11c2VyIiwiZWRpdC11c2VyIiwiZWRpdC11c2VyIiwiY3JlYXRlLXVzZXIiLCJjcmVhdGUtdXNlciIsImRlbGV0ZS11c2VyIiwiZGVsZXRlLXVzZXIiXSwiaWF0IjoxNjgzNDk5ODA5LCJleHAiOjE2ODM2NzI2MDl9.EkLoWqqhkAGdDXLezc7oF2uov0WkbJnqYD0NVdZ90Ak', 89);

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
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertoken`
--
ALTER TABLE `usertoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `usertoken`
--
ALTER TABLE `usertoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2674;

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

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usertoken`
--
ALTER TABLE `usertoken`
  ADD CONSTRAINT `usertoken_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
