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

var totalProducts = 0;

var questions = [{
    name: "product_id",
    type: "input",
    message: "Please input the Id of the product you'd like to purchase: ",
    validate: function (value) {
      if (isNaN(value) === false && value != '' && value < totalProducts) {
        return true;
      }
      return false;
    }
  },
  {
    name: "total_units",
    type: "input",
    message: "How many units would you like to buy?",
    validate: function (value) {
      if (isNaN(value) === false && value != '') {
        return true;
      }
      return false;
    }
  }
];

con.connect(function (err) {
  if (err) throw err;
  listProducts();
});

function listProducts() {

  con.query("SELECT item_id as 'ID', PRODUCT_NAME as 'Product Name', price as 'Price' FROM PRODUCTS", function (err, result, fields) {
    if (err) throw err;
    var dataTable = table_formatter.getTable(result);
    totalProducts = result.length;
    console.log('\n--- Available Products (' + totalProducts + ') ---\n')
    console.log(dataTable);
    askCustomer();
  });

}

function askCustomer() {
  inquirer.prompt(questions).then(function (answers) {

    var query = "SELECT * FROM PRODUCTS WHERE item_id = ?";
    con.query(query, [answers.product_id], function (err, res) {
      if (err) throw err;
      var total_units_left = res[0].stock_quantity;
      var product_price = res[0].price;
      var total_cost = product_price * answers.total_units;

      if (answers.total_units > total_units_left) {
        console.log('Insufficient quantity! -- Current quantity left: ' + res[0].stock_quantity);
      } else {
        var query = "UPDATE PRODUCTS SET stock_quantity = ? WHERE item_id = ?";
        con.query(query, [total_units_left - answers.total_units, answers.product_id], function (err, res) {
          if (err) throw err;
          console.log('\nOrder Processed! -- Total Cost: $' + total_cost.toFixed(2) + ' -- Unit(s) left: ' + (total_units_left - answers.total_units) + '\n');
        });
      }

      listProducts();

    });
  });
}
