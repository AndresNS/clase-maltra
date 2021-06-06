•	Todos los departamentos por ciudad y las personas que trabajan en cada uno de ellos

SELECT 
  CONCAT(e.first_name, ' ', e.last_name) AS Empleado, 
  d.department_name AS Departamento, l.city AS Ciudad
FROM 
  hr.departments d JOIN hr.locations l ON d.location_id = l.location_id
  JOIN hr.employees e on e.department_id = d.department_id;

•	Todos los cargos (Jobs) disponibles y las personas que los ejercen

SELECT 
  CONCAT(e.first_name, ' ', e.last_name) AS Empleado, 
  j.job_title AS Cargo
FROM 
  hr.jobs j JOIN hr.employees e on e.job_id = j.job_id;

•	Cantidad de Personas por Departamentos y Cargos
cantidad de personas por cargo
SELECT 
  j.job_title AS Cargo, 
  COUNT(e.employee_id) AS Cantidad_de_Personas
FROM 
  hr.jobs j JOIN hr.employees e on e.job_id = j.job_id
GROUP BY j.job_title;

SELECT 
  d.department_name AS Departamento, 
  COUNT(e.employee_id) AS Cantidad_de_Personas
FROM 
  hr.departments d JOIN hr.employees e on e.department_id = d.department_id
GROUP BY d.department_name;


Todos los clientes que han hecho compras y que productos han comprado
SELECT
  CONCAT(c.customer_fname, ' ', c.customer_lname) AS Cliente,
  o.order_id AS Id_Compra,
  o.order_date AS Fecha_Compra,
  p.product_name AS Producto
FROM 
  customers c JOIN orders o ON c.customer_id = o.order_customer_id
  JOIN orders_items oi ON oi.order_item_order_id = o.order_id
  JOIN products p ON p.product_id = oi.order_item_product_id;


Monto total de ventas por producto
SELECT
  p.product_id AS Id_Producto
  p.product_name AS Producto
  SUM(oi.order_item_subtotal) AS Total_Ventas,
FROM 
  products p JOIN orders_items oi ON p.product_id = oi.order_item_product_id
GROUP BY  p.product_id, p.product_name;

  
Todas las órdenes y los productos asociados a ellas que su estado (order_status) estén ‘CLOSED’ o ‘COMPLETE’
SELECT
  o.order_id AS Id_Compra,
  o.order_status AS Estado,
  p.product_name AS Producto
FROM 
  orders o JOIN orders_items oi ON oi.order_item_order_id = o.order_id
  JOIN products p ON p.product_id = oi.order_item_product_id;
WHERE o.order_status = 'CLOSED' OR 'COMPLETE'

-- 

sqoop import –-table cuentas --connect jdbc:mysql://localhost/retail_db --username root--password cloudera --split-by p.product_Id "SELECT d.department_name, c.category_name, p.product_Id, p.product_name, p.product_description, p.product_price FROM products p JOIN categories c ON p.product_category_id = c.category_id JOIN departments d ON d.department_id = c.department_id WHERE $CONDITIONS"


departments = LOAD '/user/cloudera/prueba1/hr/DEPARTMENTS'  
USING PigStorage(',') 
AS (department_id:int,
    department_name:chararray,
    manager_id:int,
    location_id:int);

locations = LOAD '/user/cloudera/prueba1/hr/LOCATIONS'  
USING PigStorage(',') 
AS (location_id:int,
    street_address:chararray,
    postal_code:chararray,
    city:chararray,
    state_province:chararray,
    country_id:int);

employees = LOAD '/user/cloudera/prueba1/hr/EMPLOYEES'  
USING PigStorage(',') 
AS (employee_id:int,
    first_name:chararray,
    last_name:chararray,
    email:chararray,
    phone_number:chararray,
    hire_date:chararray,
    job_id:int,
    salary:int,
    comission_pct:float,
    manager_id:int,
    department_id:int);

department_location = JOIN departments BY location_id, locations BY location_id;
department_location_employees = JOIN department_location BY department_id, employees BY department_id;

DUMP department_location_employees;



-----
employees = LOAD '/user/cloudera/prueba1/hr/EMPLOYEES'  
USING PigStorage(',') 
AS (employee_id:int,
    first_name:chararray,
    last_name:chararray,
    email:chararray,
    phone_number:chararray,
    hire_date:chararray,
    job_id:int,
    salary:int,
    comission_pct:float,
    manager_id:int,
    department_id:int);

jobs = LOAD '/user/cloudera/prueba1/hr/JOBS'  
USING PigStorage(',') 
AS (job_id:int,
    job_title:chararray,
    min_salary:int,
    max_salary:int);

employees_jobs = JOIN employees BY job_id, jobs BY job_id;

data = FOREACH employees_jobs GENERATE first_name, last_name, job_title;

DUMP data;


''
employees = LOAD '/user/cloudera/prueba1/hr/EMPLOYEES'  
USING PigStorage(',') 
AS (employee_id:int,
    first_name:chararray,
    last_name:chararray,
    email:chararray,
    phone_number:chararray,
    hire_date:chararray,
    job_id:int,
    salary:int,
    comission_pct:float,
    manager_id:int,
    department_id:int);

jobs = LOAD '/user/cloudera/prueba1/hr/JOBS'  
USING PigStorage(',') 
AS (job_id:int,
    job_title:chararray,
    min_salary:int,
    max_salary:int);

employees_jobs = JOIN employees BY job_id, jobs BY job_id;

data = FOREACH employees_jobs GENERATE job_title, COUNT(employee_id);

DUMP data;

---
employees = LOAD '/user/cloudera/prueba1/hr/EMPLOYEES'  
USING PigStorage(',') 
AS (employee_id:int,
    first_name:chararray,
    last_name:chararray,
    email:chararray,
    phone_number:chararray,
    hire_date:chararray,
    job_id:int,
    salary:int,
    comission_pct:float,
    manager_id:int,
    department_id:int);

departments = LOAD '/user/cloudera/prueba1/hr/DEPARTMENTS'  
USING PigStorage(',') 
AS (department_id:int,
    department_name:chararray,
    manager_id:int,
    location_id:int);

departments_employees = JOIN employees BY department_id, departments BY department_id;

data = FOREACH departments_employees GENERATE department_name, COUNT(employee_id);

DUMP data;


--

products = LOAD '/user/cloudera/prueba1/retail/PRODUCTS'
USING PigStorage(',') 
AS (product_id:int,
    product_category_id:int,
    product_name:chararray,
    product_description:chararray,
    product_price:chararray,
    product_image:chararray);

customers = LOAD '/user/cloudera/prueba1/retail/CUSTOMERS'
USING PigStorage(',') 
AS (customer_id:int,
    customer_fname:chararray,
    customer_lname:chararray,
    customer_email:chararray,
    customer_password:chararray,
    customer_street:chararray;
    customer_city:chararray;
    customer_state:chararray;
    customer_zipcode:chararray);

orders = LOAD '/user/cloudera/prueba1/retail/ORDERS'
USING PigStorage(',') 
AS (order_id:int,
    order_date:chararray,
    order_customer_id:int,
    order_status:chararray);

order_items = LOAD '/user/cloudera/prueba1/retail/ORDER_ITEMS'
USING PigStorage(',') 
AS (order_item_id:int,
    order_item_order_id:int,
    order_item_product_id:int,
    order_item_quantity:int,
    order_item_subtotal:float;
    order_item_product_price:float);

customer_orders = JOIN customers BY customer_id, orders BY order_customer_id;
order_items_products = JOIN order_items BY order_item_product_id, products BY product_id;

customer_orders_order_items_products = JOIN customer_orders BY customer_id, order_items_products BY order_customer_id

data = FOREACH customer_orders_order_items_products GENERATE customer_fname, customer_lname, order_id, product_name;

DUMP data;


--

products = LOAD '/user/cloudera/prueba1/retail/PRODUCTS'
USING PigStorage(',') 
AS (product_id:int,
    product_category_id:int,
    product_name:chararray,
    product_description:chararray,
    product_price:chararray,
    product_image:chararray);

order_items = LOAD '/user/cloudera/prueba1/retail/ORDER_ITEMS'
USING PigStorage(',') 
AS (order_item_id:int,
    order_item_order_id:int,
    order_item_product_id:int,
    order_item_quantity:int,
    order_item_subtotal:float;
    order_item_product_price:float);

order_items_products = JOIN order_items BY order_item_product_id, products BY product_id;

data = FOREACH order_items_products GENERATE product_id, product_name, SUM(order_item_subtotal);

DUMP data;


--

products = LOAD '/user/cloudera/prueba1/retail/PRODUCTS'
USING PigStorage(',') 
AS (product_id:int,
    product_category_id:int,
    product_name:chararray,
    product_description:chararray,
    product_price:chararray,
    product_image:chararray);

orders = LOAD '/user/cloudera/prueba1/retail/ORDERS'
USING PigStorage(',') 
AS (order_id:int,
    order_date:chararray,
    order_customer_id:int,
    order_status:chararray);

order_items = LOAD '/user/cloudera/prueba1/retail/ORDER_ITEMS'
USING PigStorage(',') 
AS (order_item_id:int,
    order_item_order_id:int,
    order_item_product_id:int,
    order_item_quantity:int,
    order_item_subtotal:float;
    order_item_product_price:float);

order_items_products = JOIN order_items BY order_item_product_id, products BY product_id;
order_items_products_orders = JOIN orders BY order_id, order_items_products BY order_item_order_id;

data = FOREACH order_items_products_orders GENERATE order_id, order_status, product_name;

filter_data = FILTER data BY (order_status == 'CLOSED') OR (order_status == 'COMPLETE');

DUMP filter_data;