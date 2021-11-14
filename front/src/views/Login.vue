<template>
  <div class="login space-y-8">
    <Header />
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Sign in</h2>
      
      <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div class="max-w-lg border rounded-lg mx-auto">
        <div class="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <label for="email" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Email</label>
            <input v-model='email' name="email" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label for="password" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Password</label>
            <input v-model='password' type='password' name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <button @click='login()' class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring focus:ring-2 ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
            Log in
          </button>
        </div>

        <div class="flex justify-center items-center bg-gray-100 p-4">
          <p class="text-gray-500 text-sm text-center">
            Don't have an account? 
            <router-link to='/register' class="text-blue-500 hover:text-blue-600 active:text-blue-700 transition duration-100">Sign up</router-link>
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
  name: 'Login',
  components: {
    Header,
    Footer,
  },
  data() {
  	return {
  		email: null,
  		password: null,
  		error: null,
  	}
  },
  methods: {
    login: function() {
      this.error = null;
      const email = this.email;
      const password = this.password;
      
      this.$store.dispatch("login", { email, password })
        .catch((e) => this.error = e.message)
        .then(() => {
          if (null === this.error) {
            this.$router.push({name: 'Dashboard'})
          }
        })
    }
  }

}
</script>
