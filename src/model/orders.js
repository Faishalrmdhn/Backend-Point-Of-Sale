const connection = require("../config/mysql");

module.exports = {
  getAllOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM orders`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  getOrdersById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE order_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error)); //order_id dari postman
        }
      );
    });
  },
  postOrders: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO orders SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            orders_id: result.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
