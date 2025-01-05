-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2025 at 11:06 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `websitemuontrasachthuvientvu`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `password`, `phone`, `email`) VALUES
(1, 'Admin Thư Viện TVU', '$2y$10$sLdJWm1lygWZUT2Ma4hsKOUfRKhcldc1f4tnR4vDiFULPPvUDW3BS', '0869094929', 'websitemuontrasachthuvientvu@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `language` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `available_quantity` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `image`, `title`, `author`, `publisher_id`, `publication_date`, `category_id`, `language`, `pages`, `description`, `available_quantity`) VALUES
(42, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734999574/book_images/pwfsvk5efttsftcrfgzz.png', 'Lập Trình C++', 'Bjarne Stroustrup', 17, '1993-03-12', 1, 'Tiếng Việt', 287, 'Cuốn sách này cung cấp kiến thức cơ bản và nâng cao về C++, bao gồm các tính năng hiện đại như C++11, C++14, C++17, hướng dẫn thực hành và kỹ thuật tối ưu hóa mã.', 29),
(44, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735000254/book_images/d7xpshjysgizu6cf24vi.jpg', 'Truyện Kiều', 'Nguyễn Du', 4, '0000-00-00', 17, 'Tiếng Việt', 325, 'Tác phẩm kinh điển của nền văn học Việt Nam, kể về số phận bi thương của nàng Kiều qua 15 năm lưu lạc.', 25),
(45, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735000430/book_images/ncze7hk0pvwpnyr8flch.jpg', 'Dune', 'Frank Herbert', 19, '0000-00-00', 4, 'Tiếng Anh', 412, 'Dune là tiểu thuyết khoa học viễn tưởng kinh điển, kể về câu chuyện chính trị, tôn giáo, và sinh tồn trên hành tinh sa mạc Arrakis, nơi có nguồn tài nguyên quý giá nhất vũ trụ - \"spice\".', 5),
(46, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735000590/book_images/bvzynwhrvbicbtnczecg.jpg', 'Toán Cao Cấp', 'Nguyễn Đình Trí', 2, '0000-00-00', 2, 'Tiếng Việt', 512, 'Cuốn sách \"Toán Cao Cấp\" cung cấp những kiến thức nền tảng và chuyên sâu về giải tích, đại số tuyến tính và phương trình vi phân, phù hợp với sinh viên các trường đại học, cao đẳng và những người yêu thích nghiên cứu toán học.', 18),
(48, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735276562/book_images/hkffbk9dyrvzoe3awlyo.jpg', 'Tắt Đèn', 'Ngô Tất Tố', 2, '0000-00-00', 3, 'Tiếng Việt', 278, 'Tắt đèn là một trong những tác phẩm văn học tiêu biểu nhất của nhà văn Ngô Tất Tố. Đây là một tác phẩm văn học hiện thực phê phán với nội dung nói về cuộc sống khốn khổ của tầng lớp nông dân Việt Nam đầu thế kỉ XX dưới ách đô hộ của thực dân Pháp.', 28);

-- --------------------------------------------------------

--
-- Table structure for table `book_condition_on_return`
--

CREATE TABLE `book_condition_on_return` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_condition_on_return`
--

INSERT INTO `book_condition_on_return` (`id`, `name`) VALUES
(1, 'Nguyên vẹn'),
(2, 'Rách trang'),
(3, 'Mất trang'),
(4, 'Bị ướt'),
(5, 'Cũ nhưng đầy đủ nội dung');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_list`
--

CREATE TABLE `borrow_list` (
  `id` int(11) NOT NULL,
  `borrow_request_id` int(11) NOT NULL,
  `status_user` enum('Chờ nhận sách','Đang mượn sách','Đã trả sách') COLLATE utf8mb4_unicode_ci DEFAULT 'Chờ nhận sách',
  `book_condition_id` int(11) DEFAULT NULL,
  `fine_fee_id` int(11) DEFAULT NULL,
  `return_day` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `borrow_list`
--

INSERT INTO `borrow_list` (`id`, `borrow_request_id`, `status_user`, `book_condition_id`, `fine_fee_id`, `return_day`) VALUES
(32, 28, 'Đã trả sách', 4, 3, '2024-12-31'),
(33, 29, 'Đã trả sách', 3, 3, '2025-01-07'),
(35, 30, 'Chờ nhận sách', NULL, NULL, '2025-01-16');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_requests`
--

CREATE TABLE `borrow_requests` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL,
  `return_date` date NOT NULL,
  `status` enum('Chờ xử lý','Duyệt','Hủy') COLLATE utf8mb4_unicode_ci DEFAULT 'Chờ xử lý',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `borrow_requests`
--

INSERT INTO `borrow_requests` (`id`, `book_id`, `quantity`, `user_id`, `return_date`, `status`, `created_at`) VALUES
(28, 42, 4, 5, '2024-12-31', 'Duyệt', '2024-12-29 12:25:32'),
(29, 42, 5, 5, '2025-01-07', 'Duyệt', '2025-01-02 07:53:27'),
(30, 42, 3, 5, '2025-01-16', 'Duyệt', '2025-01-03 17:01:38');

--
-- Triggers `borrow_requests`
--
DELIMITER $$
CREATE TRIGGER `add_to_borrow_list` AFTER INSERT ON `borrow_requests` FOR EACH ROW BEGIN
    IF NEW.status = 'Duyệt' THEN
        INSERT INTO borrow_list (borrow_request_id, status_user, created_at)
        VALUES (NEW.id, 'Chờ nhận sách', NOW());
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_borrow_request_approved` AFTER UPDATE ON `borrow_requests` FOR EACH ROW BEGIN
    -- Thêm bản ghi mới vào borrow_list nếu trạng thái là "Duyệt"
    IF NEW.status = 'Duyệt' AND OLD.status != 'Duyệt' THEN
        INSERT INTO borrow_list (borrow_request_id, status_user, return_day)
        VALUES (NEW.id, 'Chờ nhận sách', NEW.return_date);
    END IF;

    -- Xóa bản ghi trong borrow_list nếu trạng thái là "Chờ xử lý" hoặc "Hủy"
    IF NEW.status IN ('Chờ xử lý', 'Hủy') THEN
        DELETE FROM borrow_list
        WHERE borrow_request_id = NEW.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Lập trình'),
(2, 'Giáo khoa'),
(3, 'Văn học'),
(4, 'Khoa học viễn tưởng'),
(5, 'Giả tưởng'),
(6, 'Kinh dị'),
(7, 'Trinh thám'),
(8, 'Tiểu sử'),
(9, 'Phát triển bản thân'),
(10, 'Kinh doanh'),
(11, 'Lịch sử'),
(12, 'Nghệ thuật'),
(13, 'Thiếu nhi'),
(14, 'Tâm linh'),
(15, 'Ẩm thực'),
(17, 'Thơ ca, Văn học cổ điển');

-- --------------------------------------------------------

--
-- Table structure for table `fine_fee`
--

CREATE TABLE `fine_fee` (
  `id` int(11) NOT NULL,
  `fee` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fine_fee`
--

INSERT INTO `fine_fee` (`id`, `fee`) VALUES
(1, '0.00'),
(2, '50000.00'),
(3, '100000.00'),
(4, '200000.00'),
(5, '500000.00');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`) VALUES
(1, 'NXB Trẻ'),
(2, 'NXB Giáo Dục Việt Nam'),
(3, 'NXB Đại Học Quốc Gia'),
(4, 'NXB Văn Học'),
(5, 'NXB Đại Học Trà Vinh'),
(6, 'NXB Kim Đồng'),
(7, 'NXB Chính Trị Quốc Gia'),
(8, 'NXB Thế Giới'),
(9, 'NXB Lao Động'),
(10, 'NXB Giao Thông Vận Tải'),
(11, 'NXB Nông Nghiệp'),
(12, 'NXB Công Thương'),
(13, 'NXB Y Học'),
(14, 'NXB Thể Thao'),
(15, 'NXB Khoa Học Tự Nhiên'),
(17, 'NXB Khoa Học & Kỹ Thuật'),
(19, 'NXB Chilton Books'),
(20, 'NXB Houghton Mifflin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `class` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `major` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `date`, `class`, `major`, `faculty`, `school`, `phone`, `email`, `address`, `otp`, `otp_expiry`) VALUES
(5, 'Nguyen Anh Tuan', '$2y$10$7WuMUegQ6JLDwzBTgShS4e4LBKGWJfwUs9gvILS932Di5GCp4Sw1u', '2003-12-10', 'DA21TTA', 'Công nghệ thông tin', 'Kỹ thuật & Công nghệ', 'Đại học Trà Vinh', '0869094929', 'nguyenanhtuan.profile@gmail.com', 'Đầu Bờ, Hòa Thuận, Châu Thành, Trà Vinh', NULL, NULL),
(12, 'Kim Thi Que Tran', '$2y$10$m6kvSyetzvtryuY9gxPHQ.eTFTNNod/Lxq.IsB.0TDD7pDTUcmdD6', '2003-11-26', 'DA21MNB', 'Giáo dục mầm non', 'Sư phạm', 'Đại học Trà Vinh', '0385236993', 'tranque913@gmail.com', 'Trà Cú', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publisher_id` (`publisher_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `book_condition_on_return`
--
ALTER TABLE `book_condition_on_return`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrow_list`
--
ALTER TABLE `borrow_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_borrow_list_borrow_request` (`borrow_request_id`),
  ADD KEY `book_condition_id` (`book_condition_id`),
  ADD KEY `fine_fee_id` (`fine_fee_id`);

--
-- Indexes for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fine_fee`
--
ALTER TABLE `fine_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `book_condition_on_return`
--
ALTER TABLE `book_condition_on_return`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `borrow_list`
--
ALTER TABLE `borrow_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `fine_fee`
--
ALTER TABLE `fine_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `borrow_list`
--
ALTER TABLE `borrow_list`
  ADD CONSTRAINT `borrow_list_ibfk_1` FOREIGN KEY (`book_condition_id`) REFERENCES `book_condition_on_return` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `borrow_list_ibfk_2` FOREIGN KEY (`fine_fee_id`) REFERENCES `fine_fee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_borrow_list_borrow_request` FOREIGN KEY (`borrow_request_id`) REFERENCES `borrow_requests` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  ADD CONSTRAINT `borrow_requests_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `borrow_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
