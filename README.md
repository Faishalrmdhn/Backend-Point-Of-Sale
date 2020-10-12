<h1 align="center">ExpressJS - Elcapp PointofSale RESTfull API</h1>

## Project_Background

In a store, the cashier is a measure of business development at the store. The cashier is the gate for revenue entry in a store.

Often the use of offline cashiers is faced with bookkeeping with so much data, not to mention if you want to analyze the development of the business, of course to determine how much daily, monthly and yearly income will be very troublesome.

So i built the ElCapp. Elcapp is a cashier application and mostly known as Point Of Sale Application. This App is provide your need to level up your business. With this App, you can monitor sales transactions that occur, without having to be behind a cash register or store location that you have. What's more, besides functioning as monitoring, the cashier application can also allow you to get real-time sales data analysis.

Some of the advantages of this application are :

1. Time Efficiency
2. Real time business analysis
3. Control your cashflow
4. Cheap Maintenance fee
5. Build more trust to your customer
6. Help increase the profit
7. Minimalize error in your report data
8. Can access in anywhere you want
9. Can use in any device

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
5. Create a database with the name `onlineshop`, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
#KEYDATABASE
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_DATABASE = onlineshop

IP=127.0.0.1
PORT=3001
```

## End Point

**See Documentation API [Here](https://www.getpostman.com/collections/5f61e1a3f6ac14d3892e)**

### License

© [M Faishal Ramadhan](https://github.com/Faishalrmdhn)