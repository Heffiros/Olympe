const avaiableAction = Object.freeze({
  speak: 0
})

async function initAction(data) {
  console.log('Thot Service : init action')
  if (!Object.values(avaiableAction).includes(data.action)) {
    console.error("Thot Service : undefined action")
    return {
      success: false,
      error: 'Thot Service : undefined action'
    }
  }
}

module.exports = { initAction }