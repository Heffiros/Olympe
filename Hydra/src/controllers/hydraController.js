const athenaService = require('../services/athenaService');

exports.processTranscription = async (req, res) => {
  const { transcription } = req.body;
  console.log('Données reçues:', req.body);
  if (!transcription) {
    return res.status(400).json({ error: 'No transcription provided' });
  }

  try {
    const athenaResponse = await athenaService.analyzeText(transcription);
    console.log('Réponse d\'Athena:', JSON.stringify(athenaResponse, null, 2));
    res.json(athenaResponse);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du traitement' });
  }
};
