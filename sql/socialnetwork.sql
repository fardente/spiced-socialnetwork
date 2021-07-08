DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    passwordhash VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ('Homer', 'Simpson', 'homer@s.com', '$2a$10$vPIxWGr70UNqekKXnLOnwewIb0euur0w2k2MS/LHBbGwlxecSo3lm');
