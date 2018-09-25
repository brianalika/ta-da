USE l75jwxdw89v7d4lm;
CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ASC),
    UNIQUE INDEX username_UNIQUE (username ASC)
);