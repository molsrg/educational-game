<template>
  <v-dialog max-width="500" v-model="appStore.completeTaskModal">
    <template v-slot:default="{ isActive }">
      <v-card title="Поздравляем!">
        <v-card-text>
          Молодец! Ты выполнил задание!
          <div>Осталось выполнить задания: {{ remainingTasks }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть диалог" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useAppStore } from "@/store/app.js";
const appStore = useAppStore();

const completedTask = computed(() => appStore.completedTask);

const remainingTasks = computed(() => {
  const allTasks = [1, 2, 3, 4, 5];
  return allTasks.filter((task) => !completedTask.value.includes(task));
});
</script>
