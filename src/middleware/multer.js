const multer = require("multer");
const helper = require("../helper/index");
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (request, file, callback) => {
    console.log(file);
    callback(
      null,
      file.fieldname +
        "-" +
        new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.originalname
    );
  },
});

const fileFilter = (request, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    return callback(
      new Error("Only support for JPEG and PNG File Extension"),
      false
    );
  }
};

const limits = { fileSize: 1024 * 1024 * 2 };

let upload = multer({ storage, fileFilter, limits }).single("product_image");

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message);
    } else if (err) {
      return helper.response(response, 400, err.message);
    }
    next();
  });
};

module.exports = uploadFilter;
