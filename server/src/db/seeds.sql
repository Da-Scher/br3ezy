-- Insert users
INSERT INTO users (username, email, passwordHash) VALUES
('admin', 'admin@example.com', '$2a$08$w7e2EGB4GvNNW0nA4trS1e0dn7NeCacGAgu1y2dFVEEou9sW5SkzC'),
('testuser', 'user@example.com', '$2a$08$X8pvrFWa9ytAQRcsR/h7dO9BbhsJZtKFFHl12RSvGcc2wioLir2Ry'),
('anotheruser', 'user2@example.com', '$2a$08$X8pvrFWa9ytAQRcsR/h7dO9BbhsJZtKFFHl12RSvGcc2wioLir2Ry');

-- Insert streams
INSERT INTO streams (userId, title, description, url, photo, isActive) VALUES
(1, 'Server Host Stream', 'This is the server host stream. It has the streamout.m3u8 url, so the server host can stream their zany antics to the masses.', 'https://localhost:8000/stream/streamout.m3u8', 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE),
(2, 'Love Nature', 'Get closer to nature with documentaries and series that celebrate the complexity of life on earth. Connecting with nature is more important than ever.', 'https://lnc-love-nature.tubi.video/playlist.m3u8', 'https://jbarteluce.net/files/channels4_profile.jpg', TRUE),
(3, 'Naruto', 'Guided by the spirit demon within him, orphaned Naruto learns to harness his powers as a ninja in this anime adventure series.', 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5da0c85bd2c9c10009370984/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&studio_id=viacom&tags=ROKU_CONTENT_TAGS', 'https://jbarteluce.net/files/wp9562833.jpg.webp', TRUE),
(1, 'SpongeBob Schwammkopf', 'A square yellow sponge named SpongeBob SquarePants lives in a pineapple with his pet snail, Gary, in the city of Bikini Bottom on the floor of the Pacific Ocean. He works as a fry cook at the Krusty Krab. During his time off, SpongeBob has a knack for attracting trouble with his starfish best friend, Patrick. Arrogant octopus Squidward Tentacles, SpongeBobs neighbor, dislikes SpongeBob because of his childlike behavior.', 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d00e8adaab96b5635b2a005/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&studio_id=viacom&tags=ROKU_CONTENT_TAGS', 'https://jbarteluce.net/files/SpongeBob_Schwammkopf.webp', TRUE),
(2, 'KGW8', 'Local News and Information for Portland, Oregon and surrounding areas.', 'https://lnc-kgw.tubi.video/live.m3u8', 'https://jbarteluce.net/files/kgw8.png', TRUE),
(3, 'Classic Movies', 'Turner Classic Movies is the source for all things classic films, including clips from yesterday''s Hollywood stars and everyone''s favorite "old movies" whether they''re in black and white or color!', 'https://turnerlive.warnermediacdn.com/hls/live/2023187/tcmwest/noslate/VIDEO_1_5128000.m3u8', 'https://jbarteluce.net/files/TCM_2021.svg.png', TRUE);

-- Insert messages
INSERT INTO messages (userId, streamId, body) VALUES
(2, 1, 'Hello, world!'),
(2, 1, 'This is a test message.');
