'use strict';
const express = require('express');
const router = express.Router();

const controllerupload = require('../Controllers/Upload.controller');
//khai báo middleware multer ở đây

router.post('/uploadsingle',controllerupload.upload)
router.post('/uploadmultiple',controllerupload.uploadMultipleFiles)
router.get('/files',controllerupload.getListFiles)
router.get('/files/:name', controllerupload.download);


module.exports = router
