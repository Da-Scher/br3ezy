-- Clean database
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Streams;
DROP TABLE IF EXISTS Users;

-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);

-- Create Streams table
CREATE TABLE Streams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(1024),
    photo VARCHAR(255),
    startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Create Messages table
CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    streamId INT,
    body TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (streamId) REFERENCES Streams(id)
);
