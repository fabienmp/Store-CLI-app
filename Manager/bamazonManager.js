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
        message: 'Which item would you like to add to inventory?',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false && value != '') {
                return true;
            }
            return false;
        }
    },
    {
        name: 'item_id',
        message: 'Which quantity?',
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
    con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price' FROM PRODUCTS", function (err, result, fields) {
        if (err) throw err;
        var dataTable = table_formatter.getTable(result);
        totalProducts = result.length;
        console.log('\n--- Available Products (' + totalProducts + ') ---\n')
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
            totalProducts = result.length;
            console.log('\n--- Products with Low Inventory (' + totalProducts + ') ---\n')
            console.log(dataTable);
            ShowMenuOptions();
        });
}

function AddToInventory() {

}

function AddNewProduct() {

}

con.connect(function (err) {
    if (err) throw err;
    ShowMenuOptions();
});