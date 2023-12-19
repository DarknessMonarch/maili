<template>
  <div class="navigation-section">
    <ArrowIcon class="icon-back" @click="goback" />
  </div>
</template>
<script setup>
import ArrowIcon from '../icons/ArrowIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goback = () => {
  router.go(-1)
}
</script>
<style>
@import '@/style/navigation.css';
</style>
