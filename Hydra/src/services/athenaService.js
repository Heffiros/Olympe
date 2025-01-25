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
