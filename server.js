import { addProduct } from './helpers/products'
import { createUser } from './helpers/users'

const express = require('express')
const path = require('path')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const apiRouter = require('./api')
const methodOverride = require('method-override')
const cors = require("cors")
const utils = require('./utils')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


//Init all cron jobs.
if(process.env.NODE_ENV === 'production') {
  console.log('running environemt production')

}


const server = async() => {

 try{
   console.log('start server')
    await mongoose.connect(process.env.DATABASE_URI, { dbName:'pop', useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true  })
    console.log('connected to database')

  }catch(err){
    console.log(err)
  }
  require('./passport-config')(passport);

  app.use(cors({origin: '*'}))
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(passport.initialize())
  app.use(methodOverride('_method'))
// Parse JSON bodies (as sent by API clients)
  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'build')))
  app.use(logger('dev'))
  app.use('/api', apiRouter)
  app.use(methodOverride('_method'))
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
  app.listen(process.env.PORT || 8080);
  console.log('server listening to ', process.env.PORT || 8080)

  console.log('Setting up user and product')
  const saltHash = utils.genPassword('test123')
  const salt = saltHash.salt
  const hash = saltHash.hash
  await createUser({username: 'tester', salt, hash})
  await addProduct('Test product')

  console.log('Testuser: username: tester, pw: test123')

}

server()