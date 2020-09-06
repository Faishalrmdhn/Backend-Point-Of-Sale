const {
  getProduct,
  getWithOutSort,
  getProductById,
  getProductByName,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductCount,
} = require("../model/product");
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
  getAllProduct: async (request, response) => {
    let { sort, page, limit, ascdsc } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };

    try {
      if (typeof sort === "undefined") {
        const withOutSort = await getWithOutSort(limit, offset);
          const newData = { withOutSort, pageInfo };
      client.set(
        `getproduct:${JSON.stringify(request.query)}`,
        JSON.stringify(newData)
      );
        return helper.response(
          response,
          200,
          "Success Get Product",
          withOutSort,
          pageInfo
        );
      } else {
        const result = await getProduct(sort, limit, offset, ascdsc);
         const newData = { result, pageInfo };
      client.set(
        `getproduct:${JSON.stringify(request.query)}`,
        JSON.stringify(newData)
      );
        return helper.response(response,200,`Success Get Product with sort by ${sort}`,result,pageInfo)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request!", error);
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProductById(id);
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 10000, JSON.stringify(result));
        return helper.response(
          response,
          200,
          `Success Get Product By ID: ${id}`,
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Product by ID : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductByName: async (request, response) => {
    try {
      const { name, limit } = request.query;
      const result = await getProductByName(name, limit);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success Get Product By Name: ${name}`,
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Product By Name: ${name} not found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        product_name,
        product_price,
        product_status,
        category_id,
      } = request.body;
      const setData = {
        product_name,
        product_price,
        product_image: request.file === undefined ? "" : request.file.filename,
        product_created_at: new Date(),
        product_status,
        category_id,
      };
      const result = await postProduct(setData);
      console.log(result);
      return helper.response(response, 201, "Product Created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        product_name,
        product_price,
        product_status,
        category_id,
      } = request.body;
      const setData = {
        product_name,
        product_price,
        product_image: request.file === undefined ? "" : request.file.filename,
        product_updated_at: new Date(),
        product_status,
        category_id,
      };
      const checkId = await getProductById(id);
      let fs = require("fs");
      if (checkId.length > 0) {
        const result = await patchProduct(setData, id);

        console.log(checkId);
        fs.unlink(`./uploads/${checkId[0].product_image}`, function (err) {
          if (err) throw err;
          console.log("file deleted...");
        });
        return helper.response(response, 201, "Product Updated", result);
      } else {
        return helper.response(
          response,
          404,
          `Product By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      let fs = require("fs");
      const { id } = request.params;
      const cekId = await getProductById(id);
      if (cekId.length > 0) {
        fs.unlink(`./uploads/${cekId[0].product_image}`, function (
          error,
          result
        ) {
          if (!error) {
            console.log(result);
          } else {
            console.log(error);
          }
        });
        const result = await deleteProduct(id);
        return helper.response(response, 201, "Product Deleted", result);
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
