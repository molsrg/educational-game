<template>
  <v-dialog v-model="appStore.openCompilerModal">
    <v-card min-height='40vh' min-width='80vw' style='margin: auto; '>
      <div class="task">
        <TaskCompiler class="task-compiler" v-model:task-answer="taskAnswer" />
        <div class="task-container">
          <TaskInfo :task-info="taskInfo" />
          <TaskExamples :task-info="taskInfo" />
          <v-alert closable variant="tonal"  icon="mdi-fire-alert" v-if='compilerError.length > 0' :text="compilerError"></v-alert>
        </div>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submitTask()">Отправить на проверку</v-btn>
        <v-btn @click="appStore.changeOpenCreateModal">Выход</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>


</template>

<script setup>
import { ref, computed } from "vue";

import TaskInfo from "./Compiler/TaskInfo.vue";
import TaskExamples from "./Compiler/TaskExamples.vue";
import TaskCompiler from "./Compiler/TaskCompiler.vue";

import { useAppStore } from "@/store/app.js";
const appStore = useAppStore();

const taskInfo = computed(() => appStore.getTaskFromState)
const taskAnswer = ref("");
const compilerError = computed(() => appStore.getTaskError)

const submitTask = () => {
  appStore.submitTask(taskAnswer.value, taskInfo.value.id)
};
</script>

<style lang="scss" scoped>
.task {
  padding: 5px;
  display: flex;
}

.task-container {
  margin: 0 0 5px 5px;
  max-width: 50%;
}
.task-container * {
  margin-top: 10px;
}


</style>
