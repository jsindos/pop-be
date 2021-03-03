const Page = require('../models/Product').Page;
const { ObjectId } = require('mongodb');




const getProducts = async(userId, filters, page, limit) => {
  try {


  }
  catch(error) {
    console.log(error, 'logging error getting jobs')
    throw error
  }

}

module.exports.getProducts = getProducts
