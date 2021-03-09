const router = require('express').Router()
const productsRouter = require('./endpoints/products')
const userRouter = require('./endpoints/user')

router.get('/', async function (req, res) {
  try {
    res.send({ test: 'test' })
  } catch (error) {
  }
})

router.use('/products', productsRouter)
router.use('/user', userRouter)

module.exports = router
