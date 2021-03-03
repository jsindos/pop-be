const User = require('../models/User').User

export const getUser = async (username) => {
  try {
    let user = await User.findOne({username: username})
    return user
  }
  catch(error) {
    throw error
  }
}


export const createUser = async (data) => {
  try {

    let doesExist = await User.exists({username: data.username})
    if (!doesExist) {
      let aUser = new User({
        username: data.username,
        hash: data.hash,
        salt: data.salt,
        createdAt: new Date()
      })

      let user = await aUser.save()
      return user

    }
    else {
      console.log('user exists already')
    }
  }
  catch (error) {
      console.log(error, 'something went wrong creating a user')
      throw error
    }
}