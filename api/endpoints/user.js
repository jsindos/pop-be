import { createUser, getUser } from '../../helpers/users'

const router = require('express').Router()
const utils = require('../../utils')


router.post('/login', async(req, res, next) => {
  try {
    console.log(req.body.username, 'logging username')
    let user = await getUser(req.body.username)
    if (!user) {
      res.status(401).json({ success: false, msg: "could not find user" })
    }
    const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

    if (isValid) {
      const tokenObject = utils.issueJWT(user)

      res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires});

    } else {

      res.status(401).json({ success: false, msg: "you entered the wrong password" });

    }
  }
  catch(err) {
    next(err);
    res.status(500).send({ error: err })

  }
})


router.post('/register', async  (req, res, next) =>{

    const saltHash = utils.genPassword(req.body.password)

    const salt = saltHash.salt
    const hash = saltHash.hash
    try {

      let user = await createUser({
        username: req.body.username,
        hash: hash,
        salt: salt
      })
      res.json({success: true, user: user})

    } catch (err) {
      res.status(500).send({error: err})
    }

})


module.exports = router
