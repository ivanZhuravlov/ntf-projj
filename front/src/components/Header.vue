<template>
  <header class="w-full flex justify-between p-4 md:py-8">
    <a href="/" class="inline-flex items-center ml-3 text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
      <img class="w-auto h-12" src="../assets/logo.png">
    </a>

<<<<<<< Updated upstream
    <nav class="hidden lg:flex gap-12">
      <router-link to="/" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Home</router-link>
      <router-link to="/service" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Service</router-link>
      <router-link to="/art/123" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Art (example for dev)</router-link>
      <router-link to="/contact" class="text-gray-600 hover:text-blue-500 active:text-blue-700 text-lg font-semibold transition duration-100">Contact (for dev)</router-link>
    </nav>
=======
    <div class="flex gap-10">
      <div v-if='!$store.getters.token' class="hidden lg:flex leading-none sm:flex-row sm:justify-center lg:gap-2.5">
        <router-link to="/login" class="filter drop-shadow-lg inline-block text-black hover:bg-black hover:text-white active:text-black text-sm md:text-base font-semibold text-center rounded-full border border-gray-800 outline-none transition duration-100 px-4 py-3">Sign in</router-link>
        <router-link to="/register" class="filter drop-shadow-lg inline-block bg-black text-white text-sm md:text-base font-semibold text-center  hover:bg-white rounded-full border border-gray-800 hover:text-black transition duration-100 px-8 py-3">Sign up</router-link>
      </div>

      <div v-if='$store.getters.token'>  
        <router-link to="/dashboard" class="xs:hidden md:filter drop-shadow-lg inline-block text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white hover:from-pink-500 hover:to-yellow-500 active:text-black text-base font-mono text-center rounded-full outline-none transition duration-100 py-3 px-6">Dashboard</router-link>
     </div>
>>>>>>> Stashed changes

    <div>
      <router-link to="/dashboard" class="sm:hidden md:hidden lg:hidden inline-flex mr-3 items-center bg-white text-black active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
<<<<<<< Updated upstream
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
=======
      </router-link>
>>>>>>> Stashed changes
    </div>
    <button type="button" @click="toggle()" class="inline-flex mr-3 items-center bg-white text-black active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
    <div v-if="showMenu" class="absolute mt-14 right-5 bg-white text-base list-none text-center rounded border border-gray-100 filter drop-shadow-2xl">
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
      <router-link v-if='$store.getters.token' to="/logout" class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-gray-700 text-white hover:bg-gray-300 rounded">
        Logout
      </router-link>
    </div>
  </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
<<<<<<< Updated upstream
        showMenu: false
      }
    },
    methods: {
      toggle() {
        this.showMenu = !this.showMenu;
=======
        showMenu: false,
      }
    },
    methods: { 
      toggle() {
        this.showMenu = !this.showMenu;
      },
      logout: function() {
        this.$store.dispatch("logout")
        .catch((e) => this.error = e.message)
        .then(() => {
          if (null === this.error) {
            this.$router.push({name: '/'})
          }
        })
>>>>>>> Stashed changes
      }
    }
  };
</script>