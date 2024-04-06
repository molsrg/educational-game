<template>
  <v-card width="45vw" class="task-info">
    <h3>Примеры:</h3>
    <v-list-item
      v-for="example in props.taskInfo.examples"
      :key="example.input"
    >
      <p>Входные данные: {{ example.input }}</p>
      <p>Выходные данные: {{ example.output }}</p>
    </v-list-item>

    <h3>Требования:</h3>

    <v-list-item
      v-for="requirement in props.taskInfo.requirements"
      :key="requirement"
    >
      {{ requirement }}
    </v-list-item>

    <h3>Ограничения:</h3>

    <v-list-item
      v-for="constraint in props.taskInfo.constraints"
      :key="constraint"
    >
      {{ constraint }}
    </v-list-item>
  </v-card>
</template>

<script setup>
const props = defineProps({
  taskInfo: Object,
});
</script>

<style lang="scss" scoped>
.task-info {
  padding: 0 10px;
  margin: 0 10px;
}
</style>
