<template>
  <div id="app" class="container">
    <h1 class="title">Bienvenue dans le projet Apollon</h1>
    <div class="content">
      <button @click="startListening" :disabled="isListening">
        {{ isListening ? 'Écoute en cours...' : 'Démarrer l\'écoute' }}
      </button>
      <p v-if="transcription" class="transcription">Transcription : {{ transcription }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transcription: '',
      isListening: false,
      recognition: null,
      errorMessage: ''
    }
  },
  methods: {
    startListening() {
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        this.errorMessage = 'Votre navigateur ne supporte pas la reconnaissance vocale'
        return
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.lang = 'fr-FR'
      this.recognition.continuous = false
      this.recognition.interimResults = false

      this.recognition.onstart = () => {
        this.isListening = true
        this.errorMessage = ''
      }
      this.recognition.onresult = (event) => {
        this.transcription = event.results[0][0].transcript
      }
      this.recognition.onerror = (event) => {
        this.errorMessage = `Erreur : ${event.error}`
      }
      this.recognition.onend = () => {
        this.sendTranscription()
        this.isListening = false
      }

      this.recognition.start()
    },
    async sendTranscription() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcription: this.transcription })
      };

      try {
        const response = await fetch('http://localhost:3000/transcription', requestOptions)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
/* Style général pour le thème sombre */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #2E2E2E;
  color: #fff;
}

/* Conteneur principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

/* Titre */
.title {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2rem;
}

/* Bloc de contenu */
.content {
  background: #444;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

/* Bouton */
button {
  padding: 0.5rem 1rem;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

/* Texte de transcription */
.transcription {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #fff;
  word-wrap: break-word;
}

/* Erreur */
.error {
  color: red;
  margin-top: 1rem;
}
</style>
