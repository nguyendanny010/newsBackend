const jwt = require('jsonwebtoken')
const APP_SECRET = 'ZOINKS'


/*
 * getUserId
 * Helper function called in resolvers that require authentication
 * First retrieves the Authorization header from the context.
 * Then verifies the JWT and retries the User's ID from it.
 */

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}