USE ${MYSQL_DATABASE};

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS posts (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    title VARCHAR(255),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);