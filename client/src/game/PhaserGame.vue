<script setup>

// Для Тимура (переменная хранит в себе true/false открытия модалки), доступ к значению переменной через .value
// import { computed } from 'vue'
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore();
//const value = computed(() => appStore.isOpenCreateModal);



import { onMounted, onUnmounted, ref } from "vue";
import { EventBus } from "./EventBus";
import StartGame from "./main";
import { watch } from 'vue'

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene', 'calling-modal']);

onMounted(() => {
  game.value = StartGame("game-container");
  EventBus.on("current-scene-ready", (currentScene) => {
    emit("current-active-scene", currentScene);

    scene.value = currentScene;
  });
  EventBus.on("calling-modal", (currentScene, testId) => {
    emit("calling-modal", currentScene, testId)
    appStore.changeOpenCreateModal()
    appStore.getTaskFromServer(testId)
  });
  watch(() => appStore.isOpenCreateModal, (newValue) => {
    game.value.config.isOpen = newValue;
  });
});

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true);
    game.value = null;
  }
});

defineExpose({ scene, game });
</script>

<template>
  <div id="game-container"></div>
</template>

<style></style>
