-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2025 at 09:41 PM
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
(44, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735000254/book_images/d7xpshjysgizu6cf24vi.jpg', 'Truyện Kiều', 'Nguyễn Du', 4, '2005-09-05', 17, 'Tiếng Việt', 325, 'Tác phẩm kinh điển của nền văn học Việt Nam, kể về số phận bi thương của nàng Kiều qua 15 năm lưu lạc.', 25),
(45, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735000430/book_images/ncze7hk0pvwpnyr8flch.jpg', 'Dune', 'Frank Herbert', 19, '2011-03-15', 4, 'Tiếng Anh', 412, 'Dune là tiểu thuyết khoa học viễn tưởng kinh điển, kể về câu chuyện chính trị, tôn giáo, và sinh tồn trên hành tinh sa mạc Arrakis, nơi có nguồn tài nguyên quý giá nhất vũ trụ - \"spice\".', 5),
(46, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735000590/book_images/bvzynwhrvbicbtnczecg.jpg', 'Toán Cao Cấp', 'Nguyễn Đình Trí', 2, '2007-06-28', 2, 'Tiếng Việt', 512, 'Cuốn sách \"Toán Cao Cấp\" cung cấp những kiến thức nền tảng và chuyên sâu về giải tích, đại số tuyến tính và phương trình vi phân, phù hợp với sinh viên các trường đại học, cao đẳng và những người yêu thích nghiên cứu toán học.', 18),
(48, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735276562/book_images/hkffbk9dyrvzoe3awlyo.jpg', 'Tắt Đèn', 'Ngô Tất Tố', 2, '1995-09-05', 3, 'Tiếng Việt', 278, 'Tắt đèn là một trong những tác phẩm văn học tiêu biểu nhất của nhà văn Ngô Tất Tố. Đây là một tác phẩm văn học hiện thực phê phán với nội dung nói về cuộc sống khốn khổ của tầng lớp nông dân Việt Nam đầu thế kỉ XX dưới ách đô hộ của thực dân Pháp.', 28),
(49, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736411467/book_images/cx4qvpq1t1gj10evpt1t.jpg', 'Đắc Nhân Tâm', 'Dale Carnegie', 21, '2021-06-15', 9, 'Tiếng Việt', 320, 'Một trong những cuốn sách kinh điển về nghệ thuật giao tiếp và phát triển bản thân, giúp bạn xây dựng mối quan hệ tốt đẹp trong công việc và cuộc sống.', 50),
(50, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736412159/book_images/vgueg9ji6xfqwydcirj3.jpg', 'Sapiens: Lược Sử Loài Người', 'Yuval Noah Harari', 8, '2022-02-02', 11, 'Tiếng Việt', 500, 'Cuốn sách kể về lịch sử phát triển của loài người, từ những ngày đầu tiên xuất hiện trên Trái Đất đến thời đại công nghệ hiện đại.', 30),
(51, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736412296/book_images/x9255ac0nqdls24sibnm.jpg', 'Cà Phê Cùng Tony', 'Tony Buổi Sáng', 1, '2011-08-01', 9, 'Tiếng Việt', 264, 'Một cuốn sách nhẹ nhàng nhưng sâu sắc, chia sẻ các bài học và kinh nghiệm sống thông qua những câu chuyện hài hước và ý nghĩa.', 40),
(52, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736412901/book_images/q3fuqxexibeu00dncgzq.jpg', 'Tôi Tự Học', 'Thu Giang Nguyễn Duy Cần', 22, '2020-03-10', 18, 'Tiếng Việt', 200, 'Cuốn sách giúp người đọc tìm ra phương pháp học tập đúng đắn và tự mình tiếp thu tri thức một cách hiệu quả nhất.', 25),
(53, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736413014/book_images/scmdjlk6ldnc9lrpfpwi.jpg', '\"Atomic Habits\" (Thói Quen Nguyên Tử)', 'James Clear', 9, '2022-11-01', 9, 'Tiếng Việt', 320, 'Một cuốn sách hướng dẫn cách tạo lập và duy trì thói quen tốt để đạt được thành công trong cuộc sống và công việc.', 11),
(54, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736525672/book_images/wuganfiqohkktz4rhbzw.jpg', 'The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 17, '1999-02-16', 1, 'Tiếng Anh', 352, 'Cuốn sách hướng dẫn lập trình viên phát triển kỹ năng thực tế, cải thiện cách giải quyết vấn đề và xây dựng phần mềm chất lượng cao. Sách thuộc danh sách của bạn.', 8),
(55, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736525843/book_images/qbfaludjg5wpsywdicu2.jpg', 'Chạng Vạng (Twilight)', 'Stephenie Meyer', 1, '2005-01-01', 5, 'Tiếng Việt', 498, 'Một câu chuyện tình yêu đầy kịch tính giữa Bella Swan và Edward Cullen.', 32),
(56, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736526171/book_images/r41rsurvnmtckkygyhk4.jpg', 'Pet Sematary (Nghĩa Địa Thú Cưng)', 'Stephen King', 23, '2022-11-05', 6, 'Tiếng Việt', 592, 'Hai lần được chuyển thể thành phim (1989 và 2019). Pet Sematary bản 1989 được đánh giá là một trong những phim kinh dị \"cult culture\" (những bộ phim không được giới phê bình đánh giá cao, không có doanh thu lớn, không được công chúng yêu thích, nhưng được một nhóm nhỏ yêu thích cuồng nhiệt). Nhận được tận 6,6 điểm trên IMDb, có số lượng DVD bán ra rất chạy, và được nhắc đến nhiều trong các bộ phim khác. Đây là một trong những tiểu thuyết kinh dị xuất sắc và mang tính biểu tượng nhất của Stephen King.', 12),
(57, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736526852/book_images/myicnjk2qinyk7ahc79m.jpg', 'Nhà Giả Kim', 'Paulo Coelho', 24, '1988-01-01', 19, 'Tiếng Việt', 208, 'Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông.', 4),
(58, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527030/book_images/rxbviderbnzxtvjftj1w.jpg', 'Bố Già', 'Mario Puzo', 25, '1969-03-10', 20, 'Tiếng Việt', 448, 'Tiểu thuyết kể về gia đình mafia Corleone, khám phá quyền lực, tình gia đình và tội ác trong thế giới ngầm.', 34),
(59, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527243/book_images/gsjfsguysagsmmekgec7.jpg', 'Ông Già Và Biển Cả', 'Ernest Hemingway', 26, '1952-09-01', 21, 'Tiếng Anh', 127, 'Câu chuyện về cuộc đấu tranh giữa một ngư dân già và con cá kiếm khổng lồ, biểu tượng cho sự kiên trì và ý chí con người.', 6),
(60, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527360/book_images/rxlgor17m9hdmbuhqt4q.jpg', 'Hoàng Tử Bé', 'Antoine de Saint-Exupéry', 27, '1943-04-06', 22, 'Tiếng Anh', 96, 'Câu chuyện triết lý về cuộc gặp gỡ giữa một phi công và cậu bé đến từ hành tinh khác, khám phá những giá trị cuộc sống và tình yêu.', 3),
(61, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527452/book_images/c2mckgdtkphpnmxvfaq1.jpg', 'Cuốn Theo Chiều Gió', 'Margaret Mitchell', 28, '1936-06-30', 23, 'Tiếng Anh', 1037, 'Tiểu thuyết kể về cuộc đời của Scarlett O\'Hara trong bối cảnh Nội chiến Mỹ, với những biến động về tình yêu và xã hội.', 9),
(62, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527773/book_images/fp46ntppdxhivetkzx7u.jpg', 'Chúa Tể Những Chiếc Nhẫn - Phần 1', 'J.R.R. Tolkien', 29, '1954-07-29', 24, 'Tiếng Việt', 507, 'Bộ tiểu thuyết kể về hành trình tiêu diệt chiếc Nhẫn quyền lực để cứu Trung Địa khỏi thế lực hắc ám.', 3),
(63, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527897/book_images/kdqwldqnpct8f0he4k9p.jpg', 'Chúa Tể Những Chiếc Nhẫn - Phần 2', 'J.R.R. Tolkien', 29, '1954-11-11', 24, 'Tiếng Việt', 464, 'Bộ tiểu thuyết kể về hành trình tiêu diệt chiếc Nhẫn quyền lực để cứu Trung Địa khỏi thế lực hắc ám.', 2),
(64, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736527984/book_images/ztvxisp2vtt4e1dv5n4q.jpg', 'Chúa Tể Những Chiếc Nhẫn - Phần 3', 'J.R.R. Tolkien', 29, '1955-10-20', 24, 'Tiếng Việt', 516, 'Bộ tiểu thuyết kể về hành trình tiêu diệt chiếc Nhẫn quyền lực để cứu Trung Địa khỏi thế lực hắc ám.', 1),
(65, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736528782/book_images/kkpjzm87ukiqikeqohle.jpg', 'Việt Nam Sử Lược', 'Trần Trọng Kim', 1, '1920-03-19', 11, 'Tiếng Việt', 656, 'Cuốn sách lịch sử Việt Nam đầu tiên viết bằng chữ quốc ngữ, hệ thống lại toàn bộ lịch sử nước Việt từ thời cổ đại đến thời Pháp thuộc.', 6),
(66, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736528880/book_images/jtbplnkekpn5r4ry17s5.jpg', 'Đại Việt Sử Ký Toàn Thư', 'Nhiều tác giả, chủ biên Ngô Sĩ Liên', 4, '1993-01-01', 11, 'Tiếng Việt', 1200, 'Bộ quốc sử quan trọng, ghi chép lịch sử Việt Nam từ thời Hồng Bàng đến năm 1675.', 23),
(67, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736528964/book_images/knfzz3szkotjy425nvqr.jpg', 'Sử Việt – 12 Khúc Tráng Ca', 'Dũng Phan', 1, '2017-10-06', 11, 'Tiếng Việt', 320, 'Kể về 12 câu chuyện dựng nước và giữ nước thời phong kiến, được chọn lọc theo tính chất quan trọng và hùng tráng trong dòng chảy lịch sử Việt Nam.', 6),
(68, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529081/book_images/gnt7wmfxlxgsnpegdsfg.jpg', 'Nam Phương - Hoàng Hậu Cuối Cùng', 'Lý Nhân Phan Thứ Lang', 30, '2013-09-18', 8, 'Tiếng Việt', 280, 'Tập hợp những câu chuyện về Hoàng hậu Nam Phương, từ cuộc sống bình lặng đến cuộc sống đầy quyền lực nhưng đau khổ.', 4),
(69, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529155/book_images/r6gacmxcldrlokadnnfl.jpg', 'Mật Bổn - Những Bí Ẩn Lịch Sử Việt Nam Cổ Trung Đại', 'Trần Trọng Dương', 8, '2019-08-06', 11, 'Tiếng Việt', 400, 'Khám phá sự thật ẩn giấu trong lịch sử và công việc của các sử gia, từ bản kể đầu tiên đến những bí ẩn chưa được giải đáp.', 2),
(70, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529244/book_images/t7qgvlklrtemk3capnq7.jpg', 'An Nam Truyện', 'Châu Hải Đường', 31, '2022-01-19', 11, 'Tiếng Việt', 500, 'Ghi chép về lịch sử Việt Nam trong chính sử Trung Quốc từ thời nhà Tần đến năm 1911, bao gồm các vương quốc như Chiêm Thành và Phù Nam.', 5),
(71, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529467/book_images/eljsddccfyntb62tzfqz.jpg', 'Những Người Khốn Khổ', 'Victor Hugo', 32, '1862-04-03', 25, 'Tiếng Anh', 1462, 'Tiểu thuyết kể về cuộc đời của Jean Valjean, một cựu tù nhân tìm kiếm sự chuộc tội và ý nghĩa cuộc sống trong bối cảnh xã hội Pháp đầy biến động. Tác phẩm phản ánh sâu sắc về công lý, đạo đức và tình thương.', 3),
(72, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529546/book_images/imdqzjdgvz9equu3p1dm.jpg', 'Chiến Tranh và Hòa Bình', 'Leo Tolstoy', 33, '1869-01-01', 26, 'Tiếng Anh', 1225, 'Tác phẩm sử thi về cuộc sống của giới quý tộc Nga trong thời kỳ chiến tranh Napoleon, khám phá sâu sắc về tình yêu, gia đình và ý nghĩa của cuộc sống.', 5),
(73, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529620/book_images/ax8wvvtkluj41hdxqc2y.jpg', 'Trăm Năm Cô Đơn', 'Gabriel García Márquez', 34, '1967-05-30', 27, 'Tiếng Anh', 417, 'Câu chuyện về bảy thế hệ của gia đình Buendía trong ngôi làng hư cấu Macondo, phản ánh sự cô đơn và vòng lặp của lịch sử.', 1),
(74, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529704/book_images/qapufxbgdqfpdfuzajb6.jpg', 'Đồi Gió Hú', 'Emily Brontë', 35, '1947-07-05', 28, 'Tiếng Anh', 416, 'Câu chuyện tình yêu đầy bi kịch giữa Heathcliff và Catherine Earnshaw, với bối cảnh trên những cánh đồng hoang dã của Yorkshire.', 2),
(75, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736529934/book_images/yz0mvxsgq4dx0ll4cmc8.jpg', 'Sáng Tạo Không Giới Hạn', 'Ken Robinson', 36, '2001-01-29', 10, 'Tiếng Việt', 288, 'Cuốn sách này là một hành trình khám phá cách thức sáng tạo có thể được áp dụng trong môi trường kinh doanh để thúc đẩy đổi mới và phát triển. Tác giả Ken Robinson thảo luận về cách các tổ chức có thể khai thác sức mạnh của sự sáng tạo trong đội ngũ của họ và tạo ra những giải pháp kinh doanh đột phá. Robinson cũng chỉ ra những sai lầm phổ biến mà nhiều tổ chức mắc phải trong việc nuôi dưỡng sự sáng tạo, đồng thời cung cấp các chiến lược cụ thể để khuyến khích sự sáng tạo trong công việc hàng ngày. Cuốn sách không chỉ thích hợp cho các nhà lãnh đạo doanh nghiệp mà còn cho bất kỳ ai quan tâm đến việc xây dựng một môi trường làm việc đổi mới sáng tạo.', 3),
(76, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736530092/book_images/ruau313lch3mic0b9bup.jpg', 'Con Đường Hạnh Phúc', 'Thích Nhất Hạnh', 37, '1998-09-18', 14, 'Tiếng Việt', 220, '\"Con Đường Hạnh Phúc\" là cuốn sách của Thiền sư Thích Nhất Hạnh, một trong những bậc thầy tâm linh nổi tiếng của Việt Nam. Cuốn sách hướng dẫn người đọc cách tìm thấy sự bình an và hạnh phúc qua việc sống trong hiện tại, thực hành thiền và chánh niệm. Thích Nhất Hạnh chia sẻ những lời dạy sâu sắc về cách nhận thức và chuyển hóa nỗi khổ đau trong cuộc sống, tìm ra ý nghĩa thực sự của hạnh phúc qua từng hơi thở, từng bước đi, từng khoảnh khắc trong cuộc sống hàng ngày. Cuốn sách không chỉ là một bài học về tâm linh mà còn là một cẩm nang thực hành về sự tỉnh thức và yêu thương trong cuộc sống.', 3),
(77, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736530231/book_images/sccl0kryy4riavrepuvv.jpg', 'Kẻ Săn Lùng', 'John Grisham', 38, '2015-11-03', 7, 'Tiếng Anh', 421, 'Cuốn sách \"Kẻ Săn Lùng\" của John Grisham là một tác phẩm trinh thám đầy căng thẳng và bất ngờ. Câu chuyện xoay quanh một vụ án mạng bí ẩn, nơi mà kẻ giết người dường như không thể bị bắt. Với sự tham gia của các nhân vật chính, bao gồm một cựu điều tra viên cảnh sát và một luật sư, họ phải kết hợp với nhau để giải mã những manh mối phức tạp và tìm ra sự thật đằng sau cái chết của một người phụ nữ. Bằng cách sử dụng các yếu tố tâm lý và những tình tiết bất ngờ, John Grisham đã tạo ra một cuốn sách trinh thám hấp dẫn và đầy kịch tính, thu hút người đọc từ đầu đến cuối.', 2),
(78, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736530334/book_images/fqyvsjwcjlqqtdwo1hjs.jpg', 'Savour: A Chef\'s Memoir', 'Marcus Samuelsson', 39, '2012-10-19', 15, 'Tiếng Việt', 352, '\"Savour: A Chef\'s Memoir\" là cuốn hồi ký của đầu bếp nổi tiếng Marcus Samuelsson, người đã được nuôi dưỡng ở Ethiopia, lớn lên tại Thụy Điển và sau đó trở thành một trong những đầu bếp hàng đầu tại Mỹ. Cuốn sách không chỉ cung cấp các công thức nấu ăn mà còn là một hành trình đầy cảm hứng về việc khám phá và kết hợp các hương vị và văn hóa từ nhiều nền ẩm thực khác nhau. Marcus chia sẻ những câu chuyện về gia đình, hành trình nghề nghiệp, và cách anh tìm thấy niềm đam mê với nấu ăn. Những công thức trong cuốn sách này mang đậm dấu ấn của sự kết hợp giữa truyền thống và sự sáng tạo, giúp người đọc khám phá thế giới ẩm thực đa dạng và phong phú.', 10),
(79, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736530503/book_images/o6pfedvau6lktdghwp1y.jpg', 'The Story of Art', 'E.H. Gombrich', 40, '1950-01-01', 12, 'Tiếng Anh', 688, '\"The Story of Art\" là một trong những cuốn sách nghệ thuật nổi tiếng nhất, cung cấp cái nhìn tổng quan về lịch sử nghệ thuật từ thời cổ đại đến hiện đại. Gombrich giải thích các phong cách và xu hướng nghệ thuật qua những tác phẩm nổi bật, giúp người đọc dễ dàng tiếp cận và hiểu được sự phát triển của nghệ thuật qua các thời kỳ.', 4),
(80, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736536648/book_images/yuergqr4zqvl3mxfz1yc.jpg', 'Nghĩ Giàu & Làm Giàu', 'Napoleon Hill', 41, '1937-07-05', 10, 'Tiếng Việt, Tiếng Anh', 320, 'Cuốn sách hướng dẫn 13 nguyên tắc để đạt được thành công và thịnh vượng trong cuộc sống.', 2),
(81, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736536797/book_images/kaf8xxzxzh4pivgyisvd.jpg', 'Thép Đã Tôi Thế Đấy', 'Nikolai Ostrovsky', 4, '1934-09-09', 29, 'Tiếng Nga, Tiếng Việt', 352, 'Tác phẩm kể về cuộc đời của Pavel Korchagin, biểu tượng cho tinh thần cách mạng và ý chí kiên cường.', 7),
(82, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736536948/book_images/nzjetb3za50otnxbuyqw.jpg', 'Tội Ác Và Hình Phạt', 'Fyodor Dostoevsky', 33, '1866-01-15', 29, 'Tiếng Nga, Tiếng Việt', 671, 'Tác phẩm kinh điển về tâm lý tội phạm, kể về Raskolnikov – một chàng trai trẻ giằng xé giữa lương tâm và tội lỗi sau khi thực hiện một vụ giết người.', 9),
(83, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537040/book_images/bff14mzpqzroh62tg9oo.jpg', 'Chí Phèo', 'Nam Cao', 4, '1941-05-09', 3, 'Tiếng Việt', 96, 'Tác phẩm xuất sắc của Nam Cao, miêu tả cuộc đời bi thảm của Chí Phèo, phản ánh xã hội phong kiến áp bức và thối nát.', 3),
(84, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537125/book_images/e7yidbasjhfzdkl2sejm.jpg', 'Hành Trình Về Phương Đông', 'Baird T. Spalding', 42, '1924-05-06', 30, 'Tiếng Anh, Tiếng Việt', 282, 'Cuốn sách kể về cuộc hành trình khám phá và học hỏi triết lý phương Đông của các nhà khoa học phương Tây.', 2),
(85, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537291/book_images/awak9y9bxkzuhmq8fap8.jpg', '1984', 'George Orwell', 43, '1949-06-08', 31, 'Tiếng Anh, Tiếng Việt', 328, 'Một tiểu thuyết kinh điển phản ánh xã hội toàn trị, nơi tự do cá nhân bị kiểm soát chặt chẽ bởi chính quyền độc tài.', 5),
(86, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537387/book_images/mplixvhxwpkwpfq0njck.jpg', 'Bí Mật Của May Mắn', 'Alex Rovira, Fernando Trías de Bes', 44, '2004-12-09', 9, 'Tiếng Anh, Tiếng Việt', 120, 'Câu chuyện ngụ ngôn ý nghĩa về việc tạo ra cơ hội và may mắn trong cuộc sống.', 7),
(87, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537466/book_images/hkgtuuulgnvpn897ebhy.jpg', 'Hạt Giống Tâm Hồn', 'Nhiều tác giả', 45, '2002-02-19', 32, 'Tiếng Việt', 300, 'Tuyển tập những câu chuyện ý nghĩa và truyền cảm hứng về lòng yêu thương và nghị lực sống.', 4),
(88, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537551/book_images/zhvddjotb0dpbhbpvft2.jpg', 'Giết Con Chim Nhại', 'Harper Lee', 46, '1960-07-11', 33, 'Tiếng Anh, Tiếng Việt', 281, 'Câu chuyện về phân biệt chủng tộc và lòng dũng cảm, kể qua góc nhìn của một cô bé nhỏ tuổi ở miền Nam nước Mỹ.', 7),
(89, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537658/book_images/ehf083s7avwtnfphw8i0.jpg', 'Đường Xưa Mây Trắng', 'Thích Nhất Hạnh', 47, '1991-09-09', 34, 'Tiếng Việt', 304, 'Cuốn sách kể về cuộc đời và giáo pháp của Đức Phật qua lời kể nhẹ nhàng, sâu sắc của Thiền sư Thích Nhất Hạnh.', 3),
(90, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537743/book_images/ntxjmhprxnmxrcuncsby.jpg', 'Sherlock Holmes: Cuộc Phiêu Lưu Cuối Cùng', 'Arthur Conan Doyle', 48, '1893-12-12', 7, 'Tiếng Anh, Tiếng Việt', 189, 'Một trong những tập truyện nổi tiếng về thám tử tài ba Sherlock Holmes, với các vụ án đầy kịch tính và bất ngờ.', 5),
(91, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537861/book_images/t2yuillsecwp5brfnuxd.jpg', 'Kẻ Trộm Sách (The Book Thief)', 'Markus Zusak', 49, '2006-03-13', 35, 'Tiếng Việt', 584, 'Câu chuyện về một cô bé yêu sách trong Thế chiến II, được kể qua góc nhìn của Thần Chết, nhấn mạnh về sức mạnh của ngôn từ và tình yêu thương.', 8),
(92, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736537961/book_images/fpqczhxec8hk41kyha1h.jpg', 'Đi Tìm Lẽ Sống (Man\'s Search for Meaning)', 'Viktor E. Frankl', 50, '1946-01-09', 36, 'Tiếng Anh, Tiếng Việt', 200, 'Cuốn sách kinh điển về ý nghĩa cuộc sống, được viết từ trải nghiệm thực tế của tác giả trong trại tập trung Đức Quốc xã.', 4),
(93, 'https://res.cloudinary.com/duk8odqun/image/upload/v1736538056/book_images/ou5amv1ws5fggeqqfxhq.jpg', '7 Thói Quen Của Người Thành Đạt (The 7 Habits of Highly Effective People)', 'Stephen R. Covey', 51, '1989-08-15', 9, 'Tiếng Anh, Tiếng Việt', 381, 'Cuốn sách hướng dẫn cách xây dựng các thói quen tích cực, giúp cải thiện bản thân và phát triển kỹ năng sống hiệu quả.', 5);

--
-- Triggers `books`
--
DELIMITER $$
CREATE TRIGGER `validate_publication_date` BEFORE INSERT ON `books` FOR EACH ROW BEGIN
    IF (NEW.publication_date NOT REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid date format for publication_date. Expected format: YYYY-MM-DD';
    END IF;
END
$$
DELIMITER ;

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
  `status_user` enum('Chờ nhận sách','Đang mượn sách','Đã trả sách','Quá hạn trả sách') COLLATE utf8mb4_unicode_ci DEFAULT 'Chờ nhận sách',
  `book_condition_id` int(11) DEFAULT NULL,
  `fine_fee_id` int(11) DEFAULT NULL,
  `return_day` date DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `borrow_list`
--

INSERT INTO `borrow_list` (`id`, `borrow_request_id`, `status_user`, `book_condition_id`, `fine_fee_id`, `return_day`, `created_at`) VALUES
(32, 28, 'Đã trả sách', 4, 3, '2024-12-31', '2025-01-03 17:13:06'),
(33, 29, 'Đã trả sách', 3, 3, '2025-01-07', '2025-01-03 17:13:06'),
(36, 30, 'Đã trả sách', 1, 1, '2025-01-16', '2025-01-03 17:27:02'),
(37, 31, 'Chờ nhận sách', 3, 2, '2025-01-04', '2025-01-03 17:52:37'),
(42, 32, 'Chờ nhận sách', NULL, NULL, '2025-01-18', '2025-01-10 23:00:28');

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
(30, 42, 3, 5, '2025-01-16', 'Duyệt', '2025-01-03 17:01:38'),
(31, 45, 3, 5, '2025-01-04', 'Duyệt', '2025-01-03 17:52:18'),
(32, 45, 1, 5, '2025-01-18', 'Duyệt', '2025-01-10 16:00:54'),
(33, 42, 1, 13, '2025-01-11', 'Chờ xử lý', '2025-01-11 03:37:52');

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
(17, 'Thơ ca, Văn học cổ điển'),
(18, 'Giáo Dục'),
(19, 'Tiểu thuyết, Văn học phiêu lưu'),
(20, 'Tiểu thuyết, Tội phạm'),
(21, 'Tiểu thuyết ngắn, Văn học cổ điển'),
(22, 'Truyện ngắn, Văn học thiếu nhi'),
(23, 'Tiểu thuyết lịch sử, Lãng mạn'),
(24, 'Tiểu thuyết giả tưởng, Phiêu lưu'),
(25, 'Tiểu thuyết lịch sử, xã hội'),
(26, 'Tiểu thuyết lịch sử'),
(27, 'Tiểu thuyết hiện thực huyền ảo'),
(28, 'Tiểu thuyết Gothic'),
(29, 'Tiểu thuyết'),
(30, 'Triết học'),
(31, 'Khoa học viễn tưởng, Chính trị'),
(32, 'Kỹ năng sống, Tâm lý học'),
(33, 'Văn học hiện đại'),
(34, 'Triết học, Tâm linh'),
(35, 'Tiểu thuyết, Lịch sử'),
(36, 'Tâm lý học, Triết học');

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
(20, 'NXB Houghton Mifflin'),
(21, 'NXB Tổng Hợp TP.HCM'),
(22, 'NXB Văn Hóa Thông Tin'),
(23, 'NXB Thanh Niên'),
(24, 'NXB HarperTorch'),
(25, 'NXB G.P. Putnam\'s Sons'),
(26, 'NXB Charles Scribner\'s Sons'),
(27, 'NXB Reynal & Hitchcock'),
(28, 'NXB Macmillan Publishers'),
(29, 'NXB George Allen & Unwin'),
(30, 'NXB Hồng Đức'),
(31, 'NXB Tao Đàn'),
(32, 'NXB A. Lacroix, Verboeckhoven & Cie'),
(33, 'NXB The Russian Messenger'),
(34, 'NXB Editorial Sudamericana'),
(35, 'NXB Thomas Cautley Newby'),
(36, 'NXB Viking Penguin'),
(37, 'NXB Nhân Văn'),
(38, 'NXB Doubleday'),
(39, 'NXB Artisan'),
(40, 'NXB Phaidon Press'),
(41, 'NXB The Ralston Society'),
(42, 'NXB Harper & Brothers'),
(43, 'NXB Secker & Warburg'),
(44, 'NXB Random House'),
(45, 'NXB First News'),
(46, 'NXB J.B. Lippincott & Co.'),
(47, 'NXB Parallax Press'),
(48, 'NXB George Newnes'),
(49, 'NXB Picador'),
(50, 'NXB Beacon Press'),
(51, 'NXB Free Press');

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
(5, 'Nguyen Anh Tuan', '$2y$10$XGV9yyFHvIoaVk4UCQdObuqBSGjQvGRF9ApOyam3Egy4mUcYQneNi', '2003-12-10', 'DA21TTA', 'Công nghệ thông tin', 'Kỹ thuật & Công nghệ', 'Đại học Trà Vinh', '0869094929', 'nguyenanhtuan.profile@gmail.com', 'Đầu Bờ, Hòa Thuận, Châu Thành, Trà Vinh', 707053, '2025-01-11 00:54:18'),
(12, 'Kim Thi Que Tran', '$2y$10$m6kvSyetzvtryuY9gxPHQ.eTFTNNod/Lxq.IsB.0TDD7pDTUcmdD6', '2003-11-26', 'DA21MNB', 'Giáo dục mầm non', 'Sư phạm', 'Đại học Trà Vinh', '0385236993', 'tranque913@gmail.com', 'Trà Cú', NULL, NULL),
(13, 'Phùng Quốc Hưng', '$2y$10$AA7H6wJi7rCDfmZq5Byqh.TacuQv7UppyUNhqdbz2EIUPbe.bMd7y', '2002-07-07', 'DA21TDTTA', 'Thể Dục Thể Thao', 'Sư phạm', 'Đại học Trà Vinh', '0876873625', 'phungquochung@gmail.com', 'Cà Mau', NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `book_condition_on_return`
--
ALTER TABLE `book_condition_on_return`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `borrow_list`
--
ALTER TABLE `borrow_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `fine_fee`
--
ALTER TABLE `fine_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
