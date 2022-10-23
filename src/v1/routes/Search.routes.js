'use strict'

const express = require('express')
const searchController = require('../Controllers/search.controller')

const router = express.Router()

router.get('/',searchController.Search)
router.put('/',searchController.Create)
router.delete('/',searchController.Delete)


module.exports=router