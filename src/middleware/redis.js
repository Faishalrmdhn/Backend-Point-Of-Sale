const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data history ada di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data history tidak ada di dalam redis");
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data category ada di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data category tidak ada di dalam redis");
        next();
      }
    });
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result);

        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Successfull Get Data",
            newResult.result,
            newResult.page
          );
        } else {
          next();
        }
      }
    );
  },
  getHistoryRedis: (request, response, next) => {
    client.get(
      `gethistory:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result);

        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Successfull Get Data",
            newResult.result,
            newResult.page
          );
        } else {
          next();
        }
      }
    );
  },
  getCategoryRedis: (request, response, next) => {
    client.get(
      `getcategory:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result);

        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Successfull Get Data",
            newResult.result,
            newResult.page
          );
        } else {
          next();
        }
      }
    );
  },
  getOrdersRedis: (request, response, next) => {
    client.get(
      `getorders:${JSON.stringify(request.query)}`,
      (error, result) => {
        const newResult = JSON.parse(result);

        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Successfull Get Data",
            newResult.result,
            newResult.page
          );
        } else {
          next();
        }
      }
    );
  },
  clearhistoryRedisById: (request, response, next) => {
    const { id } = request.params;
    client.del(`gethistorybyid:${id}`, (error, result) => {
      console.log(result);
      next();
    });
  },
  clearCategoryRedisById: (request, response, next) => {
    const { id } = request.params;
    client.del(`getcategorybyid:${id}`, (error, result) => {
      console.log(result);
      next();
    });
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys("getproduct*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearDataCategoryRedis: (request, response, next) => {
    client.keys("getcategory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearDataHistoryRedis: (request, response, next) => {
    client.keys("getHistory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
};
