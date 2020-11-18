// 1
// Import the PrismaClient constructor from the @prisma/client node module
const { PrismaClient } = require("@prisma/client")

// 2
// Instantiate PrismaClient
const prisma = new PrismaClient()

// 3
// Define an async funciton called main to send queries to the database
async function main(){
    const newLink = await prisma.link.create({
        data:{
            description: 'A cool website',
            url: 'www.reddit.com',
        },
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

// 4
// Call main function
main()
.catch(e => {
    throw e
})
//5
// Close database connection when the script terminates
.finally(async () => {
    await prisma.$disconnect()
})