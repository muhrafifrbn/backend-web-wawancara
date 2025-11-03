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

 Date: 20/01/2025 13:46:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for parents_form
-- ----------------------------
DROP TABLE IF EXISTS `parents_form`;
CREATE TABLE `parents_form`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parent_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `child_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_to_student` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `additional_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `child_status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `has_serious_illness` tinyint(1) NULL DEFAULT NULL,
  `parent_view_on_child` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `reason_choosing_school` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `parent_view_on_school` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `know_about_school` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `response_to_program` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `willing_to_communicate` tinyint(1) NULL DEFAULT NULL,
  `accept_consequences` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
