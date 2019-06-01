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
    choices: ['View Product Sales by Department', 'Create New Department']
}];

var newDepartmentInputs = [{
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
        name: 'over_head_costs',
        message: 'Input Overhead Cost:',
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
            case "View Product Sales by Department":
                ViewProductSalesDepartment();
                break;

            case "Create New Department":
                CreateNewDepartment();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
}

function ViewProductSalesDepartment() {
    con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price', stock_quantity as 'Inventory Left' FROM PRODUCTS", function (err, result, fields) {
        if (err) throw err;
        var dataTable = table_formatter.getTable(result);
        console.log('\n--- Product Sales by Department ---\n')
        console.log(dataTable);
        ShowMenuOptions();
    });
}

function CreateNewDepartment() {
    inquirer.prompt(newDepartmentInputs).then(function (answers) {
        var query = 'INSERT INTO DEPARTMENT (department_name, over_head_costs)' +
            'VALUES (?, ?);';

        con.query(query, [answers.name, answers.over_head_costs],
            function (err, result, fields) {
                if (err) throw err;

                con.query("SELECT LAST_INSERT_ID() AS ID", function (err, result, fields) {
                    if (err) throw err;
                    var lastInsertId = result[0].ID;
                    console.log(lastInsertId);

                    con.query("SELECT department_id as 'ID', department_name as 'Dept. Name', over_head_costs as 'Over Head Costs' FROM DEPARTMENT WHERE department_id = ?", [lastInsertId], function (err, result, fields) {
                        if (err) throw err;
                        var dataTable = table_formatter.getTable(result);
                        console.log('\n--- Added New Department ---\n')
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