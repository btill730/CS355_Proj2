USE btill_cs355sp20;

DROP TABLE IF EXISTS ConsoleGame;
DROP TABLE IF EXISTS PlayerEmails;
DROP TABLE IF EXISTS PlayerConsole;
DROP TABLE IF EXISTS PlayerGame;
DROP TABLE IF EXISTS PlayerTrophy;
DROP TABLE IF EXISTS Trophy;
SET foreign_key_checks = 0;
DROP TABLES IF EXISTS Console, Player, Game;
SET foreign_key_checks = 1;

CREATE TABLE Player
(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE
);

INSERT INTO 
	Player(username)
VALUES
	('user1'),
	('user2'),
    ('user3'),
	('user4'),
    ('user5');

CREATE TABLE Console
(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

INSERT INTO 
	Console(name)
VALUES
	('user1''s console'),
	('user3''s console'),
    ('user5''s console');

CREATE TABLE Game
(
	title VARCHAR(30) PRIMARY KEY,
    releaseDate DATE,
    genre VARCHAR(30)
);

INSERT INTO 
	Game
VALUES
	('The Last of Us Remastered', '2014-07-29', 'Action-survival'),
    ('Batman: Arkham City', '2011-10-18', 'Action'),
    ('Horizon Zero Dawn', '2017-02-28', 'Action RPG'),
    ('NHL 20', '2019-09-06', 'Sports'),
    ('The Elder Scrolls V: Skyrim', '2011-11-11', 'RPG'),
	('God of War', '2018-04-20', 'Action-adventure');

CREATE TABLE Trophy
(
	game VARCHAR(30),
    name VARCHAR(50),
    value ENUM('bronze', 'silver', 'gold', 'platinum'),
    PRIMARY KEY(game, name),
    FOREIGN KEY fk_trophy_game(game)
	REFERENCES Game(title)
	ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO 
	Trophy
VALUES
	('The Last of Us Remastered', 'Endure and Survive', 'bronze'),
    ('The Last of Us Remastered', 'I got this', 'bronze'),
    ('The Last of Us Remastered', 'Look for the Light', 'silver'),
    ('The Last of Us Remastered', 'It was all just lying there', 'silver'),
    ('The Last of Us Remastered', 'I want to talk about it', 'silver'),
    ('The Last of Us Remastered', 'For emergencies only', 'gold'),
    ('The Last of Us Remastered', 'No Matter What - Survivor', 'gold'),
    ('The Last of Us Remastered', 'It can''t be for nothing', 'platinum'),
    ('Batman: Arkham City', 'I''m Batman', 'bronze'),
    ('Batman: Arkham City', 'Storyteller', 'bronze'),
    ('Batman: Arkham City', 'Catch', 'bronze'),
    ('Batman: Arkham City', 'Perfect Freeflow 2.0', 'bronze'),
    ('Batman: Arkham City', 'Genius', 'silver'),
    ('Batman: Arkham City', 'Twice Nightly', 'silver'),
    ('Batman: Arkham City', 'Perfect Knight - Day 2', 'gold'),
    ('Batman: Arkham City', 'Platinum', 'platinum'),
    ('Horizon Zero Dawn', 'All Acquisition machines killed', 'bronze'),
    ('Horizon Zero Dawn', 'All Recon machines killed', 'bronze'),
    ('Horizon Zero Dawn', 'All Combat machines killed', 'bronze'),
    ('Horizon Zero Dawn', 'All Transport machines killed', 'bronze'),
    ('Horizon Zero Dawn', 'All Skills learned', 'bronze'),
    ('Horizon Zero Dawn', 'All Cores Overridden', 'silver'),
    ('Horizon Zero Dawn', 'All Corrupted Zones cleared', 'silver'),
    ('Horizon Zero Dawn', 'Ended the war machine threat', 'gold'),
    ('Horizon Zero Dawn', 'All trophies obtained', 'platinum'),
    ('NHL 20', 'Practice Makes Perfect', 'bronze'),
    ('NHL 20', 'Cup Champs', 'bronze'),
    ('NHL 20', 'Overtime Heroics', 'bronze'),
    ('NHL 20', 'Manual Sauce', 'bronze'),
    ('NHL 20', 'Iconic', 'silver'),
    ('NHL 20', 'Tee it up', 'silver'),
    ('NHL 20', 'Up, Up, and Away!', 'gold'),
    ('NHL 20', 'Raise Your Banner ''20', 'platinum'),
    ('The Elder Scrolls V: Skyrim', 'Darkness Returns', 'bronze'),
    ('The Elder Scrolls V: Skyrim', 'Bound Until Death', 'bronze'),
    ('The Elder Scrolls V: Skyrim', 'Hero of the People', 'bronze'),
    ('The Elder Scrolls V: Skyrim', 'Blessed', 'bronze'),
    ('The Elder Scrolls V: Skyrim', 'Master Criminal', 'bronze'),
    ('The Elder Scrolls V: Skyrim', 'Golden Touch', 'silver'),
    ('The Elder Scrolls V: Skyrim', 'Explorer', 'silver'),
    ('The Elder Scrolls V: Skyrim', 'Dragonslayer', 'gold'),
    ('The Elder Scrolls V: Skyrim', 'Platinum Trophy', 'platinum'),
	('God of War', 'The Journey Begins', 'bronze'),
    ('God of War', 'Enchanted', 'bronze'),
    ('God of War', 'Worthy', 'bronze'),
    ('God of War', 'Unfinished Business', 'silver'),
    ('God of War', 'Treasure Hunter', 'silver'),
    ('God of War', 'The Truth', 'silver'),
    ('God of War', 'Fire and Brimstone', 'gold'),
    ('God of War', 'Darkness and Fog', 'gold'),
    ('God of War', 'Father and Son', 'platinum');

CREATE TABLE ConsoleGame
(
	console BIGINT AUTO_INCREMENT,
    game VARCHAR(30),
    PRIMARY KEY(console, game),
    FOREIGN KEY fk_consoleGame_console(console)
		REFERENCES Console(id),
    FOREIGN KEY fk_consoleGame_game(game)
		REFERENCES Game(title)
);

INSERT INTO 
	ConsoleGame
VALUES
	(1, 'The Last of Us Remastered'),
    (1, 'Horizon Zero Dawn'),
    (1, 'God of War'),
    (1, 'NHL 20'),
    (1, 'Batman: Arkham City'),
    (1, 'The Elder Scrolls V: Skyrim'),
    (2, 'Horizon Zero Dawn'),
    (2, 'God of War'),
    (2, 'NHL 20'),
    (3, 'The Last of Us Remastered'),
    (3, 'Batman: Arkham City'),
    (3, 'Horizon Zero Dawn'),
    (3, 'God of War');

CREATE TABLE PlayerEmails
(
	player BIGINT,
    email VARCHAR(40),
    PRIMARY KEY(player, email),
    FOREIGN KEY fk_playerEmail_player(player)
		REFERENCES Player(id)
);

INSERT INTO 
	PlayerEmails
VALUES
	(1, 'user1@gmail.com'),
	(1, 'user1@yahoo.com'),
    (2, 'user2@gmail.com'),
    (3, 'user3@gmail.com'),
    (3, 'user3@yahoo.com'),
    (4, 'user4@yahoo.com'),
    (5, 'user5@gmail.com');

CREATE TABLE PlayerConsole
(
	player BIGINT,
    console BIGINT,
    isPrimary BOOL,
    PRIMARY KEY(player, console),
    FOREIGN KEY fk_playerConsole_player(player)
	REFERENCES Player(id)
	ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY fk_playerConsole_console(console)
	REFERENCES Console(id)
	ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO 
	PlayerConsole
VALUES
	(1, 1, TRUE),
	(2, 1, FALSE),
    (3, 2, TRUE),
    (4, 2, FALSE),
    (5, 3, TRUE);

CREATE TABLE PlayerGame
(
	player BIGINT,
    game VARCHAR(30),
    PRIMARY KEY(player, game),
    FOREIGN KEY fk_playerGame_player(player)
		REFERENCES Player(id),
	FOREIGN KEY fk_playerGame_game(game)
		REFERENCES Game(title)
);

INSERT INTO 
	PlayerGame
VALUES
	(1, 'The Last of Us Remastered'),
    (1, 'Horizon Zero Dawn'),
    (1, 'God of War'),
    (1, 'NHL 20'),
    (1, 'Batman: Arkham City'),
    (1, 'The Elder Scrolls V: Skyrim'),
	(2, 'The Last of Us Remastered'),
    (2, 'The Elder Scrolls V: Skyrim'),
    (3, 'Horizon Zero Dawn'),
    (3, 'God of War'),
    (3, 'NHL 20'),
    (4, 'NHL 20'),
    (5, 'The Last of Us Remastered'),
    (5, 'Batman: Arkham City'),
    (5, 'Horizon Zero Dawn'),
    (5, 'God of War');

CREATE TABLE PlayerTrophy
(
	player BIGINT,
    game VARCHAR(30),
    trophy VARCHAR(50),
    dateEarned DATE,
    PRIMARY KEY(player, game, trophy),
    FOREIGN KEY fk_playerTrophy_player(player)
		REFERENCES Player(id),
	FOREIGN KEY fk_playerTrophy_trophy(game, trophy)
		REFERENCES Trophy(game, name)
);

INSERT INTO 
	PlayerTrophy
VALUES
	(1, 'The Last of Us Remastered', 'Endure and Survive', '2020-03-18'),
    (1, 'The Last of Us Remastered', 'I got this', '2020-03-18'),
    (1, 'The Last of Us Remastered', 'Look for the Light', '2020-03-18'),
    (1, 'The Last of Us Remastered', 'It was all just lying there', '2020-03-17'),
    (1, 'The Last of Us Remastered', 'I want to talk about it', '2020-03-18'),
    (1, 'The Last of Us Remastered', 'For emergencies only', '2020-03-17'),
    (1, 'The Last of Us Remastered', 'No Matter What - Survivor', '2020-03-17'),
    (1, 'The Last of Us Remastered', 'It can''t be for nothing', '2020-03-21'),
    (1, 'Batman: Arkham City', 'I''m Batman', '2018-07-07'),
	(1, 'Batman: Arkham City', 'Storyteller', '2020-01-23'),
	(1, 'Batman: Arkham City', 'Catch', '2018-07-12'),
    (1, 'Batman: Arkham City', 'Perfect Freeflow 2.0', '2020-01-19'),
    (1, 'Batman: Arkham City', 'Genius', '2018-07-13'),
    (1, 'Batman: Arkham City', 'Twice Nightly', '2020-01-22'),
    (1, 'Batman: Arkham City', 'Perfect Knight - Day 2', '2020-01-23'),
    (1, 'Batman: Arkham City', 'Platinum', '2020-01-23'),
    (1, 'Horizon Zero Dawn', 'All Acquisition machines killed', '2020-02-07'),
    (1, 'Horizon Zero Dawn', 'All Recon machines killed', '2020-02-04'),
    (1, 'Horizon Zero Dawn', 'All Combat machines killed', '2020-02-07'),
    (1, 'Horizon Zero Dawn', 'All Transport machines killed', '2020-02-08'),
    (1, 'Horizon Zero Dawn', 'All Skills learned', '2020-02-12'),
    (1, 'Horizon Zero Dawn', 'All Cores Overridden', '2020-02-11'),
    (1, 'Horizon Zero Dawn', 'All Corrupted Zones cleared', '2020-02-11'),
    (1, 'Horizon Zero Dawn', 'Ended the war machine threat', '2020-02-12'),
    (1, 'Horizon Zero Dawn', 'All trophies obtained', '2020-02-12'),
    (1, 'NHL 20', 'Practice Makes Perfect', '2019-09-13'),
    (1, 'NHL 20', 'Cup Champs', '2019-10-17'),
    (1, 'NHL 20', 'Overtime Heroics', '2019-09-08'),
    (1, 'NHL 20', 'Manual Sauce', '2019-09-08'),
    (1, 'NHL 20', 'Tee it up', '2019-09-06'),
    (1, 'NHL 20', 'Up, Up, and Away!', '2019-09-13'),
    (1, 'The Elder Scrolls V: Skyrim', 'Darkness Returns', '2019-06-28'),
    (1, 'The Elder Scrolls V: Skyrim', 'Bound Until Death', '2019-07-12'),
    (1, 'The Elder Scrolls V: Skyrim', 'Hero of the People', '2019-06-15'),
    (1, 'The Elder Scrolls V: Skyrim', 'Blessed', '2019-06-11'),
    (1, 'The Elder Scrolls V: Skyrim', 'Master Criminal', '2019-06-29'),
    (1, 'The Elder Scrolls V: Skyrim', 'Golden Touch', '2019-07-13'),
    (1, 'The Elder Scrolls V: Skyrim', 'Explorer', '2019-06-25'),
    (1, 'The Elder Scrolls V: Skyrim', 'Dragonslayer', '2019-07-21'),
    (1, 'The Elder Scrolls V: Skyrim', 'Platinum Trophy', '2019-08-17'),
	(1, 'God of War', 'The Journey Begins', '2019-12-15'),
    (1, 'God of War', 'Enchanted', '2019-12-15'),
    (1, 'God of War', 'Worthy', '2020-01-01'),
    (1, 'God of War', 'Unfinished Business', '2019-12-28'),
    (1, 'God of War', 'Treasure Hunter', '2019-12-28'),
    (1, 'God of War', 'The Truth', '2019-12-28'),
    (1, 'God of War', 'Fire and Brimstone', '2019-12-30'),
    (1, 'God of War', 'Darkness and Fog', '2020-01-01'),
    (1, 'God of War', 'Father and Son', '2020-01-01'),
    (2, 'The Last of Us Remastered', 'Endure and Survive', '2017-06-21'),
    (2, 'The Last of Us Remastered', 'I got this', '2017-06-21'),
    (2, 'The Last of Us Remastered', 'For emergencies only', '2017-06-20'),
    (2, 'The Last of Us Remastered', 'No Matter What - Survivor', '2017-06-23'),
    (2, 'The Elder Scrolls V: Skyrim', 'Darkness Returns', '2013-01-15'),
    (2, 'The Elder Scrolls V: Skyrim', 'Bound Until Death', '2013-01-22'),
    (2, 'The Elder Scrolls V: Skyrim', 'Hero of the People', '2013-01-07'),
    (2, 'The Elder Scrolls V: Skyrim', 'Blessed', '2013-01-02'),
    (2, 'The Elder Scrolls V: Skyrim', 'Master Criminal', '2013-02-14'),
    (2, 'The Elder Scrolls V: Skyrim', 'Golden Touch', '2013-01-3'),
    (2, 'The Elder Scrolls V: Skyrim', 'Explorer', '2013-01-21'),
    (2, 'The Elder Scrolls V: Skyrim', 'Dragonslayer', '2013-01-28'),
    (2, 'The Elder Scrolls V: Skyrim', 'Platinum Trophy', '2013-02-14'),
    (3, 'Horizon Zero Dawn', 'All Acquisition machines killed', '2020-02-07'),
    (3, 'Horizon Zero Dawn', 'All Recon machines killed', '2020-02-04'),
    (3, 'Horizon Zero Dawn', 'All Combat machines killed', '2020-02-07'),
    (3, 'Horizon Zero Dawn', 'All Transport machines killed', '2020-02-08'),
    (3, 'Horizon Zero Dawn', 'Ended the war machine threat', '2020-02-12'),
    (3, 'NHL 20', 'Overtime Heroics', '2019-10-13'),
    (3, 'NHL 20', 'Manual Sauce', '2019-10-15'),
    (3, 'NHL 20', 'Tee it up', '2019-10-16'),
	(3, 'God of War', 'The Journey Begins', '2019-03-20'),
    (3, 'God of War', 'Enchanted', '2019-03-20'),
    (3, 'God of War', 'The Truth', '2019-03-28'),
    (4, 'NHL 20', 'Practice Makes Perfect', '2019-09-10'),
    (4, 'NHL 20', 'Cup Champs', '2019-10-04'),
    (4, 'NHL 20', 'Overtime Heroics', '2019-09-07'),
    (4, 'NHL 20', 'Manual Sauce', '2019-09-06'),
    (4, 'NHL 20', 'Iconic', '2019-10-13'),
    (4, 'NHL 20', 'Tee it up', '2019-09-06'),
    (4, 'NHL 20', 'Up, Up, and Away!', '2019-09-06'),
    (4, 'NHL 20', 'Raise Your Banner ''20', '2019-10-13'),
    (5, 'The Last of Us Remastered', 'Endure and Survive', '2016-03-18'),
    (5, 'The Last of Us Remastered', 'I got this', '2016-03-18'),
    (5, 'The Last of Us Remastered', 'Look for the Light', '2016-03-18'),
    (5, 'The Last of Us Remastered', 'It was all just lying there', '2016-03-17'),
    (5, 'The Last of Us Remastered', 'For emergencies only', '2016-03-17'),
    (5, 'The Last of Us Remastered', 'No Matter What - Survivor', '2016-03-17'),
    (5, 'Batman: Arkham City', 'I''m Batman', '2017-07-07'),
	(5, 'Batman: Arkham City', 'Storyteller', '2018-12-25'),
	(5, 'Batman: Arkham City', 'Catch', '2017-07-09'),
    (5, 'Batman: Arkham City', 'Perfect Freeflow 2.0', '2017-07-19'),
    (5, 'Batman: Arkham City', 'Genius', '2017-07-16'),
    (5, 'Batman: Arkham City', 'Twice Nightly', '2017-07-23'),
    (5, 'Batman: Arkham City', 'Perfect Knight - Day 2', '2017-07-30'),
    (5, 'Batman: Arkham City', 'Platinum', '2018-12-25'),
    (5, 'Horizon Zero Dawn', 'All Acquisition machines killed', '2018-02-07'),
    (5, 'Horizon Zero Dawn', 'All Recon machines killed', '2018-02-04'),
    (5, 'Horizon Zero Dawn', 'All Combat machines killed', '2018-02-07'),
    (5, 'Horizon Zero Dawn', 'All Transport machines killed', '2018-02-08'),
    (5, 'Horizon Zero Dawn', 'All Skills learned', '2018-02-12'),
    (5, 'Horizon Zero Dawn', 'All Cores Overridden', '2018-02-11'),
    (5, 'Horizon Zero Dawn', 'All Corrupted Zones cleared', '2018-02-11'),
    (5, 'Horizon Zero Dawn', 'Ended the war machine threat', '2018-02-12'),
    (5, 'Horizon Zero Dawn', 'All trophies obtained', '2018-02-12'),
    (5, 'God of War', 'The Journey Begins', '2019-05-15'),
    (5, 'God of War', 'Enchanted', '2019-05-15'),
    (5, 'God of War', 'Worthy', '2019-06-01'),
    (5, 'God of War', 'Unfinished Business', '2019-05-28'),
    (5, 'God of War', 'Treasure Hunter', '2019-05-28'),
    (5, 'God of War', 'The Truth', '2019-05-28'),
    (5, 'God of War', 'Darkness and Fog', '2019-06-01');

DROP VIEW IF EXISTS PlayerTrophyValue;

CREATE OR REPLACE VIEW PlayerTrophyValue AS
SELECT
	p.username AS 'Player',
    pt.trophy AS 'Trophy',
    pt.dateEarned AS 'Date Earned',
    t.value AS 'Value'
FROM Player p
JOIN PlayerTrophy pt
	ON p.id = pt.player
JOIN Trophy t
	ON pt.trophy = t.name
ORDER BY p.username;

DROP FUNCTION IF EXISTS GetTrophyScore;
DELIMITER $$
CREATE FUNCTION GetTrophyScore (player VARCHAR(30))
RETURNS BIGINT
BEGIN
	DECLARE trophyScore BIGINT DEFAULT 0;
    DECLARE numBronze BIGINT DEFAULT 0;
    DECLARE numSilver BIGINT DEFAULT 0;
    DECLARE numGold BIGINT DEFAULT 0;
    DECLARE numPlat BIGINT DEFAULT 0;
    
    SELECT COUNT(p.value)
    INTO numBronze
	FROM PlayerTrophyValue p
    WHERE p.Player = player
		AND p.value = 'bronze';
	
    SELECT COUNT(p.value)
    INTO numSilver
	FROM PlayerTrophyValue p
    WHERE p.Player = player
		AND p.value = 'silver';
	
    SELECT COUNT(p.value)
    INTO numGold
	FROM PlayerTrophyValue p
    WHERE p.Player = player
		AND p.value = 'gold';
    
    SELECT COUNT(p.value)
    INTO numPlat
	FROM PlayerTrophyValue p
    WHERE p.Player = player
		AND p.value = 'platinum';
    
    SET trophyScore = numBronze*15 + numSilver*30 + numGold*90 + numPlat*180;
    RETURN trophyScore;
END$$
DELIMITER ;
