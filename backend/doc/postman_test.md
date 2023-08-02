# Postman test log

| Feature  | Route | HTTP Method | Outcome | Comments |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Sign in  | /  | POST  | Passed  | Return with a token  |
| Create User | /users  | POST  | Passed  | No issue  |
| View all users  | /users | GET  | Passed  | No issue |
| View user by ID  | /users/:userid  | GET  | Passed  | No issue  |
| Edit User  | /carts/:cartid/:name  | POST  | Failed  | cartid in the url can not match the existing cart id in the database, even though they return the same content. |
| Update the quantity of a product in the existing cart  | /carts/:cartid/:name  | POST  | Passed  | No issue, added toString() method to the cartid and now they can correctly matched. |
| Add a new product to an existing cart  | /carts/:cartid/:name  | POST  | Passed  | No issue |
| Create new cart  | /carts/null/:name  | POST  | Passed  | No issue |
| View all order  | /orders  | GET  | Passed  | No issue |
| View a single order  | /orders/:orderid  | GET  | Passed  | No issue |
| Add new address  | /orders/address  | POST  | Passed  | No issue  |
| Create new order  | /orders  | POST  | Passed  | No issue |
| Delete a product from an existing cart  | /carts/:cartid/:name  | DELETE  | Failed  | The response should includes the remaining products in the cart, but no content displayed. The current status code is 204 |
| Delete a product from an existing cart  | /carts/:cartid/:name  | DELETE  | Passed  | No issue, code 204 is for no cotent. Changes to the code 200 and solved the problem. |
| Delete the cart  | /carts/:cartid  | DELETE  | Passed | No issue  |

## Screenshots of postman

* Summary of routes
  
  ![Summary of routes](postman-testing-screenshot/Summary%20of%20routes.png)

* Sign in
  
  ![Get all products](postman-testing-screenshot/Get%20all%20products.png)