import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

import HomeView from "../view/HomeView.vue";
import RegistroView from "../view/RegistroView.vue";
import Integrante2 from "../view/Integrante2.vue";
import Integrante3 from "../view/Integrante3.vue";
import Integrante4 from "../view/Integrante4.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path:"/cartelera/:id",
    name:"pelicula-detalle",
    component:()=>import("../view/PeliculaDetalleView.vue")
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
    meta: {
      requiereLogin: true,
      requiereAdmin: true,
    },
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

router.beforeEach((to, from) => {
  const auth = useAuthStore();

  if (to.meta.requiereLogin && !auth.isLoggedIn) {
    return {
      path: "/",
      query: { login: "true" },
    };
  }

  if (to.meta.requiereAdmin && !auth.isAdmin) {
    return { path: "/" };
  }

  return true;
});

export default router;
