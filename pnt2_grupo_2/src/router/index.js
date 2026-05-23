import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

import HomeView from "../view/HomeView.vue";
import RegistroView from "../view/RegistroView.vue";
import Peliculas from "../view/Peliculas.vue";
import butacas from "../view/butacas.vue";
import Integrante4 from "../view/cines.vue";
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
    path: "/cines",
    name: "Cines",
    component: Integrante4,
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