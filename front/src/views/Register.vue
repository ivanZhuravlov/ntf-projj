<template>
  <div class="register">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Register</h2>

      <form class="max-w-lg border rounded-lg mx-auto">
        <div class="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <label for="email" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Email</label>
            <input required="true" name="email" class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label for="password" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Password</label>
            <input required="true" name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="password" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Password again</label>
            <input required="true" name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <button class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
            Register
          </button>
        </div>

        <div class="flex justify-center items-center bg-gray-100 p-4">
          <p class="text-gray-500 text-sm text-center">
            Have already an account? 
            <router-link to='/login' class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100">Login</router-link>
          </p>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'Register',
  components: {
    Footer,
  }
}
</script>
