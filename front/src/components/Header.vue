<template>
  <header class="w-full flex justify-between items-center p-4 md:py-8 mx-8 mb-10">
    <a href="/" class="inline-flex items-center lg:ml-20 md:ml-20 " aria-label="logo">
      <img class="w-auto h-12" src="../assets/logo.png">
    </a>

    <nav class="hidden lg:flex gap-12 text-sm font-semibold ">
      <router-link to="/about" class="text-gray-600 tracking-widest  uppercase hover:text-black active:text-black transition duration-100">About</router-link>
      <router-link to="/service" class="text-gray-600 tracking-widest uppercase hover:text-black active:text-black text-md transition duration-100">Service</router-link>
      <router-link to="/art/123" class="text-gray-600 tracking-widest uppercase hover:text-black active:text-black text-md transition duration-100">Art (example for dev)</router-link>
      <router-link to="/contact" class="text-gray-600 tracking-widest uppercase hover:text-black active:text-black text-md transition duration-100">Contact </router-link>
    </nav>

    <div v-if="authenticated === null" class="hidden lg:flex sm:flex-row sm:justify-center mr-20 lg:justify-start gap-2.5 mr-8">
      <router-link to="/login" class="inline-block text-gray-500 hover:text-gray-800 active:text-blue-600 text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-4 py-3">Sign in</router-link>

      <router-link to="/register" class="inline-block bg-gray-800 hover:bg-gray-600 active:bg-blue-700 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">Sign up</router-link>
    </div>
    <div v-else class="hidden lg:flex sm:flex-row sm:justify-center mr-20 lg:justify-start gao-2.5 mr-8">
      <router-link to="/dashboard" class="inline-block bg-gray-800 hover:bg-gray-600 active:bg-blue-700 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">Dashboard</router-link>
      <router-link @click="logout()" class="inline-block text-gray-500 hover:text-gray-800 active:text-blue-600 text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-4 py-3">Logout</router-link>
    </div>

    <!-- Responsive menu starts -->
    <div class="grid grid-cols-2 mr-8">
    <div>
      <button type="button" @click="toggleProfileMenu()" class="inline-flex items-center lg:hidden bg-white text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
      <div v-if="showProfileMenu" class="lg:hidden block absolute right-10 w-30 bg-white text-base py-2 list-none text-left shadow-xl rounded">
        <div v-if="authenticated === null">
          <router-link to="/login" class="text-sm py-2 px-6 mt-2 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          Sign in
          </router-link>
          <router-link to="/register" class="text-sm py-2 px-6 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          Sign up
          </router-link>
        </div>
        <div v-else>
          <router-link  to="/dashboard" class="text-sm py-2 px-6 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          Dashboard
          </router-link>
        <div class="h-0 border border-solid border-t-0 border-gray-300 opacity-25"></div>
          <router-link @click="logout()" class="text-sm py-2 px-6 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          Logout
          </router-link>
        </div>          
      </div>
    </div>
    
    <div>
      <button type="button" @click="toggle()" class="inline-flex items-center lg:hidden bg-white text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <div v-if="showMenu" class="lg:hidden block absolute right-0 w-32 bg-white text-base py-2 list-none text-left shadow-xl rounded">
        <router-link to="/service" class="text-sm py-2 px-6 mt-2 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          Service
        </router-link>
        <router-link to="/art/123" class="text-sm py-2 px-6 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-hover-400">
          Art
        </router-link>
        <router-link to="/contact" class="text-sm py-2 px-6 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          Contact
        </router-link>
        <div class="h-0 border border-solid border-t-0 border-gray-300 opacity-25"></div>
        <router-link to="/about" class="text-sm py-2 px-6 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-800 hover:text-gray-400">
          About
        </router-link>
      </div>
    </div>
    <!-- Responsive menu ends -->
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        showMenu: false,
        showProfileMenu: false
      }
    },
    computed: { 
      authenticated() { return this.$store.getters.token }
    },
    methods: { 
      toggle() {
        this.showMenu = !this.showMenu;
        this.showProfileMenu = false;
      },
      toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
        this.showMenu = false;
      },
      logout: function() {
        this.$store.dispatch("logout")
        .catch((e) => this.error = e.message)
        .then(() => {
          if (null === this.error) {
            this.$router.push({name: '/'})
          }
        })
      }
    }
  };
</script>