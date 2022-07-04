-- Department
INSERT INTO departments (id, name)
VALUES (1, "Executive Officer"),
       (2, "Finance"),
       (3, "Operational"),
       (4, "Technology"),
       (5, "Marketing");

-- Role 
INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO",2000000 ),
       (2, "CFO", 1000000),
       (2, "Business Analyst", 80000),
       (3, "COO", 1000000),
       (3, "Project Manager", 200000),
       (4, "CTO", 1000000),
       (4, "Software engineer", 250000),
       (5, "Marketing manager", 180000),
       (5, "Marketing specialist", 70000);

-- Employee
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tianchou", "Gong", 1, null),
       ("Tjoe", "Gong", 2, 1),
       ("Ivy", "Kong", 3, 3),
       ("Kathy", "Kong", 8, 1),
       ("Amy", "Kong", 5, 4), 
       ("Olivia", "Smith", 7, 5),
       ("Noah", "Rodriguez", 6, 1),
       ("Charlotte", "Garcia", 9, 6),
       ("Elijah", "Miller", 4, 1);