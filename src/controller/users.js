const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const { postUser, checkUser } = require("../model/users");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (request, response) => {
    const { user_email, user_password, user_name } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    // console.log("user_password =" + user_password);
    // console.log("user_password Bcrypt =" + encryptPassword);
    // kondisi jika emailnya sama itu tdk bisa
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
        const result = await postUser(setData);
        return helper.response(response, 200, "Success Register User", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      // console.log(user_email);
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        //proses kedua
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          //   proses 3 = set JWT
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
          const token = jwt.sign(payLoad, "Rahasia", { expiresIn: "1000h" });
          payLoad = { ...payLoad, token };
          return helper.response(response, 200, "Successfull Login", payLoad);
        } else {
          return helper.response(response, 400, "Wrong Pasword");
        }
      } else {
        return helper.response(response, 400, "Email Not Registered");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
