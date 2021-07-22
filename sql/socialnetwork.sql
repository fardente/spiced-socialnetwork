DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS passreset;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    passwordhash VARCHAR NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friends(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users (id) NOT NULL,
    receiver_id INT REFERENCES users (id) NOT NULL,
    accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users (id) NOT NULL,
    message VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE passreset(
    email VARCHAR NOT NULL REFERENCES users (email),
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ('Homer', 'Simpson', 'homer@s.com', '$2a$10$vPIxWGr70UNqekKXnLOnwewIb0euur0w2k2MS/LHBbGwlxecSo3lm');
INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ('Marge', 'Simpson', 'marge@s.com', '$2a$10$vPIxWGr70UNqekKXnLOnwewIb0euur0w2k2MS/LHBbGwlxecSo3lm');
INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ('Bart', 'Simpson', 'bart@s.com', '$2a$10$vPIxWGr70UNqekKXnLOnwewIb0euur0w2k2MS/LHBbGwlxecSo3lm');
INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ('Lisa', 'Simpson', 'lisa@s.com', '$2a$10$vPIxWGr70UNqekKXnLOnwewIb0euur0w2k2MS/LHBbGwlxecSo3lm');

INSERT INTO friends (sender_id, receiver_id, accepted) VALUES (1, 2, true);
INSERT INTO friends (sender_id, receiver_id, accepted) VALUES (1, 3, false);
INSERT INTO friends (sender_id, receiver_id, accepted) VALUES (1, 4, true);
INSERT INTO friends (sender_id, receiver_id, accepted) VALUES (2, 3, true);
INSERT INTO friends (sender_id, receiver_id, accepted) VALUES (2, 4, true);
INSERT INTO friends (sender_id, receiver_id, accepted) VALUES (4, 3, false);

INSERT INTO chat (sender_id, message) VALUES (1, 'mmhhmm Donuts...');