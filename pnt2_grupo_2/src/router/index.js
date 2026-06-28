import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";

import HomeView from "../view/HomeView.vue";
import RegistroView from "../view/RegistroView.vue";
import Peliculas from "../view/Peliculas.vue";
import butacas from "../view/butacas.vue";
import Cines from "../view/cines.vue";
import AdminView from "../view/AdminView.vue";
import SobreNosotros from "@/view/SobreNosotros.vue";
import PoliticasPrivacidad from "@/view/PoliticasPrivacidad.vue";
import TerminosCondiciones from "@/view/TerminosCondiciones.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/cartelera/:id",
    name: "pelicula-detalle",
    component: () => import("../view/PeliculaDetalleView.vue"),
  },
  {
    path: "/Peliculas",
    name: "Peliculas",
    component: Peliculas,
  },
  {
    path: "/cines",
    name: "Cines",
    component: Cines,
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
    path: "/registro",
    name: "Registro",
    component: RegistroView,
  },
  {
    path: "/sobre-nosotros",
    name: "SobreNosotros",
    component: SobreNosotros,
  },
  {
    path: "/politicas-privacidad",
    name: "PoliticasPrivacidad",
    component: PoliticasPrivacidad,
  },
  {
    path: "/terminos-condiciones",
    name: "TerminosCondiciones",
    component: TerminosCondiciones,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: {
      requiereLogin: true,
      requiereAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
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
