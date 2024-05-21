// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    openCompilerModal: false,
    currentTask: {},
    completedTask: [],
  }),
  getters: {
    isOpenCreateModal(state) {
      return state.openCompilerModal;
    },
    getTaskFromState(state) {
      return state.currentTask;
    },
  },
  actions: {
    changeOpenCreateModal() {
      this.openCompilerModal = !this.openCompilerModal;
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
      axios
        .post("http://localhost:5000/tasks/runCode", {
          code: taskAnswer,
          taskId: taskID
        })
        .then((response) => {
          if(response.data.success) {
            this.completedTask.push(taskID)
          }
          this.changeOpenCreateModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
