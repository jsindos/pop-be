const Product = require('../models/Product').Product
const { ObjectId } = require('mongodb')

const getProducts = async(userId, filters, page, limit) => {
  try {

   return await Product.find({})
  }
  catch(error) {
    console.log(error, 'logging error getting jobs')
    throw error
  }

}

module.exports.getProducts = getProducts
