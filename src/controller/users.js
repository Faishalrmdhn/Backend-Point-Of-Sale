const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const {
  postUser,
  checkUser,
  activateAccount,
  getAllUser,
} = require("../model/users");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUser: async (request, response) => {
    try {
      const result = await getAllUser();
      return helper.response(response, 200, "Success Get User", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request!", error);
    }
  },
  // patchUser: async (request, response) => {
  //   try {
  //     const { id } = request.params;
  //     const {
  //       product_name,
  //       product_price,
  //       product_status,
  //       category_id,
  //     } = request.body;
  //     const setData = {
  //       product_name,
  //       product_price,
  //       product_image: request.file === undefined ? "" : request.file.filename,
  //       product_updated_at: new Date(),
  //       product_status,
  //       category_id,
  //     };
  //     const checkId = await getProductById(id);
  //     let fs = require("fs");
  //     if (checkId.length > 0) {
  //       const result = await patchProduct(setData, id);

  //       fs.unlink(`./uploads/${checkId[0].product_image}`, function (err) {
  //         if (err) throw err;
  //         console.log("file deleted...");
  //       });
  //       return helper.response(response, 201, "Product Updated", result);
  //     } else {
  //       return helper.response(
  //         response,
  //         404,
  //         `Product By Id : ${id} Not Found`
  //       );
  //     }
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // },
  registerUser: async (request, response) => {
    const { user_email, user_password, user_name } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);

    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role: 2,
      user_status: 0,
      user_created_at: new Date(),
    };

    try {
      const checkEmail = await checkUser(user_email);
      if (checkEmail.length > 0) {
        return helper.response(response, 404, "Email has been registered");
      } else {
        const { user_password } = request.body;
        if (user_password.length < 8) {
          return helper.response(
            response,
            404,
            "Minimum password length is 8 characters"
          );
        } else {
          const result = await postUser(setData);
          return helper.response(
            response,
            200,
            "Success Register User",
            result
          );
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      const checkDataUser = await checkUser(user_email);

      if (checkDataUser.length >= 1) {
        if (checkDataUser[0].user_status == 1) {
          const checkPassword = bcrypt.compareSync(
            user_password,
            checkDataUser[0].user_password
          );
          if (checkPassword) {
            const {
              user_id,
              user_email,
              user_name,
              user_role,
              user_status,
            } = checkDataUser[0];
            let payLoad = {
              user_id,
              user_email,
              user_name,
              user_role,
              user_status,
            };
            const token = jwt.sign(payLoad, "Rahasia", { expiresIn: "10h" });
            payLoad = { ...payLoad, token };
            console.log("success login");
            return helper.response(response, 200, "Successfull Login", payLoad);
          } else {
            console.log("wrong password");
            return helper.response(response, 400, "Wrong Pasword");
          }
        } else {
          return helper.response(
            response,
            400,
            "Your Account is inactive. Please contact your admin"
          );
        }
      } else {
        return helper.response(response, 400, "Email Not Registered");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  activateAccount: async (request, response) => {
    try {
      const { user_email, user_name, user_role, user_status } = request.body;
      const setData = {
        user_email,
        user_name,
        user_role,
        user_status,
      };

      const check = await checkUser(user_email);
      if (check.length >= 1) {
        const result = await activateAccount(setData, user_email);
        if (result.user_status == 1) {
          return helper.response(
            response,
            200,
            "Account is active now!",
            result
          );
        } else {
          return helper.response(response, 200, "Account is not active now!");
        }
      } else {
        return helper.response(response, 400, "Wrong Data!");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
