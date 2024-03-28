-- Insert users
INSERT INTO Users (username, email, passwordHash, role) VALUES
('admin', 'admin@example.com', '$2a$08$w7e2EGB4GvNNW0nA4trS1e0dn7NeCacGAgu1y2dFVEEou9sW5SkzC', 'admin'),
('testuser', 'user@example.com', '$2a$08$X8pvrFWa9ytAQRcsR/h7dO9BbhsJZtKFFHl12RSvGcc2wioLir2Ry', 'user'),
('anotheruser', 'user2@example.com', '$2a$08$X8pvrFWa9ytAQRcsR/h7dO9BbhsJZtKFFHl12RSvGcc2wioLir2Ry', 'user');

-- Insert streams
INSERT INTO Streams (userId, title, description, url, photo, isActive) VALUES
(1, 'Server Host Stream', 'This is the server host stream. It has the streamout.m3u8 url, so the server host can stream their zany antics to the masses.', 'https://localhost:8000/stream/streamout.m3u8', 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', FALSE);

-- Insert messages
INSERT INTO Messages (userId, streamId, body) VALUES
(2, 1, 'Hello, world!'),
(2, 1, 'This is a test message.');

-- Sample federation member
--INSERT INTO Federation (fedPublicId, apiUrl, apiPort) VALUES
--(2, '10.0.0.198', 8000, 2);
