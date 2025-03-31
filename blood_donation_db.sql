-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: blood_donation_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin123','2025-03-11 21:54:36'),(2,'admin2','admin456','2025-03-14 14:36:32');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_stock`
--

DROP TABLE IF EXISTS `blood_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_stock` (
  `blood_bank_id` int NOT NULL,
  `blood_group` varchar(3) NOT NULL,
  `units_available` int NOT NULL,
  PRIMARY KEY (`blood_bank_id`,`blood_group`),
  CONSTRAINT `blood_stock_chk_1` CHECK ((`units_available` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_stock`
--

LOCK TABLES `blood_stock` WRITE;
/*!40000 ALTER TABLE `blood_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donors`
--

DROP TABLE IF EXISTS `donors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `age` int NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','O+','O-','AB+','AB-') NOT NULL,
  `address` text NOT NULL,
  `ailments` text NOT NULL,
  `medications` text NOT NULL,
  `diseases` text NOT NULL,
  `last_donation` date DEFAULT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `donors_chk_1` CHECK (regexp_like(`phone`,_utf8mb4'[0-9]{10}$')),
  CONSTRAINT `donors_chk_2` CHECK ((`age` between 18 and 65)),
  CONSTRAINT `donors_chk_3` CHECK ((`weight` >= 50))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donors`
--

LOCK TABLES `donors` WRITE;
/*!40000 ALTER TABLE `donors` DISABLE KEYS */;
INSERT INTO `donors` VALUES (1,'Test User','test@example.com','1234567890',30,70.00,'Male','A+','123 Street','None','None','None','2023-01-01','2025-03-16 16:14:15'),(4,'Divya Unni','divya@example.com','2503256845',19,56.00,'Female','B+','bhk12','none','none','none','2024-10-17','2025-03-16 16:29:52'),(5,'Swaroop OK','swaroopisok@gmail.com','7412852368',20,58.00,'Male','B+','trust','none','none','none','2024-07-11','2025-03-16 16:37:27'),(6,'Dunkan','dunkan@example.com','7412589632',20,54.00,'Male','A+','annex','none','none','none','2023-12-06','2025-03-17 11:24:31'),(7,'Praseetha M','praseetha@example.com','7894568526',32,63.00,'Female','A-','Kollam','Diabetes\n','Insulin','None','2025-03-05','2025-03-17 11:56:27'),(8,'Sankaran Unni','sankaran@example.com','4569871235',54,82.00,'Male','B-','Thiruvali, Manjeri, Malappuram','None\n','Paracetamol','Flu','2024-01-09','2025-03-17 12:00:38'),(9,'Kevin Liyam','kevin@example.com','7946138524',22,59.00,'Other','AB-','kochi','Liver Cerosis','Under therapy','none','2024-08-21','2025-03-17 12:03:04'),(10,'Sajith K P','sajith@example.com','7539621485',23,57.00,'Male','AB+','Malappuram\n\n\n','none\n','general medicine for Hepatitis and Jaundice','Hepatitis A','2025-01-22','2025-03-17 12:05:25'),(11,'Sharun V','sharun@example.com','4569871237',24,66.00,'Male','O+','Kannur\n','None','Dolo65','Flu','2024-11-05','2025-03-17 12:09:23'),(12,'Abhirami Mohan S','abhirami@example.com','7455896328',25,52.00,'Female','O-','Thiruvananthapuram','Hypertension','for BP','none','2024-11-21','2025-03-17 12:11:34'),(13,'Swathi Krishnan M','swathi@example.com','4569871234',26,50.00,'Other','AB+','Nilambur','Cholestrol','medication for cholestrol','none','2024-12-01','2025-03-17 12:14:28'),(14,'Shivani J Panicker','shivani@example.com','4758963219',29,59.00,'Female','A-','Pathanamthitta','Thyroid ','medication for thyroid, flu ','flu','2025-03-08','2025-03-17 12:16:23'),(15,'Leonardo Da Vinci','leo@example.com','7412589631',61,68.00,'Other','O-','Idukki\n','none','medication for pneumonia','pneumonia','2024-09-04','2025-03-17 12:20:04'),(16,'Indulekha','indhu@example.com','4578963216',62,57.00,'Female','AB-','Alappuzha','none','jaundice for medication','jaundice','2024-10-31','2025-03-17 12:22:07'),(17,'Kareena Kapoor','kareena@example.com','7418529638',25,55.00,'Female','O+','Kozhikode','arthiritis','bp medication','none','2024-10-14','2025-03-17 12:24:29'),(18,'Santhosh Varki','santhosh@example.com','4679138526',49,64.00,'Male','B-','Wayanad','Hallucination','anti-depressants\n','common cold','2024-10-20','2025-03-17 12:27:05');
/*!40000 ALTER TABLE `donors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipient` (
  `recipient_id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `blood_group_needed` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `blood_units_required` int NOT NULL,
  `hospital_name` varchar(150) NOT NULL,
  `hospital_address` text NOT NULL,
  `reason_for_blood` text NOT NULL,
  `urgency` enum('Low','Medium','High','Critical') NOT NULL,
  PRIMARY KEY (`recipient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipient`
--

LOCK TABLES `recipient` WRITE;
/*!40000 ALTER TABLE `recipient` DISABLE KEYS */;
INSERT INTO `recipient` VALUES (1,'Ameen Krishnan',56,'Male','B+',2,'NSS','Ayathil','accident','High'),(2,'Hari Krishnan',21,'Male','O-',3,'Amrutha Hospital','Ernakulam','Accident','Critical'),(3,'Julia Mathew',14,'Female','AB+',1,'Medicity','Kollam','hyper anemia','Low'),(4,'Reetha kumari',87,'Female','B+',3,'Medicity','Kozhikode','Dialysis','Low');
/*!40000 ALTER TABLE `recipient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','O+','O-','AB+','AB-') NOT NULL,
  `contact` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `username` varchar(100) GENERATED ALWAYS AS (`email`) STORED,
  `password` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `users_chk_1` CHECK (regexp_like(`contact`,_utf8mb4'^[0-9]{10}$'))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `dob`, `blood_group`, `contact`, `email`, `address`, `password`, `created_at`) VALUES (1,'Divya Unni','2006-06-15','B+','8956237456','divya@example.com','mk78','2006-06-15','2025-03-15 15:40:01'),(2,'Ameen Krishnan','1995-07-30','O-','8523697456','ameen@kee.com','weehaa','1995-07-30','2025-03-15 15:48:28'),(3,'Swaroop OK','2005-02-25','B+','1236547895','swaroopisok@gmail.com','trust','2005-02-25','2025-03-15 15:57:19'),(4,'Hari','2004-10-19','AB+','7845123698','hari@example.com','annex','2004-10-19','2025-03-17 11:20:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-31 20:02:30
