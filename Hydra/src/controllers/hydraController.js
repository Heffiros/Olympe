const athenaService = require('../services/athenaService')

exports.processTranscription = async (req, res) => {
  const { transcription } = req.body
  if (!transcription) {
    return res.status(400).json({ error: 'No transcription provided' })
  }

  try {
    console.log('ici')
    const athenaResponse = await athenaService.analyzeText(transcription)
    const athenaResponseByIA = await athenaService.openAITesting(transcription, "Permière version de la documentation quelque soit ce que tu reçois peux tu répondre un json avec une clé service: hermes et message: 'Bonjour Alexandre comment puis je t'aider ajd'")
    res.json(athenaResponse)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erreur lors du traitement' })
  }
};
