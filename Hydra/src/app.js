const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const hydraController = require('./controllers/hydraController')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json()) // Pour parser le JSON dans les requêtes POST

app.post('/transcription', hydraController.processTranscription)

app.listen(port, () => {
  console.log(`Hydra service running on port ${port}`)
})
