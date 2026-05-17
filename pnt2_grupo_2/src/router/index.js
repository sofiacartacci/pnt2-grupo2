import { createRouter, createWebHistory } from "vue-router";

import RegistroView from "../view/RegistroView.vue";
import Integrante2 from "../view/Integrante2.vue";
import Integrante3 from "../view/Integrante3.vue";
import Integrante4 from "../view/Integrante4.vue";

const routes = [
  {
    path: "/",
    component: Integrante2,
  },
  {
    path: "/integrante2",
    name: "Integrante2",
    component: Integrante2,
  },
  {
    path: "/integrante3",
    name: "Integrante3",
    component: Integrante3,
    meta: {
      requiereLogin: true,
    },
  },
  {
    path: "/integrante4",
    name: "Integrante4",
    component: Integrante4,
  },
  {
    path: "/registro",
    name: "Registro",
    component: RegistroView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiereLogin && !token) {
    next({
      path: "/",
      query: {
        login: "true",
      },
    });
  } else {
    next();
  }
});

export default router;
