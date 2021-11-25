<template>
<div id="edit-profile">
  <Header />
  <div class="bg-white py-6 sm:py-8 lg:py-12 flex items-center">
    <div class="px-4 md:px-8 mx-auto">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Edit Profile</h2>
        <p class="max-w-proce text-gray-500 md:text-lg text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <!-- text - end -->

      <!-- form - start -->
      
      <div class="text-gray-800 sm:grid grid-cols-2 gap-7 md:grid grid-cols-2 lg:grid grid-cols-2 gap-20 mx-auto">
        <div>
          <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>
           
          <div>
            <label for="firstName" class="inline-block text-sm sm:text-base mt-3">First name*</label>
            <input v-model='firstName' required name="firstName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="lastName" class="inline-block text-sm sm:text-base mt-3">Last name*</label>
            <input v-model='lastName' required name="lastName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="street" class="inline-block text-sm sm:text-base mt-3">Street*</label>
            <input v-model='street' required name="street" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="zip" class="inline-block text-sm sm:text-base mt-3">Zip*</label>
            <input v-model='zip' required name="zip" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="city" class="inline-block text-sm sm:text-base mt-3">City*</label>
            <input v-model='city' required name="city" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="state" class="inline-block text-sm sm:text-base mt-3">State*</label>
            <input v-model='state' required name="state" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="country" class="inline-block text-sm sm:text-base mt-3">Country*</label>
            <input v-model='country' required name="country" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
        </div>
        <div>
          <div>
            <label for="description" class="inline-block text-sm sm:text-base mt-3">Description</label>
            <textarea v-model='description' required maxlength="500" name="description" placeholder="Description will be recorded into blockchain and associated to the artpiece (optional)."
              class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25"></textarea>
          </div>

          <hr class="my-4">
          <div>
            <label for="copyID" class="inline-block text-sm sm:text-base mt-3"> A copy of your ID, driving lincense or passport*</label>
            <input type="file" accept="image/png, image/jpeg" name="copyID" class="w-full text-gray-500 text-sm py-2" />
          </div>
          <hr class="my-4">
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input v-model='terms' id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded" required>
            </div>
            <div class="text-sm ml-3">
              <label for="terms" class="font-sm">I acknowledge that I have read and agree to the <a href="#" class="text-blue-600 hover:underline">terms and conditions*</a></label>
            </div>
          </div>

          <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input v-model='newsletter' id="newsletter" aria-describedby="newsletter" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded">
          </div>
          <div class="text-sm ml-3">
            <label for="newsletter" class="font-sm">Sign up to the newsletter!</label>
          </div>
        </div>

          <button @click='editProfile()' class="block mx-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold rounded text-center uppercase outline-none transition duration-100 px-10 py-3"
            type="submit">
            update
          </button>
        </div>
      </div>
      <!-- form - end -->
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
  name: 'EditProfile',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      street: null,
      zip: null,
      city: null,
      state: null,
      country: null,
      description: null, 
      copyID: null,
      terms: false,
      newsletter: false,
      error: null,
    }
  },
  methods: {
    // Validate the input data 
    validateForm() {
      
      if (!this.terms) {
        this.error = 'Please accept terms';
        return false;
      }
      if (!this.firstName || !this.lastName || !this.street || !this.zip || !this.city || !this.state || !this.country) {
        this.error = 'Please fill up the requirered (*) fields';
        return false;
      }
      this.error = null;
      return true;
    },
    
    // Make an api call to update user data
    editProfile: async function() {

      console.log(this.validateForm());
      if (this.validateForm() === true) {

        // call api
       try { const response = await fetch(this.$store.getters.api + '/profile', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer,
          },
          body: JSON.stringify({
            "firstName": this.firstName,
            "lastName": this.lastName,
            "street": this.street,
            "zip": this.zip,
            "city": this.city,
            "state": this.state,
            "country": this.country,
          })
          }).then((r) => r.json()); 
      
          // Check for error response
          if (!response.ok) {
            
            const error = response.status;
            return Promise.reject(error);
          }
          // Success
          console.log(this.response);
          this.$router.push({name: 'Dashboard'});
          
        } catch(error) {
          throw new Error('Undefined error. Please try again later.');
        }
      } 
    } 
  }
};
</script>
