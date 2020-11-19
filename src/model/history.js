const connection = require("../config/mysql");

module.exports = {
  getHistory: (sort, limit, offset, ascdsc) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history ORDER BY ${sort} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getWithOutSort: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM history",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE history_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO history SET ?`,
        setData,
        (error, result) => {

          if (!error) {
            const newResult = {
              history_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE history SET ? Where history_id = ?",
        [setData, id],
        (error, result) => {
          console.log(error)
          console.log(result)
          if (!error) {
            const newResult = {
              history_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getMonthHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DATE(history_created_at) as date, sum(history_subtotal) as subtotal FROM history WHERE MONTH(history_created_at) = MONTH(NOW()) AND YEAR(history_created_at) = YEAR(NOW()) GROUP BY DATE(history_created_at)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getYearHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT MONTH(history_created_at) as month, sum(history_subtotal) as subtotal FROM history WHERE YEAR(history_created_at) = YEAR(NOW()) GROUP BY MONTH(history_created_at)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getYearIncomeHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT YEAR(history_created_at) as year, sum(history_subtotal) as subtotal FROM history WHERE YEAR(history_created_at) = YEAR(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTodayHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DATE(history_created_at) as Date, sum(history_subtotal) as subtotal FROM history WHERE DATE(history_created_at) = DATE(NOW()) GROUP BY DATE(history_created_at)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(history_id) AS totalOrders FROM history",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  recentOrderHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getDataOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders JOIN product ON orders.product_id = product.product_id WHERE history_id = ?`,
        id,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  // getHistoryOrdersById: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT * FROM orders WHERE history_id = ?`,
  //       id,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error));
  //       }
  //     );
  //   });
  // },
};
