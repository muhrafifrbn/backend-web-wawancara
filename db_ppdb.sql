/*
 Navicat Premium Data Transfer

 Source Server         : database
 Source Server Type    : MySQL
 Source Server Version : 8.0.30
 Source Host           : localhost:3306
 Source Schema         : db_ppdb

 Target Server Type    : MySQL
 Target Server Version : 8.0.30
 File Encoding         : 65001

 Date: 31/01/2025 23:02:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ======================================================
-- Table structure for `competences`
-- ======================================================
DROP TABLE IF EXISTS `competences`;
CREATE TABLE `competences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `competence_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=Dynamic;

-- Records for `competences`
INSERT INTO `competences` VALUES 
  (1, 'PPLG / RPL', 'Pengembangan perangkat lunak dan aplikasi.', '2025-01-22 09:07:54'),
  (2, 'DKV / MM', 'Desain komunikasi visual dan multimedia.', '2025-01-22 09:07:54'),
  (3, 'DKV / MM BILINGUAL', 'Desain komunikasi visual dalam dua bahasa.', '2025-01-22 09:07:54'),
  (4, 'TKJ / TJKT', 'Teknologi jaringan komputer dan telekomunikasi.', '2025-01-22 09:07:54'),
  (5, 'MPLB', 'Manajemen perkantoran dan layanan bisnis.', '2025-01-22 09:07:54'),
  (6, 'MPLB BILINGUAL', 'Manajemen perkantoran dalam dua bahasa.', '2025-01-22 09:07:54'),
  (7, 'PM', 'Pemasaran dan bisnis retail.', '2025-01-22 09:07:54'),
  (8, 'AK', 'Akuntansi dan keuangan.', '2025-01-22 09:07:54');

-- ======================================================
-- Table structure for `medical_check_form`
-- ======================================================
DROP TABLE IF EXISTS `medical_check_form`;
CREATE TABLE `medical_check_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `participant_card_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `place_of_birth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `medical_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `allergies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `medical_conditions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `height` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `blood_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_knowledge_smoking_history` tinyint(1) DEFAULT NULL,
  `parent_knowledge_tattoo_piercing` tinyint(1) DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `interviewer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `interviewer_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=Dynamic;

-- ======================================================
-- Table structure for `parents_form` (Modified)
-- ======================================================
DROP TABLE IF EXISTS `parents_form`;
CREATE TABLE `parents_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `father_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mother_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `father_job` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mother_job` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `father_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mother_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `child_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `major` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `relationship_to_student` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `additional_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `child_status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `has_serious_illness` tinyint(1) DEFAULT NULL,
  `parent_view_on_child` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `reason_choosing_school` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `parent_view_on_school` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `know_about_school` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `response_to_program` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `willing_to_communicate` tinyint(1) DEFAULT NULL,
  `willing_to_pay` tinyint(1) DEFAULT NULL,
  `accept_consequences` tinyint(1) DEFAULT NULL,
  `interviewer_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `interviewer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=Dynamic;

-- ======================================================
-- Table structure for `student_form` (Modified)
-- ======================================================
DROP TABLE IF EXISTS `student_form`;
CREATE TABLE `student_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `student_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `student_phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `place_of_birth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `religion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nationality` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `previous_school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `student_vision` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `student_mission` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `skill_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `reason_choosing_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `knowledge_about_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `has_competence_work` tinyint(1) DEFAULT NULL,
  `motivation_for_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `expectations_for_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `reason_choosing_school` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `active_in_extracurricular` tinyint(1) DEFAULT NULL,
  `achievements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `agree_to_rules` tinyint(1) DEFAULT NULL,
  `ever_broken_rules` tinyint(1) DEFAULT NULL,
  `interviewer_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `interviewer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=Dynamic;

-- ======================================================
-- Table structure for `student_competences`
-- ======================================================
DROP TABLE IF EXISTS `student_competences`;
CREATE TABLE `student_competences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `competence_id` int NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_id`(`student_id` ASC) USING BTREE,
  INDEX `competence_id`(`competence_id` ASC) USING BTREE,
  CONSTRAINT `student_competences_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_form` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student_competences_ibfk_2` FOREIGN KEY (`competence_id`) REFERENCES `competences` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=Dynamic;

-- ======================================================
-- Table structure for `users`
-- ======================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','panitia', 'registrator') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_login` timestamp DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=Dynamic;

DROP TABLE IF EXISTS `user_logs`;
CREATE TABLE `user_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `student_counts`;
CREATE TABLE `student_counts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `competence_id` INT NOT NULL,
  `competence_name` VARCHAR(255) NOT NULL,
  `max_capacity` INT NOT NULL,
  `current_registered` INT NOT NULL,
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`competence_id`) REFERENCES `competences` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert initial data
INSERT INTO `student_counts` (`competence_id`, `competence_name`, `max_capacity`, `current_registered`) VALUES
(1, 'Rekayasa Perangkat Lunak & Gim', 72, 55),
(2, 'Desain Komunikasi Visual Reguler', 72, 72),
(3, 'Desain Komunikasi Visual Bilingual', 128, 84),
(5, 'Manajemen Perkantoran & Layanan Bisnis Reguler', 72, 47),
(6, 'Manajemen Perkantoran & Layanan Bisnis Bilingual', 32, 25),
(7, 'Pemasaran & Bisnis Online', 36, 19),
(8, 'Akuntansi dan Keuangan Lembaga', 72, 48),
(4, 'Teknik Komputer & Jaringan', 72, 72);


-- Records for `users`
INSERT INTO `users` VALUES 
  (1, 'dicky', '$2a$10$WMbXc8W6I0yEIJP.PXR2YOVY6jO8EtSvNKCLhyttQGR.NiIfkNprq', 'Dicky Fernando Sitepu', 'panitia', '2025-01-20 14:00:40', 1, '2024-10-23 12:15:37');

SET FOREIGN_KEY_CHECKS = 1;
