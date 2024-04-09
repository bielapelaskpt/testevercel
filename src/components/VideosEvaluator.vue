<template>
    <VCard color="black">
        <VCardTitle class="d-flex align-center" style="background-color: black;">
            <div class="fade-avatar mr-3 rounded-circle">
                <VAvatar :image="actualPost.avatar"></VAvatar>
            </div>
            <p class="d-flex align-center" style="font-size: 0.9rem;">{{ actualPost.name }} <VIcon class="ml-1"
                    color="primary" size="x-small" icon="mdi-check-decagram"></VIcon>
            </p>
            <div class="w-100 d-flex justify-end">
                <VIcon size="x-small" icon="mdi-dots-horizontal"></VIcon>
            </div>
        </VCardTitle>
        <VCardText class="w-100 pa-0">
            <!-- Replace VImg with video player component -->
            <video :src="actualPost.video" autoplay class="w-100" controlsList="nodownload"></video>
            <VRow>
                <VCol cols="6" class="d-flex align-center pa-5 my-2">
                    <VIcon icon="mdi-heart" color="red" class="mr-2"></VIcon>
                    <p>{{ actualPost.likes }} curtidas</p>
                </VCol>
                <VCol cols="6" class="d-flex align-center justify-end pa-5">
                    <VIcon icon="mdi-bookmark-outline" size="x-large"></VIcon>
                </VCol>
            </VRow>
        </VCardText>
    </VCard>

    <VSheet class="ma-4 pa-4 rounded-lg">
        <p class="text-center pb-2">Você tem interesse nessa publicação?</p>
        <VRow>
            <VCol cols="6">
                <VBtn prepend-icon="mdi-close" size="large" class="w-100" color="red" @click="nextPost">
                    Não
                </VBtn>
            </VCol>
            <VCol cols="6">
                <VBtn prepend-icon="mdi-check" size="large" class="w-100" color="green" @click="nextPost">
                    Sim
                </VBtn>
            </VCol>
        </VRow>
    </VSheet>

    <VDialog v-model="dialog">
        <VSheet class="rounded pa-4">
            <Vue3Lottie :animationData="congratulations" :height="250" :width="250" />
            <p class="text-center font-weight-bold">PARABÉNS!</p>
            <p class="text-center font-weight-bold mt-4">Você acaba de ganhar</p>
            <p class="text-h4 text-center font-weight-bold" style="color: #4ade80;">R$ {{ balance.balance.toFixed(2) }} !</p>
            <p class="text-center text-caption">Assista um curto vídeo com o passo a passo para você aprender a cadastrar sua chave <b>PIX</b> e realizar o seu primeiro <b>SAQUE.</b></p>
            <VBtn v-if="step === '2'" class="w-100 mt-4" color="purple" @click="checkout">realizar saque</VBtn>
            <VBtn v-else class="w-100 mt-4" color="purple" @click="vsl">aprender a sacar</VBtn>
        </VSheet>
    </VDialog>

    <VSnackbar v-model="notification" timeout="2000" location="top" color="black">
        <div class="d-flex align-center">
            <VIcon class="mr-3" icon="mdi-check-decagram" color="green"></VIcon>
            <p>Você avaliou essa públicação e recebeu R$37,56 por isso</p>
        </div>
    </VSnackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { Vue3Lottie } from 'vue3-lottie'
import { useBalanceStore } from '@/stores/balance'
import congratulations from '@/assets/congratulations.json'
import cash from '@/assets/cash.mp3'

const balance = useBalanceStore()

const route = useRoute()

const dialog = ref(false)
const notification = ref(false)

const step = route.query.step

const vsl = () => {
    window.location.href = 'https://instapremiumpro.com/acesso-01vsldireta/'
}

const checkout = () => {
    window.location.href = 'https://pay.iexperience.com.br/38582d3a'
}

const posts = ref([
    {
        name: 'Ronaldinho Gaúcho',
        video: 'https://github.com/lunosat/cli-youtube/raw/main/ronaldinho.mp4', // Example video URL
        avatar: 'https://i.imgur.com/6BjrnuP.jpg',
        likes: '387 mil'
    }, {
        name: 'Neymar Jr. 🇧🇷',
        video: 'https://github.com/lunosat/cli-youtube/raw/main/neymar.mp4', // Example video URL
        avatar: 'https://i.imgur.com/yLDkAFd.jpg',
        likes: '2.7 mi'
    },{
        name: 'Anitta 🎤',
        video: 'https://github.com/lunosat/cli-youtube/raw/main/anitta.mp4',
        avatar: 'https://i.imgur.com/cr3SJVC.jpg',
        likes: '987 mil'
    },
    // Add more video posts as needed
])

const actualPostCount = ref()
const actualPost = ref()

if(step === '2'){
    actualPost.value = posts.value[3]
    actualPostCount.value = 3
} else {
    actualPost.value = posts.value[0]
    actualPostCount.value = 0
}

const showPopup = () => {
    dialog.value = true
}
const playAudio = () => {
    const audio = new Audio(cash);
    audio.play();
}

const showNotification = () => {
    notification.value = true
}

const nextPost = () => {
    console.log(balance.balance)
    try {
        balance.increment(37.56)
        playAudio()
        showNotification()
        if (actualPostCount.value < posts.value.length - 1) {
            if (actualPostCount.value === 2) {
                showPopup()
                return
            }

            actualPostCount.value += 1
            actualPost.value = posts.value[actualPostCount.value]
        } else {
            showPopup()
        }
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
.fade-avatar {
    background: linear-gradient(to bottom, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F77737, #FCAF45, #FFDC80);
    padding: 0.5%;
}
</style>
