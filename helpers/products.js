const Product = require('../models/Product').Product

export const addProduct = async(name) => {
  try {
    let aProduct = new Product({
      createdAt: new Date(),
      name: name
    })
    return await aProduct.save()
  }
  catch(error) {
    console.log(error, 'logging error adding product')
    throw error
  }
}


export const getProducts = async(userId, filters, page, limit) => {
  var options = {
    page: page,
    limit: limit ? limit : 10,
    sort: { createdAt: -1 }
  }
  try {
    let products = await Product.paginate({}, options)
    return products
  }
  catch(error) {
    console.log(error, 'logging error getting products')
    throw error
  }

}

