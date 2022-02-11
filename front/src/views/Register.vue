<template>
  <div class="register space-y-8">
    <Header />
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Register</h2>
      
      <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div class="max-w-lg border rounded-lg mx-auto">
        <div class="flex flex-col gap-4 p-4 md:p-8">

          <div>
            <label for="email" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Email</label>
            <input v-model='email' required type="email" name="email" class="w-full bg-gray-50 text-gray-800 border focus:ring focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label for="password" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Password</label>
            <input v-model='password' type='password' required name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="passwordRepeat" class="inline-block text-gray-800 text-sm sm:text-base mb-2">Password again</label>
            <input v-model='passwordRepeat' type='password' required name="passwordRepeat" class="w-full bg-gray-50 text-gray-800 border focus:ring focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

           <p class="text-sm sm:text-base text-left auto">I register a JENKO Accound as:*</p>
          <div class="grid-cols-1 md:grid grid-cols-4 lg:grid grid-cols-4 gap-2">
            <div>
              <input v-model='type' type="radio" id="artist" checked value="artist">
                <label for="artist" class="text-sm mx-3">Artist</label>
            </div>
            <div>
              <input v-model='type' type="radio" id="gallery" name="type" value="gallery">
                <label for="gallery" class="text-sm mx-3">Gallery</label>
            </div>
            <div>
              <input v-model='type' type="radio" id="collector" name="type" value="collector">
                <label for="collector" class="text-sm mx-3">Collector</label>
            </div>
            <div>
              <input v-model='type' type="radio" id="beneficiary" name="type" value="beneficiary">
                <label for="beneficiary" class="text-sm mx-3">Beneficiary</label>
            </div>
          </div>
          <hr class="my-4">
          <div class="flex items-start mb-6 px-6">
            <div class="flex items-center h-5">
              <input v-model="terms" required id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded">
            </div>
            <div class="text-sm ml-3">
              <label for="terms" class="font-sm">
                I have read, understood and approve the terms and conditions specified in <a class="text-blue-500 underline" href="/about#terms" target="_blank">JENKO Services Agreement</a>
              </label>
            </div>
          </div>

          <button @click='register()' class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
            Register
          </button>
        </div>

        <div class="flex justify-center items-center bg-gray-100 p-4">
          <p class="text-gray-500 text-sm text-center">
            Have already an account? 
            <router-link to='/login' class="text-blue-500 hover:text-blue-600 active:text-blue-700 transition duration-100">Sign in</router-link>
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
  name: 'Register',
  components: {
    Header,
    Footer,
  },
  data() {
  	return {
  		email: null,
  		password: null,
  		passwordRepeat: null,
      type: null,
      terms: false,
  		error: null,
  	}
  },
  methods: {
    register: function() {
      if (!this.terms) {
        this.error = 'Please accept terms';
        return ;
      }
      
      const email = this.email;
      const password = this.password;
      const type = this.type;

      if (password !== this.passwordRepeat) {
      	this.error = 'Passwords not match';
      	return ;
      }

      if (this.type === null) {
        this.error = 'Please select user type';
        return ;
      }

  	  this.error = null;
  	  this.$store.dispatch("register", { email, password, type })
  	  	.catch((e) => this.error = e.message)
  	  	.then(() => {
  	  		if (null === this.error) {
  				this.$router.push({name: 'Dashboard'})
  	  		}
  	  	})
    }
  }
};

</script>
