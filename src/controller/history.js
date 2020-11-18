const {
  getHistory,
  getHistoryCount,
  getHistoryById,
  postHistory,
  patchHistory,
  getWithOutSort,
  getMonthHistory,
  getYearHistory,
  getTodayHistory,
  getOrders,
  recentOrderHistory,
  getYearIncomeHistory,
  getDataOrder,
  getHistoryOrdersById,
} = require("../model/history");
const { postOrders, getOrdersById } = require("../model/orders");
const { getProductById } = require("../model/product");
const helper = require("../helper/index");
const qs = require("querystring");
const redis = require("redis");
const client = redis.createClient();

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};
const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getAllHistory: async (request, response) => {
    let { sort, limit, page, ascdsc } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getHistoryCount();
    let getMonth = await getMonthHistory();
    let getYear = await getYearHistory();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/history?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/history?${nextLink}`,
      getMonth,
      getYear,
    };
    try {
      if (typeof request.query.sort === "undefined") {
        const withOutSort = await getWithOutSort(limit, offset);
        const newData = { withOutSort, pageInfo };
        client.set(
          `gethistorywithoutsort:${JSON.stringify(request.query)}`,
          JSON.stringify(newData)
        );
        return helper.response(
          response,
          200,
          "Success Get History",
          withOutSort,
          pageInfo
        );
      } else {
        const result = await getHistory(sort, limit, offset, ascdsc);
        for (let i = 0; i < result.length; i++) {
          result[i].items = await getOrdersById(result[i].history_id);
        }
        const newData1 = { result, pageInfo };
        client.set(
          `gethistory:${JSON.stringify(request.query)}`,
          JSON.stringify(newData1)
        );
        return helper.response(
          response,
          200,
          `Success Get History with sort by ${sort}`,
          result,
          pageInfo
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request!", error);
    }
  },

  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getHistoryById(id);

      if (result.length > 0) {
        client.setex(`gethistorybyid:${id}`, 10000, JSON.stringify(result));
        return helper.response(
          response,
          200,
          `Success Get History By ID : ${id} `,
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `History by ID : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request!", error);
    }
  },
  postHistory: async (request, response) => {
    let history_subtotal = 0;
    let invoice = Math.floor(Math.random() * 1000000);
    try {

      const setData = {
        invoice,
        history_subtotal,
        history_created_at: new Date(),
      };
      
      const result = await postHistory(setData);

      return helper.response(response, 201, "History Created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  CheckOut: async (request, response) => {
    try {
      let history_subtotal = 0;
      let invoice = Math.floor(Math.random() * 1000000);

      const setData = {
        invoice,
        history_subtotal,
        history_created_at: new Date(),
      };
      console.log(setData)
      const result = await postHistory(setData);
      let idHistory = result.history_id;
      let totalPrice = 0;
      let totalResult = {
        history_id: idHistory,
        invoice,
        orders: request.body.history,
        subtotal: null,
        history_created_at: result.history_created_at,
      };
      console.log(request.body.history)
      request.body.history.map(async (value, index) => {

        const products = await getProductById(value.product_id);

        const productName = JSON.stringify(products[0].product_name);
        const productPrice = JSON.stringify(products[0].product_price);

        // console.log(value.product_name);
        const setData = {
          history_id: idHistory,
          product_id: value.product_id,
          product_name: productName,
          order_qty: value.order_qty,
          order_price: Number(productPrice),
          order_created_at: new Date(),
        };
        totalPrice += value.order_qty * Number(productPrice);

        const result = await postOrders(setData);
        request.body.history[index].product_name = JSON.parse(productName);
      });
      setTimeout(async () => {
        totalResult.subtotal = totalPrice + totalPrice * 0.1;
        
        await patchHistory(
          {
            history_subtotal: totalPrice,
            history_created_at: new Date(), 
          },
          idHistory
        );
        return helper.response(response, 201, "history created", totalResult);
      }, 500);
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchHistory: async (request, response) => {
    try {
      const { id } = request.params;
      const { order_id, history_subtotal } = request.body;
      const setData = {
        order_id,
        history_subtotal,
        history_updated_at: new Date(),
      };
      const checkId = await getHistoryById(id);
      if (checkId.length > 0) {
        const result = await patchHistory(setData, id);
        return helper.response(response, 201, "History Updated", result);
      } else {
        return helper.response(
          response,
          404,
          `History By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryOrder: async (request, response) => {
    const result = await getOrders();
    try {
      return helper.response(
        response,
        200,
        "Successfull Get Total Orders",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getTodayIncome: async (request, response) => {
    const result = await getTodayHistory();
    try {
      return helper.response(
        response,
        200,
        "Successfull Get Today Income",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getYearIncome: async (request, response) => {
    const result = await getYearIncomeHistory();
    try {
      return helper.response(
        response,
        200,
        "Successfull Get Year Income",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getRecentOrders: async (req, res) => {
    try {
      const { id } = req.body;
      const result = await recentOrderHistory();
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getDataOrder(result[i].history_id);
      }
      return helper.response(res, 201, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
};
