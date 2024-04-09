<template>
    <VAppBar color="black">
        <VAppBarTitle><VImg :width="150" src="@/assets/logo.png"></VImg></VAppBarTitle>
        <template v-slot:append>
            <VSheet class="py-1 px-4 rounded" color="#7c3aed">
                <p class="text-h6">R$ {{ formattedBalance }}</p>
            </VSheet>
        </template>
    </VAppBar>
</template>

<script setup lang="ts">
import { useBalanceStore } from '@/stores/balance'
import { computed } from 'vue';

const balance = useBalanceStore()

const formattedBalance = computed(() => balance.balance.toFixed(2))
</script>
<style scoped>

</style>