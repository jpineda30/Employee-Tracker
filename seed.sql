drop database if EXISTS employee_trackerDB;

create database employee_trackerDB;

use employee_trackerDB;


CREATE TABLE department(
  
 id INT PRIMARY KEY,
 name VARCHAR(30)
  
);

CREATE TABLE role(
  
 id INT PRIMARY KEY,
 name VARCHAR(30),
 title VARCHAR(30),
 salary DECIMAL,
 department_id int

  
);

CREATE TABLE employee(
  
 id INT PRIMARY KEY,
 name VARCHAR(30),
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id int,
 manager_id int
 

  
);