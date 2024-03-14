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
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Create federation table
CREATE TABLE Federation (
    apiUrl VARCHAR(1024) PRIMARY KEY -- apiUrl is different from Streams(url).
);

-- Roles
CREATE TABLE Roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128)
);

-- Roles is like a constant value, this should never be changed or be changable.
INSERT INTO Roles (id, name) VALUES
  (1, 'Viewer'),
  (2, 'Moderator'),
  (3, 'Streamer');


-- User Roles
CREATE TABLE User_Roles (
  user_id INT,
  role_id INT,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (role_id) REFERENCES Roles(id)
);

