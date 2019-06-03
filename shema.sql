DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name NVARCHAR(100) NULL,
    department_name NVARCHAR(100) NULL,
    price decimal(5,2) NULL,
    stock_quantity decimal(8,2) NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name NVARCHAR(100) NULL,
	over_head_costs decimal(10,2) NULL,
    PRIMARY KEY (department_id)
);

ALTER TABLE PRODUCTS 
ADD COLUMN `product_sales` DECIMAL(10,2);

UPDATE products SET product_sales = 0 WHERE item_id > 0;