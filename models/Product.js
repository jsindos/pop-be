var mongoose = require('mongoose')
var Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

var product = new Schema({
  createdAt: { type: Date, Required: 'date' },
  name: { type: String }
})

product.plugin(mongoosePaginate)
product.index({ name: 'text' })

// Compile model from schema
const Product = mongoose.model('Product', product)

module.exports.Product = Product
