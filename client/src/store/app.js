// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    openCompilerModal: false,
    completeTaskModal: false,
    currentTask: {},
    completedTask: [],
    taskError: ''
  }),
  getters: {
    isOpenCreateModal(state) {
      return state.openCompilerModal;
    },
    isCompleteTaskModal(state) {
      return state.completeTaskModal;
    },
    getTaskFromState(state) {
      return state.currentTask;
    },
    getTaskError(state){
      return state.taskError
    },
    getCompletedTask(state) {
      return state.completedTask
    }
  },
  actions: {
    changeOpenCreateModal() {
      this.openCompilerModal = !this.openCompilerModal;
    },
    changeCompleteTaskModal() {
      this.completeTaskModal = !this.completeTaskModal;
    },
    getTaskFromServer(taskID) {
      axios
        .post("http://localhost:5000/tasks/getTests", {
          testId: taskID,
        })
        .then((response) => {
          this.currentTask = response.data.tests;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitTask(taskAnswer, taskID) {
      this.taskError = ''
      let answer = `{` + taskAnswer + `}`;
      axios
        .post("http://localhost:5000/tasks/runCode", {
          code: answer,
          taskId: taskID
        })
        .then((response) => {
          if(response.data.success) {
            this.completedTask.push(taskID)
            this.changeOpenCreateModal();
            this.changeCompleteTaskModal()
          }
          else
          {
            this.taskError = "Тесты не пройдены, попробуйте ещё раз!"
          }

        })
        .catch((error) => {
          this.taskError = error.response.data.error
        });
    },
  },
});
