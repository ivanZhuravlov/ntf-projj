<template>
  <div class="login space-y-20">
    <Header />
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto space-y-8">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-light text-center mb-4 md:mb-8 flex items-center justify-center space-x-2">
        <svg class="text-orange w-8 h-8 border-2 border-orange rounded-full px-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <div>Oups !</div>
      </h2>
      <p class="text-gray-800 text-lg text-center">Forgot password ? please enter your email</p>
      <div class="max-w-lg mx-auto text-sm sm:text-base">
        <div class="flex flex-col gap-4 p-4 md:p-8 space-y-4">
          <div>
            <label for="email" class="inline-block text-gray-800 mb-2">Email</label>
            <input v-model='email' name="email" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <button @click='forgotPassword()' class="w-full select-none bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring focus:ring-2 ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
            Recover Password
          </button>

          <p class="text-gray-800 text-center">
            If you remember your password <router-link class="text-orange" to="/login">try it again</router-link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ForgotPassword',
  components: {
    Header,
    Footer,
  },
  data() {
  	return {
  		email: null,
  	}
  },
  methods: {
    forgotPassword() {
      const email = this.email;
      // TODO: route
    }
  }

}
</script>
