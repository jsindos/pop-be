const router = require('express').Router()
const passport = require('passport')

const { ProductsService } = require('../services')

const ProductsController = require('./controller')
const controller = new ProductsController({ ProductsService })

router.get('/', controller.getProducts.bind(controller))

module.exports = router
