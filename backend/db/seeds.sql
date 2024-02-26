-- Insert users
INSERT INTO Users (username, email, password_hash) VALUES
('admin', 'admin@example.com', '$2a$08$w7e2EGB4GvNNW0nA4trS1e0dn7NeCacGAgu1y2dFVEEou9sW5SkzC'),
('testuser', 'user@example.com', '$2a$08$X8pvrFWa9ytAQRcsR/h7dO9BbhsJZtKFFHl12RSvGcc2wioLir2Ry'),
('anotheruser', 'user2@example.com', '$2a$08$X8pvrFWa9ytAQRcsR/h7dO9BbhsJZtKFFHl12RSvGcc2wioLir2Ry');

-- Insert streams
INSERT INTO Streams (user_id, title, description, url, photo, is_active) VALUES
(1, 'First Test Stream', 'This is a test stream.', 'https://localhost:8000/stream/streamout.m3u8', 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE),
(2, 'Second Test Stream', 'Another test stream for demonstration.', 'https://localhost:8000/stream/streamout.m3u8', 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE),
(3, 'Third Test Stream', 'Final test stream for demonstration.', 'https://localhost:8000/stream/streamout.m3u8', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', TRUE);

-- Insert messages
INSERT INTO Messages (user_id, stream_id, body) VALUES
(2, 1, 'Hello, world!'),
(2, 1, 'This is a test message.');
