<template>
  <div class="register space-y-20">
    <Header />
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto space-y-8">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Register</h2>
      
      <div class="flex justify-center items-center">
        <p class="text-gray-600 text-center">
          Have already a JENKO Account ? 
          <router-link to='/login' class="text-yellow-500 hover:text-yellow-600 transition duration-100">Sign in</router-link>
        </p>
      </div>

      <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div class="max-w-lg mx-auto">
        <div class="flex flex-col gap-4 p-4 md:p-8">

          <div>
            <label for="email" class="inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Name</label>
            <input v-model='name' required type="text" name="name" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          
          <div>
            <label for="email" class="inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Email</label>
            <input v-model='email' required type="email" name="email" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label for="password" class="inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Password</label>
            <input v-model='password' type='password' required name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="passwordRepeat" class="inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Password again</label>
            <input v-model='passwordRepeat' type='password' required name="passwordRepeat" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          </div>
          <hr class="my-4">
          <div class="flex items-start mb-6 px-6">
            <div class="flex items-center h-5">
              <input v-model="terms" required id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded">
            </div>
            <div class="text-sm ml-3">
              <label for="terms" class="font-sm">
                I read, understood and approve the terms and conditions <a class="text-blue-500 underline" href="/about#terms" target="_blank">here</a>
              </label>
            </div>
          </div>

          <button @click='register()' class="w-full bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
            Register
          </button>
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
  		name: null,
  		email: null,
  		password: null,
  		passwordRepeat: null,
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
      
      const name = this.name;
      const email = this.email;
      const password = this.password;

      if (password !== this.passwordRepeat) {
      	this.error = 'Passwords not match';
      	return ;
      }

  	  this.error = null;
  	  this.$store.dispatch("register", { email, password, name })
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
