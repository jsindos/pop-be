var mongoose = require('mongoose')
var Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

var product = new Schema({
  createdAt: { type: Date, Required: 'date' },
  name: { type: String }
})


product.plugin(mongoosePaginate);
product.index({name: 'text', 'name': 'text'});

// Compile model from schema
const Page = mongoose.model('Page', product );

module.exports.Page = Page;


