
select * from department;
select * from role;
select * from employee;

select * from employee where role_id = 1;

update employee set role_id = 1 where id = 2;

delete from employee where id = 6;
delete from department where id = 5;

select * from employee where manager_id = 1;

-- get budget

SELECT *
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id;

SELECT *
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id
group by name;

SELECT *,
   SUM(salary) AS budget
FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id
group by name;