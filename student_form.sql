/*
 Navicat Premium Data Transfer

 Source Server         : database
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : db_ppdb

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 20/01/2025 13:41:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for student_form
-- ----------------------------
DROP TABLE IF EXISTS `student_form`;
CREATE TABLE `student_form`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `student_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `student_phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `place_of_birth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date_of_birth` date NULL DEFAULT NULL,
  `gender` enum('Male','Female','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `religion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nationality` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `skill_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `reason_choosing_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `knowledge_about_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `has_competence_work` tinyint(1) NULL DEFAULT NULL,
  `motivation_for_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `expectations_for_competence` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `reason_choosing_school` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `active_in_extracurricular` tinyint(1) NULL DEFAULT NULL,
  `achievements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `agree_to_rules` tinyint(1) NULL DEFAULT NULL,
  `ever_broken_rules` tinyint(1) NULL DEFAULT NULL,
  `interviewer_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `interviewer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `interview_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
