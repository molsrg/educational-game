// Composables
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeApp.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
