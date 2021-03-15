module.exports = class ProductsController {
  constructor ({ ProductsService }) {
    this.ProductsService = ProductsService
  }

  async getProducts (req, res) {
    try {
      const page = req.query.page
      const limit = req.query.limit
      const products = await this.ProductsService.getProducts(page, limit)
      res.send(products)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
}
