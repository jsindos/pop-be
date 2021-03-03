var mongoose = require('mongoose')
var Schema = mongoose.Schema
var user = new Schema({
  username: { type: String, required: 'username' },
  hash:  { type: String, required: 'hash required' },
  salt: {type: String, required: 'hash required'},
  createdAt: {type: Date},
  scrapers:  { type: Schema.Types.ObjectId, ref:  'Scrapers' },
  bots: [{ type: Schema.Types.ObjectId, ref:  'Bot' }]

})



// Compile model from schema
const User = mongoose.model('User', user );

module.exports.User = User;