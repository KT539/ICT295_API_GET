DROP DATABASE if EXISTS app_activities;
CREATE DATABASE app_activities;
USE app_activities;

DROP TABLE if EXISTS activities;
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    starting_date DATE NOT NULL,
    duration INT NOT NULL
);