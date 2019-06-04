# UC Berkeley Extension : Homework #10
## Store CLI App

This project simulates a Amazon-like storefront. It is composed of three distinct node apps, 
each representing a different point of view in the store. 
The three roles represented are Customermer, Manager and Supervisor.

## Customer Point of View

In this app, we simulate the purchase of a product by a customer. 
The app first prompts prompts the customer for the ID of the product they would like to buy.
After that, the app requires the customer to input the total number of units for the the product they would like to buy.
Once the customer has placed the order, the application checks wether the store has enough inventory and process the order if possible.
If the inventory is too low, an error message is displayed. If the order is validated, the price of the product multiplied by the quantity purchased 
is added to the product's product_sales column in the Product table.

## Manager Point of View

This application simulate the manager point of view in the store. It allows four different actions:

	* View Products for Sale: A list of every available item.
    
    * View Low Inventory: A list all items with an inventory count lower than fifty.
    
    * Add to Inventory: This options let the manager "add more" of any item currently in the store.
    
    * Add New Product: This option allow the manager to add a completely new product to the store.

## Supervisor Point of View

This application simulate the supervisor point of view in the store. It allows two different actions:

   * View Product Sales by Department: This creates a summary by department displaying the profits and overhead costs. The profit is calulated by substracting from the overhead cost, the sum of all the orders made by custumers for a given department.
   
   * Create New Department: This allows the supervisor to create a new store department.

## Author

Fabien Mansoubi - https://github.com/fabienmp


