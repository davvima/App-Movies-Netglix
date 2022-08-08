CREATE DATABASE database_netglix;

USE database_netglix;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(16) NOT NULL DEFAULT 'user',  
    
    PRIMARY KEY(id)
);

CREATE TABLE content
(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(125) NOT NULL,
    type VARCHAR(20) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE category(
    id INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(125) NOT NULL,
    PRIMARY KEY(id)

);

CREATE TABLE content_category
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    content_id INT NOT NULL REFERENCES content(id),
    category_id INT NOT NULL REFERENCES category(id)
);

ALTER TABLE content_category ADD FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE;
ALTER TABLE content_category ADD FOREIGN KEY (content_id) REFERENCES content(id) ON UPDATE CASCADE;


INSERT INTO users (name,email,password,role) VALUES ('admin','admin@gmail.com','$2a$10$dqA5b/74exev9icipb7BwuKtHDLYCX4zvb8f7IihI/DK8PZny5DYS','admin');
INSERT INTO users (name,email,password,role) VALUES ('user','user@gmail.com','$10$94qIMivabClzxQs4EGDBduB2fOOicxyd9Tf9kJTpodW/Mx/wTOKmG','user');