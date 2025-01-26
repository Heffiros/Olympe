const OpenAI = require('openai')
require('dotenv').config()

exports.analyzeText = async (text) => {
  try {
    const response = {
      "intent": "device_action",
      "device": "light",
      "action": "turn_on"
    };
    return response;
  } catch (error) {
    throw new Error('Erreur lors de la communication avec Athena')
  }
};


exports.openAITesting = async (message, documentation) => {
  const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANISATION,
    project: process.env.OPENAI_PROJECT,
    apiKey: process.env.OPENAI_APIKEY
  })

  const messages = [
    {
      role: 'system',
      content: 'Tu es un assistant qui répond en fonction de la documentation fournie.',
    },
    {
      role: 'user',
      content: documentation,
    },
    {
      role: 'user',
      content: message,
    },
  ]

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    store: true,
    stream: true,
  })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "")
    console.log(chunk.choices[0]?.delta?.content)
  }

}