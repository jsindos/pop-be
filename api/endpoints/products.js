const getProducts = require('../../helpers/products').getProducts


const router = require('express').Router()
const passport = require('passport')


router.get('/list', passport.authenticate('jwt', { session: false }) ,async function (req, res) {
  try {
    let userId = req.user.id
    let filters =  req.query.filters
    let page = req.query.page
    let limit = req.query.limit
    let response = await getProducts(userId, botId, filters, page, limit)
    res.send(response)
  }
  catch(error) {
    res.status(500).send({ error: error })
    console.log(error, 'logging error')
  }
})



module.exports = router
