import { getProducts } from '../../helpers/products'

const router = require('express').Router()
const passport = require('passport')

// Add to route to make only accessible to users with auth token
// passport.authenticate('jwt', { session: false })

router.get('/list', passport.authenticate('jwt', { session: false }), async function (req, res) {
  try {
    const page = req.query.page
    const limit = req.query.limit
    const response = await getProducts(page, limit)
    res.send(response)
  } catch (error) {
    res.status(500).send({ error: error })
    console.log(error, 'logging error')
  }
})

module.exports = router
