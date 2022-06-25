<template>
  <div class="login space-y-20">
    <Header />
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-light text-center mb-4 md:mb-8">Sign in</h2>
      
      <div class="flex justify-center items-center">
        <p class="text-gray-600 text-center">
          Not yes Registered?
          <router-link to='/login' class="text-yellow-500 hover:text-yellow-600 transition duration-100">Try it for free</router-link>
        </p>
      </div>

      <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div class="max-w-lg mx-auto text-sm sm:text-base">
        <div class="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <label for="email" class="inline-block text-gray-800 mb-2">Email</label>
            <input v-model='email' name="email" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <div class="flex justify-between">
              <label for="password" class="inline-block text-gray-800 mb-2">Password</label>
              <router-link to="/reset-password" class="text-blue-600 transition duration-100">Forgot password?</router-link>
            </div>
            <input v-model='password' type='password' name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <button @click='login()' class="w-full bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring focus:ring-2 ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
            Log in
          </button>
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
