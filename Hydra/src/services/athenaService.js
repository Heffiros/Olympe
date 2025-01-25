exports.analyzeText = async (text) => {
  try {
    console.log('Texte analysé:', text);  // Log du texte reçu par Athena

    // Ici tu peux imaginer qu'Athena traite le texte et renvoie une réponse
    const response = {
      "intent": "device_action",
      "device": "light",
      "action": "turn_on"
    };

    console.log('Réponse générée par Athena:', response);  // Log de la réponse

    return response;
  } catch (error) {
    console.error('Erreur dans analyzeText:', error);  // Log de l'erreur
    throw new Error('Erreur lors de la communication avec Athena');
  }
};
