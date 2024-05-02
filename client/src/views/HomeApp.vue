<template>
  <div class="home">
    <div style="display: flex; column-gap: 10px; align-items: center">
      <h1>Educational game</h1>
      <v-btn @click="appStore.changeOpenCreateModal">Открыть компилятор</v-btn>
    </div>
    <GameApp />
    <CompilerApp />
  </div>
</template>

<script setup lang="ts">
import CompilerApp from "@/components/CompilerApp.vue";
import GameApp from "@/components/GameApp.vue";
import { useAppStore } from "@/store/app.js";
const appStore = useAppStore();

</script>

<style>
.home {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}
</style>
