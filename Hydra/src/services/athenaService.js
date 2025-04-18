const OpenAI = require('openai')
const fs = require('fs')
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function analyzeText(transcription) {
  console.log('analyzeService => analyseText: ' + transcription)
  let response
  try {
    //Todo re-activer ici quand je serais sur que ça me coute pas un bras
    /*const doc = fs.readFileSync('./data/doc.txt', 'utf8')
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: doc },
        { role: 'user', content: transcription }
      ]
    })
    const response = chatCompletion.choices[0].message.content*/
    response = "{\"action\":0,\"service\":\"Dyonisos\",\"data\":\"Bonjour Apollon comment puis je t'aider aujourd'hui\"}"
  } catch (err) {
    console.error('[OpenAI Error]:', err)
    return {
      success: false,
      error: 'Erreur OpenAI'
    }
  }
  callDynamicService(JSON.parse(response))
}

async function callDynamicService(data) {

  const dynamicServiceRequire = require('../services/' + data.service.toLowerCase() + 'Service.js')
  try {
    const dynamicServiceResponse = await dynamicServiceRequire.initAction(data)
  } catch (error) {
    console.log(error)
  }
}
module.exports = { analyzeText }
