use employee_db;

INSERT INTO department
    (name)
VALUES
    ('Classroom'),
    ('Support Staff'),
    ('Corporate');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Student', 0, 1),
    ('Professor', 150000, 1),
    ('Teacher Aid', 50000, 1),
    ('Tutor', 75000, 2),
    ('Student Manager', 150000, 2),
    ('Family', 10, 2),
    ('HW Grader', 25000, 3),
    ('Dean', 250000, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Chuck', 'Norris', 8, NULL),
    ('Mike', 'Young', 5, 1),
    ('Ryan', 'Kelly', 2, 2),
    ('Rebecca', 'Ho', 3, 3),
    ('Ned', 'Flanders', 4, 1),
    ('Dane', 'Shrewsbury', 4, 1),
    ('Spongebob', 'Squarepants', 7, 1),
    ('Patrick', 'Star', 7, 1),
    ('Garth', 'Hammonds', 1, 3),
    ('Jessilin', 'Lugo', 1, 3),
    ('Megan', 'Bryan', 1, 3),
    ('Avelica', 'Rubio', 1, 3),
    ('Curtis', 'Hatter', 1, 3),
    ('Elissa', 'Hammonds', 6, NULL);
