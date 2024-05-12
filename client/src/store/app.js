// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    openCompilerModal: false,
    currentTask: {}
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
      // Логика запроса на сервер за заданием
      const response = {
        title: "Напишите функцию для нахождения максимального из трех чисел",
        examples: [
          {
            input: "3 5 1",
            output: "5",
          },
          {
            input: "-2 0 2",
            output: "2",
          },
          {
            input: "100 -1000 500",
            output: "500",
          },
        ],
        requirements: [
          "Функция должна принимать три целых числа, разделенных пробелом.",
          "Функция должна возвращать наибольшее из трех чисел.",
          "Функция должна корректно работать со всеми предоставленными примерами входных данных.",
        ],
        constraints: [
          "Значения чисел могут быть от -1000 до 1000.",
          "Время выполнения функции не должно превышать 1 секунду.",
        ],
      };

      this.currentTask = response;
    },
    submitTask(taskAnswer) {
      axios
        .post("http://localhost:5000/tasks/1", {
          code: taskAnswer.value,
        })
        .then((response) => {
          console.log(response);
          this.changeOpenCreateModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
