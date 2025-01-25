import { createRouter, createWebHistory } from 'vue-router'
import Transcription from '@/views/Transcription.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'transcription',
      component: Transcription,
    }
  ],
})

export default router
