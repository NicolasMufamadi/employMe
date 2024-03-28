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
    gender VARCHAR(25),
    organization VARCHAR(50) DEFAULT 'EmployMe'
);

DROP TABLE IF EXISTS adress;

CREATE TABLE adress(
    address_id SERIAL PRIMARY KEY,
    user_id integer  REFERENCES users(user_id),
    street_no integer,
    street_name VARCHAR(50),
    feature VARCHAR(50),
    suburb VARCHAR(50),
    city VARCHAR(50),
    province VARCHAR(50),
    zip_code VARCHAR(4)
);

DROP TABLE IF EXISTS qualifications; 

CREATE TABLE qualifications(
    qualification_id SERIAL PRIMARY KEY,
    user_id integer  REFERENCES users(user_id),
    qualification_type VARCHAR(50),
    qualification_status VARCHAR(50),
    institution_name VARCHAR(100),
    study_field VARCHAR(100),
    study_type VARCHAR(100),
    starting_date DATE,
    ending_date DATE,
    skills text[]
);

DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs(
    job_id SERIAL PRIMARY KEY,
    job_name VARCHAR(50),
    job_required_skills VARCHAR[],
    job_description VARCHAR,
    job_qualification TEXT,
    Job_location    TEXT,
    job_company_name VARCHAR(100),
    job_avg_salary  TEXT
);

DROP TABLE IF EXISTS applications;

CREATE TABLE applications(
   application_id SERIAL PRIMARY KEY,
   user_id integer REFERENCES users(user_id),
   job_id integer REFERENCES jobs(job_id),
   job_name VARCHAR(50),
   user_names VARCHAR(50),
   user_email VARCHAR(50),
   user_gender VARCHAR(10),
   job_match DECIMAL,
   application_status VARCHAR DEFAULT 'Pending'
);

CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    company_manager_id  integer REFERENCES users(user_id),
    company_registration_no VARCHAR(25),
    company_address VARCHAR(100),
    company_logo BYTEA 
)