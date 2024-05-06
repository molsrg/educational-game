<template>
  <div class="home">
      <h1>
        Educational game v.1.0.
      </h1>

    <GameApp />
    <CompilerApp />
    <v-btn @click="appStore.changeOpenCreateModal">Открыть компилятор</v-btn>
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

  margin: 10px;
  row-gap: 10px;
}
</style>
