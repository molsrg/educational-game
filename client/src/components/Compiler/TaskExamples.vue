<template>
  <v-card variant="tonal" >
    <h4 class="task-info-title">Примеры:</h4>

    <v-list lines="one">
      <v-list-item
      v-for="example in props.taskInfo.examples"
      :key="example.input"
      density='compact'
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-calendar-check-outline" size="small"></v-icon>
        </template>
        <p>Входные данные: [ {{ example.input }} ]</p>
      <p>Выходные данные: {{ example.output }}</p>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
const props = defineProps({
  taskInfo: Object,
});
</script>

<style lang="scss" scoped>
.task-info-title {
  margin-top: 10px;
  margin-left: 15px;
}
</style>
