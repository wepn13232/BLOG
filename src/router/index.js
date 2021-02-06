import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Essay from "../views/Essay";
import EssayLists from "@/views/EssayLists";
import SearchLists from "@/views/SearchLists";

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

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
	{
		path: '/SearchLists',
		name: 'SearchLists',
		component: SearchLists
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
