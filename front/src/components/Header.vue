<template>
  <header class="w-full flex justify-between items-center p-4 md:py-8">
    <a href="/" class="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
      <img class="w-auto h-12" src="../assets/logo.png">
    </a>

    <nav class="hidden lg:flex gap-12">
      <router-link to="/" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Home</router-link>
      <router-link to="/service" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Service</router-link>
      <router-link to="/art/123" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Art (example for dev)</router-link>
      <router-link to="/contact" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Contact (for dev)</router-link>
    </nav>

    <div v-if='!$store.getters.token' class="hidden lg:flex sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
      <router-link to="/login" class="inline-block text-gray-500 hover:text-blue-500 active:text-blue-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3">Sign in</router-link>
      <router-link to="/register" class="inline-block bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Sign up</router-link>
    </div>
    <div v-else class="hidden lg:flex sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
      <router-link to="/dashboard" class="inline-block bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Dashboard</router-link>
    </div>
    
    <div>
      <button type="button" @click="toggle()" class="inline-flex items-center lg:hidden bg-white text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <div v-if="showMenu" class="lg:hidden block absolute right-0 bg-white text-base py-2 list-none text-left shadow-lg mt-1 z-10">
          <router-link to="/about" class="text-sm py-2 pr-4 mx-8 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-700 hover:text-blue-500">
            About
          </router-link>
          <router-link v-if='$store.getters.token' to="/dashboard" class="text-sm py-2 pr-4 mx-8 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-700 hover:text-blue-500">
            Dashboard
          </router-link>
          <router-link to="/contact" class="text-sm py-2 pr-4 mx-8 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-700 hover:text-blue-500">
            Contact
          </router-link>
          <router-link v-if='!$store.getters.token' to="/login" class="text-sm py-2 pr-4 mx-8 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-700 hover:text-blue-500">
            Login
          </router-link>
          <router-link v-if='!$store.getters.token' to="/register" class="text-sm py-2 pr-4 mx-8 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-700 hover:text-blue-500">
            Register
          </router-link>
          <div class="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
      </div>
    </div>

  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        showMenu: false
      }
    },
    methods: {
      toggle() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>