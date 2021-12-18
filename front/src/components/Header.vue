<template>
  <header class="w-full flex justify-between p-4 md:py-8 xs:justify-between no-print">
    <a href="/" class="inline-flex items-center ml-3 text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
      <img class="w-auto h-12" src="../assets/logo.png">
    </a>
    
    <div class="flex gap-10 xs:gap-0">
      <div v-if='!$store.getters.token' class="xs:hidden lg:flex leading-none sm:flex-row sm:justify-center gap-2.5">
        <router-link to="/login" class="filter drop-shadow-lg inline-block text-black active:text-black text-sm md:text-base font-semibold text-center rounded-full border border-gray-800 px-4 py-3 mr-2 hover:text-gray-700 hover:transition ease-in-out transform hover:scale-105">Sign in</router-link>
        <router-link to="/register" class="filter drop-shadow-lg inline-block bg-black text-white text-sm md:text-base font-semibold text-center rounded-full px-8 py-3 ml-1 hover:transition ease-out transform hover:scale-105 hover:bg-gray-700">Sign up</router-link>
      </div>

      <div v-if='$store.getters.token'>  
        <router-link to="/dashboard" class="xs:hidden md:filter drop-shadow-lg inline-block text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white hover:from-pink-500 hover:to-yellow-500 active:text-black text-base font-mono text-center rounded-full outline-none transition duration-100 py-3 px-6">Dashboard</router-link>
        <router-link to="/dashboard" class="sm:hidden md:hidden lg:hidden inline-flex mr-1 mt-1 bg-white text-black active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>       
        </router-link>
      </div>

      <button type="button" @click="toggle()" class="inline-flex mr-3 items-center bg-white text-black active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>

      <div v-if="showMenu" class="absolute mt-14 right-5 bg-white text-base list-none text-center rounded border border-gray-100 filter drop-shadow-2xl space-y-2">
        <router-link  v-if='!$store.getters.token' to="/login" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded md:hidden lg:hidden">
          Login 
        </router-link>
        <router-link  v-if='!$store.getters.token' to="/register" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded md:hidden lg:hidden">
          Register
        </router-link>
        <router-link to="/about" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded">
          About 
        </router-link>
        <router-link to="/contact" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded">
          Contact
        </router-link>
        <router-link to="/service" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded">
          Service
        </router-link>
        <button v-if='$store.getters.token' @click="logout()" to="/logout" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-gray-700 text-white hover:bg-gray-300 rounded">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        showMenu: false,
        error: null,
      }
    },
    methods: { 
      toggle() {
        this.showMenu = !this.showMenu;
      },

      
      logout: function() {
     
        this.$store.dispatch("logout");
        this.$router.push('/');
          
      
      }
    }
  };
</script>