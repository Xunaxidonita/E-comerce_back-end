-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
USE ecommerce_db;


DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS product_tag;

CREATE TABLE categories (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL
);

CREATE TABLE tags (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(30) NOT NULL
);

CREATE TABLE products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL,
    stock INTEGER,
    category_id INTEGER,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE product_tag (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_id INTEGER,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    tag_id INTEGER,
    CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE SET NULL
);


