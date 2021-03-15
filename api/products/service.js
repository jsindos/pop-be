module.exports = class ProductsService {
  constructor ({ ProductsModel }) {
    this.ProductsModel = ProductsModel
  }

  async getProducts (page, limit = 10) {
    var options = {
      page,
      limit,
      sort: { createdAt: -1 }
    }
    const products = await this.ProductsModel.paginate({}, options)
    return products
  }
}
