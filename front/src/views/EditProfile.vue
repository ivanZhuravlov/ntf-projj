<template>
<div id="edit-profile">
  <Header />
  <!-- <div class="bg-white py-6 sm:py-8 lg:py-12 flex items-center">
    <div class="px-4 md:px-8 mx-auto">
      <div class="mb-10 md:mb-16">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Edit Profile</h2>
        <p class="max-w-proce text-gray-500 md:text-lg text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      
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
    </div>
  </div> -->
  
  <div class="max-w-5xl border-2 m-auto mt-12 mb-32 pb-48 shadow-lg">
    <div class="border-b-2 text-xl text-gray-800 flex items-center justify-center py-6">
      <svg class="w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      Settings
    </div>

    <div class="flex">
      <div class="w-1/5 text-sm font-medium text-gray-900">
        <button 
          v-for='(tab, k) in tabs' :key="tab" 
          @click="selectedTab = tab"
          aria-current="true"
          class="tab"
          :class='{"bg-gray-200 border-b border-gray-200": tab === selectedTab, "border-b-2": k === tabs.length-1 }'
        >
          {{ tab }}
        </button>
      </div>
      
      <div v-if='slugify(selectedTab) === "edit_profile"' class="w-4/5 flex flex-col justify-center items-center pt-8">
        <!-- TODO -->
        <div class="flex justify-center items-center space-x-8">
          <div class="rounded-full h-24 w-24 border-2"></div>
          <span class="capitalize text-indigo-600 text-lg select-none">Change profile photo</span>
        </div>

        <div class="w-3/4">
          <label for="firstName" class="inline-block text-sm sm:text-base mt-3">First name*</label>
          <input v-model='firstName' required name="firstName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          
          <label for="lastName" class="inline-block text-sm sm:text-base mt-3">Last name*</label>
          <input v-model='lastName' required name="lastName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          
          <label for="email" class="inline-block text-sm sm:text-base mt-3">Email</label>
          <input disabled v-model="email" name="email" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
        </div>

      </div>
    </div>
  </div>
  
  <Footer />
</div>
</template>

<style>
.tab {
  @apply block w-full px-4 py-2 cursor-pointer
}
</style>

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
      tabs: ['Edit Profile', 'Change Password', 'Manage Contacts', 'Help'],
      selectedTab: 'Edit Profile',
      firstName: null,
      lastName: null,
      email: null,
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
  async mounted() {
    const { user } = await fetch(this.$store.getters.api + '/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.$store.getters.bearer
      }
    }).then((r) => r.json());
    console.log(user);
    // this.email = user
    this.firstName = user.data.firstName;
    this.lastName = user.data.lastName;
    this.zip = user.data.zip;
    this.city = user.data.city;
    this.state = user.data.state;
    this.country = user.data.country;
    this.description = user.data.description;
    this.street = user.data.street;
    this.terms = user.data.terms;
    this.newsletter = user.data.newsletter;
  },
  methods: {
    slugify(tab) {
      console.log(tab)
      return tab.toLowerCase().replaceAll(' ', '_');
    },
    async editProfile () {
      if (!this.terms) {
        this.error = 'Please accept terms';
        return ;
      }

      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        street: this.street,
        zip: this.zip,
        city: this.city,
        state: this.state,
        country: this.country,
        terms: this.terms,
      };

      if(Object.values(data).some(value => !value)) {
        this.error = 'Please fill up the requirered (*) fields';
        return;
      }

      try {  
        await fetch(this.$store.getters.api + '/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer,
          },
          body: JSON.stringify({
            ...data,
            description: this.description,
            newsletter: this.newsletter
          })
        }); 

        this.$router.push({name: 'Dashboard'});

      } catch(error) {
        console.log(error)
        this.error = 'Undefined error. Please try again later.';
      }
    } 
  }
};
</script>
