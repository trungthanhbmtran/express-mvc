'use strict';

const {uploadFileMiddleware,uploadMultiFileMiddleware} = require('../Models/upload.model')
const createError = require('http-errors')
let baseUrl = `http://localhost:${process.env.PORT}/v1/upload/files/`
const fs =require('fs')
const path = require('path')


var self = module.exports = {
       upload: async(req, res,next) => {
         try {
            await uploadFileMiddleware(req, res)
            if(req.file == undefined){
                throw createError.Unauthorized("Please upload a file!" )
            }
            res.json({
                message: "Uploaded the file successfully: " + req.file.originalname,
            })
         } catch (error) {
            next(error)
         }
      },
      uploadMultipleFiles: async(req, res,next) => {
        try {
            await uploadMultiFileMiddleware(req,req)
            // if(req.file == undefined){
            //     throw createError.Unauthorized("Please upload a file!" )
            // }
            res.json({
                message: "Uploaded the file successfully "
            })
        } catch (error) {
            next(error) 
 
        }
         
      },
      getListFiles: async(req, res,next) => {
        try {
        const directoryPath = path.join(__dirname,'../uploads');
        console.log('directoryPath',directoryPath)
        // const directoryPath = "C:/Users/Admin/Desktop/Final_BE_Api/your-project/src/v1/uploads";
            fs.readdir(directoryPath, function (err, files) {
              if (err) {
                res.status(500).json({
                  message: "Unable to scan files!",
                });
              }
              let fileInfos = [];
              files.forEach((file) => {
                fileInfos.push({
                  name: file,
                  url: baseUrl + file,
                });
              });
              res.status(200).json(fileInfos);
            });
        } catch (error) {
            next(error) 
 
        }
         
      },
      download: async(req, res,next) => {
        try {
            // const fileName = req.params.name;
            const fileName = req.params.name;
            // console.log('fileName',fileName)
            const directoryPath = path.join(__dirname,'../uploads',fileName);
            // const directoryPath = "C:/Users/Admin/Desktop/Final_BE_Api/your-project/src/v1/uploads/files";
            res.download(directoryPath, fileName, (err) => {
                if (err) {
                res.status(500).json({
                    message: "Could not download the file. " + err,
                });
                }
            });
        } catch (error) {
            next(error) 
 
        }
         
      },

}