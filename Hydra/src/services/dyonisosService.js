const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const avaiableAction = Object.freeze({
  add: 0,
  update: 1,
  remove: 2,
  send: 3
})

async function initAction(data) {
  console.log('Dyonisos Service : init action')
  if (!Object.values(avaiableAction).includes(data.action)) {
    console.error("Dyonisos Service : undefined action")
    return {
      success: false,
      error: 'Dyonisos Service : undefined action'
    }
  }
  add(data)
}

async function add(data) {
  console.log('Dyonisos Service : add product')
  const grocery = await prisma.groceries.create({
    data: {
      label: 'Carotes',
      quantity: 2,
    },
  })
}
module.exports = { initAction }