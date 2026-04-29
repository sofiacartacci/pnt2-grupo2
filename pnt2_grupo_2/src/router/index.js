import {createRouter, createWebHistory} from 'vue-router'
import Integrante1 from '../view/Integrante1.vue'
import Integrante2 from '../view/Integrante2.vue'
import Integrante3 from '../view/Integrante3.vue'
import Integrante4 from '../view/Integrante4.vue'   

const routes = [
  {
    path: '/integrante1',
    name: 'Integrante1',
    component: Integrante1
  },
  {
    path: '/integrante2',
    name: 'Integrante2',
    component: Integrante2
  },
  {
    path: '/integrante3',
    name: 'Integrante3',
    component: Integrante3
  },
  {
    path: '/integrante4',
    name: 'Integrante4',
    component: Integrante4
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router