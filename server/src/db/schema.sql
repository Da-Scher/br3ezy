-- Clean database
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS streams;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS viewerSessions;
DROP TABLE IF EXISTS concurrentViewers;
DROP TABLE IF EXISTS streamMetrics;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create streams table
CREATE TABLE streams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(1024) NOT NULL,
    photo VARCHAR(255),
    startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create messages table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    streamId INT NOT NULL,
    body TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (streamId) REFERENCES streams(id)
);

-- Create viewerSessions table
CREATE TABLE viewerSessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    streamId INT NOT NULL,
    userId INT NOT NULL,
    startTime DATETIME(3) NOT NULL,
    endTime DATETIME(3),
    FOREIGN KEY (streamId) REFERENCES streams(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create concurrentViewers table
CREATE TABLE concurrentViewers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    streamId INT NOT NULL,
    viewers INT NOT NULL,
    timestamp DATETIME(3) NOT NULL,
    FOREIGN KEY (streamId) REFERENCES streams(id)
);

-- Create streamMetrics table
CREATE TABLE streamMetrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sessionId INT NOT NULL,
    averageSpeed DECIMAL(10,2) NOT NULL,
    errors INT,
    FOREIGN KEY (sessionId) REFERENCES viewerSessions(id)
);
