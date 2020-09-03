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
  //   getproduct, tambahin method baru yg ada pagination-> import ke controller-> import di routes
  clearAllDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log(result);
    });
    next();
  },
  clearRedisById: (request, response, next) => {
    const { id } = request.params;
    client.del(`getproductbyid:${id}`, (error, result) => {
      console.log(result);
      next();
    });
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
};
