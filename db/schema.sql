DROP DATABASE IF EXISTS d3ke0d7ze456c12k;
CREATE DATABASE d3ke0d7ze456c12k;
USE d3ke0d7ze456c12k;

CREATE TABLE burgers (
	id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255),
    devoured BOOLEAN,
    primary key (id)
);