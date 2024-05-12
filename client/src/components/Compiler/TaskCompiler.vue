<template>

  <textarea
    class="compiler-textarea"
    id="editor"
    v-model="taskAnswer"

  ></textarea>
</template>
<script setup>
import { onMounted, ref } from "vue";
import * as CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/mode/javascript/javascript.js";

let taskAnswer = ref("// Введи код здесь...\n");
onMounted(() => {
  CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    theme: "darcula",
    mode: "javascript",
    lineWrapping: true,
    // autofocus: true
  });
});
</script>
<style>
.compiler-textarea {
  width: 55%;
  height: 100%;
}
.CodeMirror {
  width: 55%;
  height: 100%;
}
</style>
