<template>
  <v-container class="d-flex flex-column align-center justify-center fade">
    <VCard class="rounded-xl w-75">
      <VCardTitle style="background-color: black;" class="d-flex justify-center aling-center pa-4">
        O QUE VOCÊ PREFERE? 👇 
      </VCardTitle>
      <VCardText style="background-color: white;" class="pa-4">
        <VBtn variant="outlined" color="black" style="font-size: 0.8rem;" class="w-100 d-flex mb-4 justify-start rounded-xl" size="large" prepend-icon="mdi-alpha-a-circle-outline" @click="toPage('image')">
          Posts (Fotos)
        </VBtn>
        <VBtn variant="outlined" color="black" style="font-size: 0.8rem;"  class="w-100 rounded-xl d-flex justify-start" size="large" prepend-icon="mdi-alpha-b-circle-outline" @click="toPage('video')">
          Reels (Vídeos curtos)
        </VBtn>
      </VCardText>
    </VCard>
    <p class="pt-3 text-caption">Selecione um tipo acima para avaliar</p>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const toPage = (page) => {
  router.push(`/evaluator?type=${page}`)
}
</script>


<style>
.fade {
  background: linear-gradient(to bottom, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F77737, #FCAF45, #FFDC80);
  /* Adapte as cores conforme necessário */
  width: 100%;
  height: 100vh; /* Defina a altura conforme necessário */
}
</style>