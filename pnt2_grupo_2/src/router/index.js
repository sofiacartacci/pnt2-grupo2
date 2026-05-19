import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

import HomeView from "../view/HomeView.vue";
import RegistroView from "../view/RegistroView.vue";
import Peliculas from "../view/Peliculas.vue";
import butacas from "../view/butacas.vue";
import Integrante4 from "../view/cines.vue";

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
    path: "/Peliculas",
    name: "Peliculas",
    component: Peliculas,
  },
  {
    path: "/butacas",
    name: "butacas",
    component: butacas,
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
