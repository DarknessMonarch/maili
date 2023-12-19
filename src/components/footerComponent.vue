<template>
  <div class="footer-container">
    <div class="footer-link-container">
      <RouterLink class="footer-link" :to="{ name: 'Home' }">Home</RouterLink>
        <RouterLink class="footer-link" :to="{ name: 'Support' }">Support</RouterLink>
        <RouterLink class="footer-link" :to="{ name: 'Policy' }">Policy</RouterLink>
        <RouterLink class="footer-link" :to="{ name: 'Disclaimer' }">Disclaimer</RouterLink>
        <RouterLink class="footer-link" :to="{ name: 'Terms' }">Terms and Conditions</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
<style>
@import '@/style/footer.css';
</style>
