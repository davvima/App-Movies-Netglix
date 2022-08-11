CREATE DATABASE database_netglix;

USE database_netglix;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('user','premiumUser','admin') NOT NULL DEFAULT 'user',  
    
    PRIMARY KEY(id)
);

CREATE TABLE content
(
    id VARCHAR(32) NOT NULL  DEFAULT (TO_BASE64(RANDOM_BYTES(16))),
    title VARCHAR(125) NOT NULL,
    overview TEXT NOT NULL,
    category VARCHAR(10) NOT NULL,
    poster_path VARCHAR(500) NOT NULL,
    type ENUM('regular','premium') NOT NULL DEFAULT 'premium',
    created BOOLEAN DEFAULT true,

    PRIMARY KEY(id)
);

CREATE TABLE category(
    id INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(125) NOT NULL,
    PRIMARY KEY(id)

);

CREATE TABLE content_category
(
    id INT AUTO_INCREMENT NOT NULL,
    content_id VARCHAR(32) NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY(content_id) REFERENCES content(id),
    FOREIGN KEY(category_id) REFERENCES category(id)
);


INSERT INTO users (name,email,password,role) VALUES ('admin','admin@gmail.com','$2a$10$dqA5b/74exev9icipb7BwuKtHDLYCX4zvb8f7IihI/DK8PZny5DYS','admin');
INSERT INTO users (name,email,password,role) VALUES ('user','user@gmail.com','$10$94qIMivabClzxQs4EGDBduB2fOOicxyd9Tf9kJTpodW/Mx/wTOKmG','user');

INSERT INTO content (title,overview,category,type,poster_path) VALUES (
    'Contenido Ejemplo',
    'Contenido creado por defecto, solo un usuario con rol de administrados puede crear contenido',
    'movie',
    'regular',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wfDeKN5U6lxky1OaJ0FntEajpQ4s-Eo2EQ&usqp=CAU'
);

INSERT INTO content (title,overview,category,type,poster_path) VALUES (
    'BeMaster el Documental',
    'Una muestra de como la tecnología impacta en la vida de las personas',
    'tv',
    'premium',
    'https://www.maxterpc.com/wp-content/uploads/2021/01/Yonnathan-Vinasco.jpg'
);