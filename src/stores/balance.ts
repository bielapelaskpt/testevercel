// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
/* 
export const useBalanceStore = defineStore('balance', {
  state: () => {
    return { balance: 0 }
  },
  
  actions: {
    increment(bl){
        this.balance = this.balance + bl
    }
  },
}) */

export const useBalanceStore = defineStore('balance', () => {
    const balance = ref(0)
    const increment = (bl: number) => {
        balance.value += bl
    }

    return { balance, increment }
})
