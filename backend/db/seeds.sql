-- Insert users
INSERT INTO Users (username, email, password_hash) VALUES
('admin', 'admin@example.com', 'hashed_password_here'),
('testuser', 'user@example.com', 'hashed_password_here');

-- Insert streams
INSERT INTO Streams (user_id, title, description, is_active) VALUES
(1, 'First Test Stream', 'This is a test stream.', TRUE),
(1, 'Second Test Stream', 'Another test stream for demonstration.', TRUE);

-- Insert messages
INSERT INTO Messages (user_id, stream_id, body) VALUES
(2, 1, 'Hello, world!'),
(2, 1, 'This is a test message.');
