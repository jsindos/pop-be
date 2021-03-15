const router = require('express').Router()
const products = require('./products/routes')
const user = require('./endpoints/user')

router.get('/', async function (req, res) {
  try {
    res.send({ test: 'test' })
  } catch (error) {
  }
})

router.use('/products', products)
router.use('/user', user)

module.exports = router
