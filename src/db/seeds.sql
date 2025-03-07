INSERT INTO departments (dept_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, departments_id)
VALUES ('Salesperson', 100000, 1),
       ('Sales Manager', 150000, 1),
       ('Engineer', 120000, 2),
       ('Lawyer', 120000, 3),
       ('Accountant', 85000, 4),
       ('Account Manager', 150000, 4);

INSERT INTO employes (first_name, last_name, roles_id, manager_id)
VALUES ('John', 'Doe', 1, 1),
       ('Jane', 'Doe', 2, 2),
       ('Alice', 'won', 3, 3),
       ('Bob', 'sun', 4, 4),
       ('Charlie', 'ming', 5, 5),
       ('David', 'swider', 1, 6),
       ('Eve', 'adams', 2, 7),
       ('Frank', 'dog', 3, 8),
       ('Grace', 'hope', 4, 9);

       
