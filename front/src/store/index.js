import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const API = process.env.NODE_ENV === 'production' ? 'https://api.jenko.io' : 'http://localhost:5000';

export default new Vuex.Store({
  state: {
  	token: null,
  },
  getters: {
  	api: state => API,
  	token: state => null !== state.token ? state.token.token : null,
  	bearer: state => `Bearer ${state.token.token}`,
},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, {email, password}) {
    	try {
	    	const { token } = await fetch(
	    		API + '/login',
	    		{
	    			method: 'POST',
	    			headers: {
	    				'Content-Type': 'application/json'
	    			},
	    			body: JSON.stringify({
						"email": email,
						"password": password
					})
    		}).then((r) => r.json());

	    	if (null === token || !token) {
	    		throw new Error('Invalid token');
	    	}
	        
	        this.state.token = token;
	        localStorage.setItem("token", token);
	        commit('setToken', {token});
	    } catch(e) {
    		throw new Error('Invalid email or password');
	    }
    },
    async register({ commit }, {email, password}) {
    	try {
	    	const { token } = await fetch(
	    		API + '/register',
	    		{
	    			method: 'POST',
	    			headers: {
	    				'Content-Type': 'application/json'
	    			},
	    			body: JSON.stringify({
						"email": email,
						"password": password
					})
    		}).then((r) => r.json());

	    	if (null === token || !token) {
	    		throw new Error('Invalid token');
	    	}
	        
	        this.state.token = token;
	        localStorage.setItem("token", token);
	        commit('setToken', {token});
	    } catch(e) {
    		throw new Error('Invalid email or password');
	    }
    },
    async logout({ commit }) {
        this.state.token = null;
        localStorage.setItem("token", null);
        commit('setToken', {token: null});
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
