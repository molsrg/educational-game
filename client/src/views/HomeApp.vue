<template>
  <div class="home">
    <GameApp />
    <CompilerApp/>
  </div>
</template>

<script setup lang="ts">
import CompilerApp from '@/components/CompilerApp.vue'
import GameApp from '@/components/GameApp.vue'
</script>

<style>
.home {
  display: flex;
	flex-wrap: wrap;
}
</style>
