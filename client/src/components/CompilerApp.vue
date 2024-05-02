<template>
  <v-dialog v-model="appStore.openCompilerModal" >
    <v-card>
      <div class="task">
        <TaskCompiler class="task-compiler" v-model:task-answer="taskAnswer" />
        <div class="task-container">
          <TaskInfo class="task-info task-container-item" :task-info="taskInfo" />

          <TaskExamples class="task-examples task-container-item" :task-info="taskInfo" />
        </div>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submitTask()">Отправить на проверку</v-btn>

        <v-btn @click="appStore.changeOpenCreateModal"> Выход</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import TaskInfo from "./Compiler/TaskInfo.vue";
import TaskExamples from "./Compiler/TaskExamples.vue";
import TaskCompiler from "./Compiler/TaskCompiler.vue";

import { useAppStore } from "@/store/app.js";
const appStore = useAppStore();

const taskAnswer = ref("");
const taskInfo = {
  title: "Напишите программу, которая находит наибольший элемент в массиве",
  examples: [
    {
      input: "1 2 3 4 5",
      output: "5",
    },
    {
      input: "5 4 3 2 1",
      output: "5",
    },
    {
      input: "-1 -2 -3 -4 -5",
      output: "-1",
    },
  ],
  requirements: [
    "Программа должна принимать на вход массив целых чисел, разделенных пробелом.",
    "Программа должна находить наибольший элемент в массиве и выводить его на экран.",
    "Программа должна работать корректно со всеми входными данными, указанными в примерах.",
    "Программа должна быть написана на языке программирования, указанном в задании (если он указан).",
  ],
  constraints: [
    "Массив может содержать от 1 до 100 элементов.",
    "Элементы массива могут быть целыми числами от -1000 до 1000.",
    "Время выполнения программы не должно превышать 1 секунду.",
    "Используемая память не должна превышать 64 Мб.",
  ],
};

const submitTask = () => {
  axios
    .post("http://localhost:5000/tasks/1", {
      code: taskAnswer.value,
    })
    .then((response) => {
      console.log(response);
      appStore.changeOpenCreateModal();
    })
    .catch((error) => {
      console.log(error);
    });
  // Для Сереги: нужно чтобы ошибка появлялась у пользователя на экране. Она обычно лежит в response.data.error
};
</script>

<style lang="scss" scoped>
.task {
  padding: 5px;
  display: flex;
  // background-color: #fff;
}

.task-compiler {
  width: 50%;
  // background-color: red;
}

.task-container {
  width: 50%;
  padding: 0px 5px;
  // background-color: blue;
}

.task-container-item {
  margin-bottom: 5px;
}

</style>
