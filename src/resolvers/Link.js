/*
 * postedBy()
 * Fetch the Link from the database using the prisma instance and then call postedBy on it
 */
function postedBy(parent, args, context){
    return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy()
}

module.exports = {
    postedBy,
}