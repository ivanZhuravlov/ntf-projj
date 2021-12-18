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
  },
  getters: {
  	api: state => API,
  	token: state => state.token,
  	bearer: state => `Bearer ${state.token}`,
    type: state => state.type,
    isArtist: state => state.type === 'artist',
  },
  mutations: {
    setToken(state, token) {
 	    console.log({token})
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

        // Prevent router guard from async commit
        this.state.token = token;
        localStorage.setItem("token", token);
        commit('setToken', token);
	    } catch(e) {
		  	console.log(e)
    		throw new Error('Invalid email or password');
	    }
    },
    async register({ commit }, {email, password, type}) {
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
						"password": password,
						"type": type
					})
    		}).then((r) => r.json());

	    	if (null === token || !token) {
			  	throw new Error('Invalid token');
	    	}
        
        // Prevent router guard from async commit
        this.state.token = token;
        localStorage.setItem("token", token);
        commit('setToken', token);
	    } catch(e) {
		  	console.log(e)
    		throw new Error('Invalid email, password or type');
	    }
    },
    async logout({ commit }) {
      commit('setToken', null);
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
