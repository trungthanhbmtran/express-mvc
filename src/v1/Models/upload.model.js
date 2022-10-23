// var multer = require('multer');
// const path =require('path')
// const util = require("util");
// const maxSize = 2 * 1024 * 1024;

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,__basedir+ '/uploads'); //hỉnh ảnh sẽ chưa trong folder uploads
       
//     },
//     filename: (req, file, cb) => {
//         cb(null , file.originalname); ;// mặc định sẽ save name của hình ảnh
//         // là name gốc, chúng ta có thể rename nó.  
//     }
// })

// let uploadFile = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//   }).single("file");

//   let uploadMultilFile = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//   }).any();



// let uploadFileMiddleware = util.promisify(uploadFile);
// let uploadMultilFileMiddleware = util.promisify(uploadMultilFile);


// // var upload = multer({storage:storage}); //save trên local của server khi dùng multer

// module.exports = {uploadFileMiddleware,uploadMultilFileMiddleware};

const util = require("util");
const multer = require("multer");
const path = require('path');

// const filenameInfo = path.join(__dirname,'../uploads','info.log');

const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("req",req.body)
    cb(null, "C:/Users/Admin/Desktop/Final_BE_Api/your-project/src/v1/uploads");
  },
  filename: (req, file, cb) => {
    // console.log('req filename',req)
    // console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadMultiFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).any();

let uploadFileMiddleware = util.promisify(uploadFile);
let uploadMultiFileMiddleware = util.promisify(uploadMultiFile);


module.exports = {uploadFileMiddleware,uploadMultiFileMiddleware};