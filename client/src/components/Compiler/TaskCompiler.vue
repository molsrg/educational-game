<template>
    <textarea class="compiler-textarea" id="editor" ref="textarea"></textarea>

</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import * as CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/mode/javascript/javascript.js";

const props = defineProps(["taskAnswer"]);
const emits = defineEmits(["update:taskAnswer"]);
const textarea = ref(null);

let editor;
onMounted(() => {
  editor = CodeMirror.fromTextArea(textarea.value, {
    lineNumbers: true,
    theme: "darcula",
    mode: "javascript",
    lineWrapping: true,
    value: props.taskAnswer,
  });

  editor.on("change", () => {
    emits("update:taskAnswer", editor.getValue());
  });
});

watch(
  () => props.taskAnswer,
  (newValue) => {
    const cursor = editor.getCursor();
    editor.setValue(newValue);
    editor.setCursor(cursor);
  },
);

onBeforeUnmount(() => {
  editor.toTextArea();
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
