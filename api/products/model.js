var mongoose = require('mongoose')
var Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

var products = new Schema({
  createdAt: { type: Date, Required: 'date' },
  name: { type: String }
})

products.plugin(mongoosePaginate)
products.index({ name: 'text' })

module.exports = mongoose.model('Product', products)
