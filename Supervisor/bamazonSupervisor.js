const mysql = require('mysql');
const table_formatter = require('console.table');
const inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "Jujijan1987@",
    database: "bamazon"
});

var menuOptions = [{
    name: 'action',
    message: 'Select an option:',
    type: 'list',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
}];

var addToInventoryInputs = [{
        name: 'item_id',
        message: 'Input an item id:',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false && value != '') {
                return true;
            }
            return false;
        }
    },
    {
        name: 'quantity',
        message: 'Input a quantity:',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false && value != '') {
                return true;
            }
            return false;
        }
    }
];

var newProductInputs = [{
        name: 'name',
        message: 'Input Product Name:',
        type: 'input',
        validate: function (value) {
            if (value != '') {
                return true;
            }
            return false;
        }
    },
    {
        name: 'department',
        message: 'Input Department Name:',
        type: 'input',
        validate: function (value) {
            if (value != '') {
                return true;
            }
            return false;
        }
    },
    {
        name: 'price',
        message: 'Product Price:',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false && value != '') {
                return true;
            }
            return false;
        }
    },
    {
        name: 'initial_quantity',
        message: 'Initial Quantity:',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false && value != '') {
                return true;
            }
            return false;
        }
    }
];

function ShowMenuOptions() {
    inquirer.prompt(menuOptions).then(function (answers) {

        switch (answers.action) {
            case "View Products for Sale":
                ViewProductsForSale();
                break;

            case "Add New Product":
                AddNewProduct();
                break;

            case "View Low Inventory":
                ViewLowInventory();
                break;

            case "Add to Inventory":
                AddToInventory();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
}

function ViewProductsForSale() {
    con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price', stock_quantity as 'Inventory Left' FROM PRODUCTS", function (err, result, fields) {
        if (err) throw err;
        var dataTable = table_formatter.getTable(result);
        console.log('\n--- Available Products (' + result.length + ') ---\n')
        console.log(dataTable);
        ShowMenuOptions();
    });
}

function ViewLowInventory() {
    con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price'," +
        "stock_quantity as 'Quantity Left' FROM PRODUCTS WHERE stock_quantity < 50",
        function (err, result, fields) {
            if (err) throw err;
            var dataTable = table_formatter.getTable(result);
            console.log('\n--- Products with Low Inventory (' + result.length + ') - Threshold: < 50 ---\n')
            console.log(dataTable);
            ShowMenuOptions();
        });
}

function AddToInventory() {
    inquirer.prompt(addToInventoryInputs).then(function (answers) {
        var query = 'UPDATE PRODUCTS SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?';
        console.log(answers);
        con.query(query, [answers.quantity, answers.item_id],
            function (err, result, fields) {
                if (err) throw err;

                con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price', stock_quantity as 'Inventory Left' FROM PRODUCTS WHERE item_id = ?", [answers.item_id], function (err, result, fields) {
                    if (err) throw err;
                    var dataTable = table_formatter.getTable(result);
                    console.log('\n--- Updated Inventory for Product ---\n')
                    console.log(dataTable);
                    ShowMenuOptions();
                });

            });
    });
}

function AddNewProduct() {
    inquirer.prompt(newProductInputs).then(function (answers) {
        var query = 'INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)' +
            'VALUES (?, ?, ?, ?);';

        con.query(query, [answers.name, answers.department, answers.price, answers.initial_quantity],
            function (err, result, fields) {
                if (err) throw err;

                con.query("SELECT LAST_INSERT_ID() AS ID", function (err, result, fields) {
                    if (err) throw err;
                    var lastInsertId = result[0].ID;
                    console.log(lastInsertId);

                    con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price', stock_quantity as 'Inventory Left' FROM PRODUCTS WHERE item_id = ?", [lastInsertId], function (err, result, fields) {
                        if (err) throw err;
                        var dataTable = table_formatter.getTable(result);
                        console.log('\n--- Added New Product ---\n')
                        console.log(dataTable);
                        ShowMenuOptions();
                    });

                });
            });
    });
}

con.connect(function (err) {
    if (err) throw err;
    ShowMenuOptions();
});