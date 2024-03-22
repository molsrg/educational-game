<template>
  <v-dialog v-model="appStore.openCompilerModal" width="600">
    <v-card
      class="compiler"
      title="Вот твоё задание"
      subtitle="Прочитай задание и вставь код"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vitae exercitationem rerum magnam corporis ut ex illum quia a! Provident, quis. Neque, perferendis fugiat unde itaque ab nemo minima aperiam vitae consequatur, voluptate excepturi hic quidem iusto cupiditate, ullam maxime! Et, libero! Sequi dolores similique modi nisi, reiciendis fugit?"
    >
      <v-text-field label="Label" v-model="task" style='padding: 15px;'></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submitTask()">Отправить на проверку</v-btn>

        <v-btn @click="appStore.changeOpenCreateModal"> Выход</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-btn @click="appStore.changeOpenCreateModal">Открыть диалог</v-btn>
</template>

<script setup>
import { useAppStore } from "@/store/app.js";
import { ref } from "vue";
const appStore = useAppStore();
const task = ref("");

const submitTask = () => {
  console.log(task.value);
  appStore.changeOpenCreateModal();
};
</script>

<style lang="scss" scoped>
.compiler {
  padding: 5px;
}
</style>
