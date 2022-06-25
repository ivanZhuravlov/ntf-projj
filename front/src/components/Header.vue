<template>
  <header
    class="w-full flex justify-between place-items-center h-20 px-10 bg-headerWhite filter drop-shadow-lg md:py-8 xs:justify-between xs:px-3 no-print">

    <!-- Mobile menu icon - start -->
    <div class="md:hidden lg:hidden">
      <button type="button" @click="toggleSecondMenu()"
        class="hover:transition ease-out duration-200 transform hover:scale-110 w-14 h-14">
        <img class="w-14 h-14 xs:h-10" src="../assets/icons/coolicon.svg">
      </button>
    </div>
    <!-- Mobile menu icon - end -->

    <!--  Jenko icon - start -->
    <router-link to="/" class="inline-flex " aria-label="logo">
      <img class="w-14 h-14 xs:h-10" src="../assets/icons/logo.svg">
    </router-link>
    <!--  Jenko icon - end -->

    <!--  Menu - start -->
    
    <div class="flex justify-between items-center p-4 space-x-6 text-darkGray sm:hidden xs:hidden"  v-if='isConnected && onDashboard'>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input
          type="text" v-model="search" placeholder="Search" @input="runSearch"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2.5"
        >
      </div>
      <router-link to="/artworks" class="font-medium text-base uppercase hover:text-gray-900">Artworks</router-link>
      <router-link to="/portfolio" class="font-medium text-base uppercase hover:text-gray-900">Portfolio</router-link>
      <router-link to="/biography" class="font-medium text-base uppercase hover:text-gray-900">Biography</router-link>
      <router-link to="/exhibitions" class="font-medium text-base uppercase hover:text-gray-900">Exhibitions</router-link>
    </div>
    <div class="flex justify-between items-center p-4 space-x-6 text-darkGray sm:hidden xs:hidden" v-else>
      <router-link to="/features" class="font-medium text-base uppercase hover:text-gray-900">Features</router-link>
      <router-link to="/pricing" class="font-medium text-base uppercase hover:text-gray-900">Pricing</router-link>
      <router-link to="/community" class="font-medium text-base uppercase hover:text-gray-900">Community</router-link>
    </div>
    <!--  Menu - end -->

    <!-- Hamburger menu icon - start -->
    <div>
      <button type="button" @click="toggle()" class="hover:transition ease-out duration-200 transform hover:scale-110">
        <img class="w-14 h-14 xs:h-10" src="../assets/icons/menu.svg">
      </button>
    </div>
    <!-- Hamburger menu icon - end -->

    <!--  Mobile Dropdown menu - start -->
    <!-- TODO: fix all this mess -->
    <div v-if="showSecondMenu"
      class="left-2 absolute mt-48 bg-white text-base list-none text-center rounded border border-gray-100 filter drop-shadow-2xl space-y-2">
      <router-link to="/features"
        class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded md:hidden lg:hidden">
        Features
      </router-link>
      <router-link to="/pricing"
        class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded md:hidden lg:hidden">
        Pricing
      </router-link>
      <router-link to="/communities"
        class="text-sm py-2 px-10 font-semibold block w-full whitespace-nowrap bg-transparent text-black hover:bg-gray-300 rounded">
        Communities
      </router-link>
    </div>
    <!--  Mobile Dropdown menu - end -->

    <!--  Dashboard menu - start -->
    <!-- <div class="flex gap-10 xs:gap-0 ">
      <div v-if='!isConnected' class="items-center xs:hidden gap-2.5">
        <router-link to="/login" class="filter drop-shadow-lg inline-block text-black active:text-black text-sm md:text-base font-semibold text-center rounded border border-gray-800 px-4 py-3 mr-2 w-40 hover:text-gray-700 hover:transition ease-in-out transform hover:scale-105">Sign in</router-link>
        <router-link to="/register" class=" filter drop-shadow-lg inline-block bg-orange text-white text-sm md:text-base font-semibold text-center rounded px-8 py-3 ml-1 w-40 hover:transition ease-out transform hover:scale-105 hover:bg-gray-700">Sign up</router-link>
      </div>

      <div v-if='isConnected'>  
        <router-link to="/dashboard" class="xs:hidden md:filter drop-shadow-lg inline-block text-white bg-orange active:text-black text-base font-mono text-center rounded-full outline-none transition duration-100 py-3 px-6">Dashboard</router-link>
        <router-link to="/dashboard" class="sm:hidden md:hidden lg:hidden inline-flex mr-1 mt-1 bg-white text-black active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2 hover:transition ease-out duration-200 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>       
        </router-link>
      </div> -->
    <!--  Dashboard menu - end -->

    <!--  Dropdown menu - start -->
    <div v-if="showMenu" class="absolute mt-64 right-5 bg-white text-base list-none text-center rounded border border-gray-100 filter drop-shadow-2xl space-y-2">
      <router-link v-if='!isConnected' to="/login" class="link pt-4">
        <svg class="w-4 h-4 rounded-full border border-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <div class="ml-2">Get Started</div>
      </router-link>

      <router-link to="/dashboard" class="link">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
        <div class="ml-2">Dashboard</div>
      </router-link>
      
      <router-link to="/profile" class="link">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        <div class="ml-2">Settings</div>
      </router-link>
      
      <button v-if='isConnected' @click="logout()" to="/logout" class="link">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <div class="ml-2">Logout</div>
      </button>
      <hr class="">
      <router-link to="/about" class="link">
        <img class="w-4 h-4" src="../assets/icons/logo.svg" alt="">
        <div class="ml-2">About</div>
      </router-link>
    </div>
    <!--  Dropdown menu - end -->
  </header>
</template>

<style>
  .link {
    @apply text-sm py-2 pl-4 pr-8 font-semibold w-full whitespace-nowrap bg-transparent text-gray-800 hover:bg-gray-100 hover:bg-opacity-75 flex items-center;
  }
</style>

<script>
  export default {
    name: "Header",
    emits: ['searchUpdated'],
    data() {
      return {
        showMenu: false,
        error: null,
        showSecondMenu: false,
        search: '',
      }
    },
    computed: {
      isConnected() {
        return this.$store.getters.token;
      },
      onDashboard() {
        return this.$route.name === 'Dashboard';
      }
    },
    methods: {
      toggle() {
        this.showMenu = !this.showMenu;
      },
      toggleSecondMenu() {
        this.showSecondMenu = !this.showSecondMenu;
      },
      logout () {
        this.$store.dispatch("logout");
        this.$router.push('/');
      },
      runSearch() {
        const previousSearch = this.$store.getters.search;
        this.$store.dispatch("search", { search: this.search });
        
        if(this.search !== previousSearch) {
          this.$emit('searchUpdated', { search: this.search });
        }
      }
    }
  };
</script>
