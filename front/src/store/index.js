import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

const API = process.env.NODE_ENV === 'production' ? 'http://api.jenko.io' : 'http://localhost:4000';

export default new Vuex.Store({
  state: {
  	token: null,
		type: null,
		userId: null,
		search: null,
  },
  getters: {
  	api: state => API,
  	token: state => state.token,
  	bearer: state => `Bearer ${state.token}`,
  	userId: state => state.userId,
    type: state => state.type,
    isArtist: state => state.type === 'artist',
    search: state => state.search,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
	  	localStorage.setItem("token", token);
	  
      try {
        state.type = token ? jwt_decode(token).type : null;
        localStorage.setItem("type", state.type);
      } catch(e) {
        console.log(e)
      }
    },
  },
  actions: {
    async login({ commit }, {email, password}) {
    	try {
				const { token, userId } = await fetch(
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

				// Prevent router guard from async commit
				this.state.token = token;
				this.state.userId = userId;
				localStorage.setItem("token", token);
				commit('setToken', token);
	    } catch(e) {
				console.log(e)
				throw new Error('Invalid email or password');
	    }
    },
    async register({ commit }, {email, password, name}) {
    	try {
	    	const { token, userId } = await fetch(
	    		API + '/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email,
						password,
						name
					})
    		}).then((r) => r.json());

	    	if (null === token || !token) {
			  	throw new Error('Invalid token');
	    	}
        
        // Prevent router guard from async commit
        this.state.token = token;
        this.state.userId = userId;
        localStorage.setItem("token", token);
        commit('setToken', token);
	    } catch(e) {
		  	console.log(e)
    		throw new Error('Invalid email, password or type');
	    }
    },
    async resetPassword({ commit }) {
    	try {
				commit('setToken', null);
				this.state.userId = null;
	    } catch(e) {
		  	console.log(e)
    		throw new Error('Invalid email, password or type');
	    }
    },
    async logout({ commit }) {
      commit('setToken', null);
			this.state.userId = null;
    },
    async search({ commit }, {search}) {
			this.state.search = search;
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
