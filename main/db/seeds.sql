use workplace_db;

INSERT INTO department (name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 100000, 1),
        ("Engineer", 95000, 2),
        ("Analyst", 80000, 3);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chrtian", "Nirschl", 2, 1),
        ("Tom", "Brady", 1, 2),
        ("McCorkle", "Jones", 3, NULL);

SELECT * FROM employee;