const ProductsModel = require('./products/model')
const ProductsService = require('./products/service')

const models = {
  ProductsModel
}

module.exports = {
  ProductsService: new ProductsService(models)
}
