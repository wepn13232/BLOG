import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		active: "0"
	},
	mutations: {
		setActive(state, val) {
			this.state.active = val;
		}
	},
	actions: {},
	modules: {}
})
