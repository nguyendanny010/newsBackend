const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1
    // Encrypt user password with bcryptjs library
    const password = await bcrypt.hash(args.password, 10)

    // 2
    // Store new User in database
    const user = await context.prisma.user.create({ data: { ...args, password } })

    // 3
    // Generate JSON Web Token which is signed with APP_SECRET
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 4
    // Return token and user in an object corresponding to AuthPayload object
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // 1
    // Retrieve an existing user by the input email
    const user = await context.prisma.user.findOne({ where: { email: args.email } })
    if (!user) {
        throw new Error('No such user found')
    }

    // 2
    // Compare password with the one stored in the database
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 3
    return {
        token,
        user,
    }
}

function post(parent, args, context, info){
    const userId = getUserId(context)
    return context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: {id: userId } }
        }
    })
}

module.exports = {
    signup,
    login,
    post,
}
