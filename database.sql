DROP TABLE IF EXISTS users;


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    number_phone VARCHAR(10),
    telephone VARCHAR(10),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    userRole VARCHAR(25) DEFAULT 'Employee',
    gender CHAR
);

CREATE TABLE address(
    address_id SERIAL PRIMARY KEY,
    user_id integer  REFERENCES users(user_id),
    street_no integer,
    street_name VARCHAR(50),
    feature VARCHAR(50),
    suburb VARCHAR(50),
    city VARCHAR(50),
    province VARCHAR(50)
    zip_code VARCHAR(4)
);

CREATE TABLE qualifications(
    qualification_id SERIAL PRIMARY KEY,
    user_id integer  REFERENCES users(user_id),
    qualification_type VARCHAR(50),
    qualification_status VARCHAR(50),
    institution_name VARCHAR(100),
    study_field VARCHAR(100),
    study_type VARCHAR(100),
    starting_date DATE,
    ending_date DATE
);