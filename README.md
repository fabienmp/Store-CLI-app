# UC Berkeley Extension : Homework #10
## Store CLI App

This project simulates a Amazon-like storefront. It is composed of three distinct node apps, 
each representing a different point of view in the store. 
The three roles represented are Customermer, Manager and Supervisor.

## Customer Point of View

In this app, we simulate the purchase of a product by a customer. 

* The app first prompts prompts the customer for the ID of the product they would like to buy.

* After that, the app requires the customer to input the total number of units for the the product they would like to buy.

![Product Selection](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/customer_app_order_validated.PNG?raw=true)

* Once the order request is placed, the application checks whether the store has enough inventory and process the order if possible.
	
![Order Rejected](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/customer_app_order_rejected.PNG?raw=true)

* If the inventory is too low, an error message is displayed. If the order is validated, the price of the product multiplied by the quantity purchased is added to the product_sales column in the Product table.

![Order Placed](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/customer_app_order_placed.PNG?raw=true)

## Manager Point of View

This application simulate the manager point of view in the store. It allows four different actions:

	* View Products for Sale: A list of every available item.

    ![Products for Sale](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/view_products.PNG?raw=true)

    * View Low Inventory: A list all items with an inventory count lower than fifty.
    
    ![View Low Inventory](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/low_inventory.PNG?raw=true)

    * Add to Inventory: This options let the manager "add more" of any item currently in the store.
    
    ![Add To Inventory](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/add_to_inventory.PNG?raw=true)

    * Add New Product: This option allow the manager to add a completely new product to the store.

    ![Add Product](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/add_product.PNG?raw=true)

## Supervisor Point of View

This application simulate the supervisor point of view in the store. It allows two different actions:

    * View Product Sales by Department: This creates a summary by department displaying the profits and overhead costs. The profit is calulated by substracting from the overhead cost, the sum of all the orders made by custumers for a given department.
   
    ![View Product Sales](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/view_products.PNG?raw=true)

    * Create New Department: This allows the supervisor to create a new store department.

    ![Create New Department](https://github.com/fabienmp/Store-CLI-app/blob/master/Images/add_department.PNG?raw=true)

## Author

Fabien Mansoubi - https://github.com/fabienmp


