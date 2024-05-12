<template>
  <v-card  title="Задание" :subtitle="taskInfo.title">
    <h4 class="task-info-title">Требования:</h4>
    <v-list lines="one">
      <v-list-item
        v-for="requirement in props.taskInfo.requirements"
        :key="requirement"
        density='compact'
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-information-outline" size="small"></v-icon>
        </template>
        {{ requirement }}
      </v-list-item>
    </v-list>


    <h4 class="task-info-title">Ограничения:</h4>
    <v-list lines="one">
      <v-list-item
        v-for="constraint in props.taskInfo.constraints"
        :key="constraint"
        density='compact'
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-alert-outline" size="small"></v-icon>
        </template>
        {{ constraint }}
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
  margin-left: 15px;
}
</style>
