import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Essay from "../views/Essay";
import EssayLists from "@/views/EssayLists";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Essay',
    name: 'Essay',
    component: Essay
  },
	{
		path: '/EssayLists',
		name: 'EssayLists',
		component: EssayLists
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
