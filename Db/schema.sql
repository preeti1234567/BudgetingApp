CREATE DATABASE budget_db;
USE budget_db;

/*Basic information for user registration*/

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
	password varchar(250) NOT NULL,
    email varchar(250) NOT NULL,
    active bit DEFAULT true,
	PRIMARY KEY (id)
);

/*
We can store more information in this table 
about user like his name, address, gender etc.
*/
CREATE TABLE userprofile
(
	id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
	last_name varchar(250) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES user(id),
	PRIMARY KEY (id)
);

CREATE TABLE category
(
	id int NOT NULL AUTO_INCREMENT,
	category_type tinyint NOT NULL,
	name varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE transactions
(
	id int NOT NULL AUTO_INCREMENT,
	transaction_type bit NOT NULL,
	category_id int NOT NULL,
    amount int NOT NULL,
    date AS DATETIME,
    user_profile_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_profile_id)
        REFERENCES userprofile(id),
    FOREIGN KEY (category_id)
        REFERENCES category(id),    
);

