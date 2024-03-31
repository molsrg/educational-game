<template>
  <v-dialog v-model="appStore.openCompilerModal" width="600">
    <v-card
      class="compiler"
      title="Вот твоё задание"
      subtitle="Прочитай задание и вставь код"
      text="Напишите функцию, возвращающую минимальное и максимальное значение в массиве. Наверняка вы этого еще не делали!"
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
import axios from 'axios';
const appStore = useAppStore();
const task = ref("");

const submitTask = () => {
  console.log(task.value);
  axios.post('http://localhost:5000/tasks/1', {
    code: task.value
  })
  .then(function (response) {
    console.log(response);
    appStore.changeOpenCreateModal();
  })
  .catch(function (error) {
    console.log(error);
  });
  // Для Сереги: нужно чтобы ошибка появлялась у пользователя на экране. Она обычно лежит в response.data.error
};
</script>

<style lang="scss" scoped>
.compiler {
  padding: 5px;
}
</style>
