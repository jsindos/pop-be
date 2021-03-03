import { getProducts } from '../../helpers/products'

const router = require('express').Router()
const passport = require('passport')

//Add to route to make only accessible to users with auth token
//passport.authenticate('jwt', { session: false })

router.get('/list' ,async function (req, res) {
  try {
    let page = req.query.page
    let limit = req.query.limit
    let response = await getProducts(page, limit)
    res.send(response)
  }
  catch(error) {
    res.status(500).send({ error: error })
    console.log(error, 'logging error')
  }
})



module.exports = router
