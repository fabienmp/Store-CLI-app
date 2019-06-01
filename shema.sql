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