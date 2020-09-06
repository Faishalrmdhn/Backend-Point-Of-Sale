<h1 align="center">ExpressJS - #Elcapp PointofSale RESTfull API</h1>

ElCapp-Point of Sale.
ExpressJS[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>
6. <a href="https://www.npmjs.com/package/jsonwebtoken">JSON Web Token</a>
7. <a href="https://www.npmjs.com/package/multer">multer</a>
8. MySQL
9. <a href="https://www.npmjs.com/package/redis">Redis</a>

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
```

## End Point

**1. GET**

- `/product`(Get all product include sorting, pagination & limit)
- `/product/:id`(Get all product by id)
- `/product/search/name`(Get all product by name)
- `/category`(Get all category)
- `/category/:id`(Get all category by id)
- `/history`(Get all history)
- `/category/:id`(Get all history by id)
- `/orders`(Get all orders)
- `/orders/:id`(Get all orders by id)
- `/users/login`(Get all registered acount)

**2. POST**

- `/product` (Post product)

  - `{ "product_name": "Wiener Schnitzel", "category_id": 1 | 2, "product_price": 69000 , "product_status" : 1 | 0,"product_image : item9.png"}`

- `/category` (Post category)
- `/history` (Post history)
- `/CheckOut` (Post checkout data orders)
- `/orders` (Post orders)
- `/users/register` (Post data registered account)

  **3. PATCH**

- `/product/:id` (Update product by id)
  - `{"product_name" : "Mouse", "category_id" : 1, "product_harga" : 100000, "product_status" : 1 | 0}`
- `/category/:id` (Update category by id)
- `/history/:id` (Update history by id)
- `/users/admin` (Admin can update & controlling cashier status to active/inactive)

**4. DELETE**

- `/product/:id` (Delete product by id)
- `/category/:id` (Delete category by id)

---unfinished ReadMe---
