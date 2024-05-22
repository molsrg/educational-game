<template>
  <div class="home">
    <h1>Educational game v.1.0.</h1>
    <GameApp />
    <CompilerApp />
    <CompleteTask/>
  </div>
</template>

<script setup lang="ts">
import CompleteTask from '@/components/CompleteTask.vue';
import CompilerApp from "@/components/CompilerApp.vue";
import GameApp from "@/components/GameApp.vue";
</script>

<style>
.home {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin: 10px;
  row-gap: 10px;
}
</style>
