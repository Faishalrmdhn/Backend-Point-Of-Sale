const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/category");
const helper = require("../helper/index");
const qs = require("querystring");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllCategory();
      client.set(
        `getcategory:${JSON.stringify(request.query)}`,
        JSON.stringify(result)
      );
      return helper.response(response, 200, "Success Get Category", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request!", error);
    }
  },
  getCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getCategoryById(id);
      if (result.length > 0) {
        client.setex(`getcategorybyid:${id}`, 10000, JSON.stringify(result));
        return helper.response(
          response,
          200,
          "Success Get Category By ID",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Category by ID : ${id} Not Found`
        );
      }
      // console.log(result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postCategory: async (request, response) => {
    try {
      const { category_status, category_name } = request.body;
      const setData = {
        category_created_at: new Date(),
        category_status,
        category_name,
      };
      const result = await postCategory(setData);
      return helper.response(response, 201, "Category Created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const { category_status, category_name } = request.body;
      const setData = {
        category_status,
        category_name,
        category_updated_at: new Date(),
      };
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        const result = await patchCategory(setData, id);
        return helper.response(response, 201, "Category Updated", result);
      } else {
        return helper.response(
          response,
          404,
          `Category By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const cekId = await getCategoryById(id);
      if (cekId.length > 0) {
        const result = await deleteCategory(id);
        return helper.response(response, 201, "category Deleted", result);
      } else {
        return helper.response(
          response,
          404,
          `Data By Id: ${id} unknown / has been deleted`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
