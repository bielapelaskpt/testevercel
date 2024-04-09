<template>
    <ImagesEvaluator v-if="type === 'image'"/>
    <VideosEvaluator v-if="type === 'video'"/>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

const type = route.query.type
</script>
