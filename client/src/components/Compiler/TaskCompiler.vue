<template>
  <v-textarea
    label="Вставь свой код здесь"
    v-model='taskAnswer'
    variant="filled"
    auto-grow
    @update:model-value="$emit('update:task-answer', $event)"
  ></v-textarea>
</template>

<script setup>

import { ref } from 'vue'

const taskAnswer = ref('')

</script>

<style lang="scss" scoped>



</style>


