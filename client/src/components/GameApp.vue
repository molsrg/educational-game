<script setup>
//import Phaser from 'phaser'
import { ref, toRaw } from "vue";
import PhaserGame from "@/game/PhaserGame.vue";

// The sprite can only be moved in the MainMenu Scene
const canMoveSprite = ref();

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
//const spritePosition = ref({ x: 0, y: 0 })

const changeScene = () => {
  const scene = toRaw(phaserRef.value.scene);
  if (scene) {
    //  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
    scene.changeScene();
  }
};
//  This event is emitted from the PhaserGame component:
const currentScene = (scene) => {
  canMoveSprite.value = scene.scene.key !== "MainMenu";
};
</script>

<template>
  <PhaserGame
    class="game-container"
    ref="phaserRef"
    @current-active-scene="currentScene"
  />
</template>

<style>
.game-container {
  width: 1024px;
  height: 768px;
}
</style>
