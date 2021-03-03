
const router = require('express').Router()
const User = require('../../../models/User').User
const utils = require('../../../utils')


router.post('/login', async(req, res, next) => {
  try {
    let user = await User.findOne({username: req.body.username})
    if (!user) {
      res.status(401).json({ success: false, msg: "could not find user" });
    }

    // Function defined at bottom of app.js
    const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

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

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  try {
    let aUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      createdAt: new Date()
    })

      let user = await aUser.save()

      res.json({success: true, user: user})

  } catch (err) {
    res.status(500).send({ error: err })
  }
})


module.exports = router
