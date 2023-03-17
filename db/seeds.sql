INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 90000.00, 1),
       ("Software Engineer", 200000.00, 2),
       ("Account Manager", 75000.00, 3),
       ("Legal Team Lead", 80000.00, 4);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("test1first","test1last", NULL, NULL),
       ("test2first","test2last", NULL, NULL ),
       ("test3first","test3last", NULL, NULL ),
       ("test4first","test4last", NULL, NULL ),
       ("test5first","test5last", NULL, NULL),
       ("test6first","test6last", NULL, NULL);
