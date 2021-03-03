const User = require('../models/User').User

export const createUser = async (data) => {
  try {
    let aUser = new User({
      username: data.name,
      hash: data.hash,
      salt: data.salt,
      createdAt: new Date()
    })

    let user = await aUser.save()
    return user

  }
  catch(error) {
    console.log(error, 'something went wrong creating a user')
    throw error

  }
}