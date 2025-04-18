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
}

async function add(data) {
  console.log('Dyonisos Service : add product')
}
module.exports = { initAction }