insert into department (name)
values 
("IT"),("Management"),("Sales");

insert into role (title,salary,department_id) 
values 
("Manager","70000","2"),
("Consultant jr","30000","1"),
("Consultant senior","50000","1"),
("Sales rep","50000","3"),
("General Manager","100000","3");

insert into employee (first_name,last_name,role_id,manager_id)
values
("Marcela","Dupeyron","1","1"),
("Pedro","Reyes","3","1"),
("Alison","Gonzales","3","2"),
("Alan","Rios","5","4");



