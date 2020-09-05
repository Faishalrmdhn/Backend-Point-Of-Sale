const { getAllOrders, getOrdersById, postOrders } = require("../model/orders");
const helper = require("../helper/index");
const qs = require("querystring");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getAllOrders: async (request, response) => {
    try {
      const result = await getAllOrders();
      client.set(
        `getorders:${JSON.stringify(request.query)}`,
        JSON.stringify(result)
      );
      return helper.response(response, 200, "Success Get Order", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request!", error);
    }
  },
  getOrdersById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getOrdersById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Order By ID",
          result
        );
      } else {
        return helper.response(response, 404, `Order by ID : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postOrders: async (request, response) => {
    try {
      const test = request.body.orders;
      const testArr = test.map(async (value) => {
        const setData = {
          product_id: value.product_id,
          order_qty: value.order_qty,
          order_price: value.order_price,
          order_created_at: new Date(),
        };
        const result = await postOrders(setData);
        return helper.response(response, 201, "Orders Created", result);
      });
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
