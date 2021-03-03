const router = require('express').Router()
const productsRouter = require('./endpoints/products')

router.get('/', async function (req, res) {
  try {
    res.send({test: 'test'})
  }
  catch(error) {
  }
})


router.use('/products', productsRouter)


module.exports = router