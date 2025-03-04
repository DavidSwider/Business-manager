DROP DATABASE IF EXISTS employes_db;
CREATE DATABASE employes_db;


\c employes_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INT REFERENCES departments(id)
);

CREATE TABLE employes (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT REFERENCES roles(id),
  manager_id INT REFERENCES employes(id)
);