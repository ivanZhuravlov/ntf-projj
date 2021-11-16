<template>
  <header class="w-full flex justify-between items-center p-4 md:py-8">
    <a href="/" class="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
      <!-- TODO -->
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

    <!-- TODO Responsive menu -->
    <button type="button" class="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </header>
</template>

<script>
  export default {
    name: "Header",
  };
</script>