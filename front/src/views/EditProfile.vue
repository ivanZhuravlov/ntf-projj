<template>
<div id="edit-profile">
  <Header />
  
  <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-8" role="alert">
    <span class="block sm:inline">{{ error }}</span>
  </div>

  <div class="max-w-5xl border-2 m-auto mt-12 mb-32 pb-48 shadow-lg">
    <div class="border-b-2 text-xl text-gray-800 flex items-center justify-center py-6">
      <svg class="w-6 h-6 mr-4 text-orange" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
      
      <div v-if='slugify(selectedTab) === "edit_profile"' class="w-4/5 flex flex-col justify-center items-center pt-8 space-y-4">
        <!-- TODO -->
        <div class="w-3/4 grid grid-rows-1 grid-flow-col grid-col-3">
          <div class="col-span-1">
            <svg class="w-8 h-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="col-span-1">{{ name }}</div>
          <div class="capitalize text-indigo-600 select-none col-span-1">Change profile photo</div>
        </div>

        <div class="w-3/4 grid grid-cols-3 gap-1">
          <div class="col-span-1">
            User Name:
          </div>
          <div class="col-span-2 text-gray-400">
            <span v-if="name">{{ name }}</span>
            <span v-else>Artistic name</span>
          </div>
          <div class="col-span-1">
            Owner Address:
          </div>
          <div class="col-span-2 text-gray-400">
            <span v-if="artist && artist.address">{{ artist.address }}</span>
            <span v-else>Address is missing</span>
          </div>
        </div>
        <div class="w-3/4 border-t-2">

          <div v-if="canStartKyc" class="mt-6 flex justify-center">
            <router-link to="/kyc" class="bg-blue-600 hover:bg-blue-700 active:bg-blue-600 focus-visible:ring ring-blue-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
              Verify your identity
            </router-link>
          </div>

          <div class="text-center mt-4 flex-col text-gray-500">
            <div class="underline">Personal informations</div>
            <div>Your personal information below won't be part of the Public Profile</div>
          </div>
          <label for="firstName" class="inline-block text-sm sm:text-base mt-3">First name*</label>
          <input v-model='firstName' required name="firstName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          
          <label for="lastName" class="inline-block text-sm sm:text-base mt-3">Last name*</label>
          <input v-model='lastName' required name="lastName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />

          <label for="phone" class="inline-block text-sm sm:text-base mt-3">Phone</label>
          <input v-model="phone" name="phone" type="tel" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          
          <label for="email" class="inline-block text-sm sm:text-base mt-3">Email</label>
          <input disabled v-model="email" name="email" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
        </div>

        <button @click='editProfile()' class="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
          Update profile
        </button>
      </div>
      
      
      <div v-if='slugify(selectedTab) === "change_password"' class="w-4/5 flex flex-col justify-center items-center pt-8">

        <div class="w-3/4 space-y-4">
          <div>
            <label for="password" class="select-none inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Current password</label>
            <div class="flex justify-between items-center relative">
              <input v-model='currentPassword' :type='showCurrentPassword ? "text" : "password"' name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />

              <div class="absolute right-4 w-6 h-6 text-gray-700 cursor-pointer" @click="showCurrentPassword = !showCurrentPassword">
                <svg v-if='!showCurrentPassword' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </div>
            </div>
          </div>

          <div>
            <label for="password" class="select-none inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Password</label>
            <div class="flex justify-between items-center relative">
              <input v-model='password' :type='showPassword ? "text" : "password"' name="password" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />

              <div class="absolute right-4 w-6 h-6 text-gray-700 cursor-pointer" @click="showPassword = !showPassword">
                <svg v-if='!showPassword' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </div>
            </div>
          </div>
          <div>
            <label for="passwordRepeat" class="select-none inline-block font-light text-gray-600 text-sm sm:text-base mb-2">Password again</label>
            <input v-model='passwordRepeat' :type='showPassword ? "text" : "password"' required name="passwordRepeat" class="w-full bg-gray-50 text-gray-800 border focus:ring-2 ring-blue-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          
          <div class="flex justify-center items-center">
            <button @click='resetPassword()' class="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center rounded outline-none transition duration-100 px-8 py-3">
              Reset password
            </button>
          </div>
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
      phone: null,
      email: null,
      name: null,
      street: null,
      zip: null,
      city: null,
      state: null,
      country: null,
      description: null, 
      artist: null,
      copyID: null,
      newsletter: false,
      error: null,

      currentPassword: null,
      password: null,
      passwordRepeat: null,
      showCurrentPassword: false,
      showPassword: false,

      canStartKyc: false,
    }
  },
  async mounted() {
    const { user, artist } = await fetch(this.$store.getters.api + '/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.$store.getters.bearer
      }
    }).then((r) => r.json());
    this.artist = artist;
    
    this.email = user.email;
    this.name = user.name;
    this.firstName = user.data.firstName;
    this.lastName = user.data.lastName;
    this.phone = user.data.phone;

    this.canStartKyc = this.firstName && this.lastName && this.phone && this.email;

    this.zip = user.data.zip;
    this.city = user.data.city;
    this.state = user.data.state;
    this.country = user.data.country;
    this.description = user.data.description;
    this.street = user.data.street;
    this.newsletter = user.data.newsletter;
  },
  methods: {
    slugify(tab) {
      return tab.toLowerCase().replaceAll(' ', '_');
    },
    async editProfile () {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        street: this.street,
        zip: this.zip,
        city: this.city,
        state: this.state,
        country: this.country,
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
            phone: this.phone,
            description: this.description,
            newsletter: this.newsletter
          })
        }); 
      } catch(error) {
        console.log(error)
        this.error = 'Undefined error. Please try again later.';
      }
    },
    async resetPassword() {
      if(!this.currentPassword) {
        this.error = 'Current password is missing';
      	return ;
      }

      if (this.password !== this.passwordRepeat) {
      	this.error = 'Passwords not match';
      	return ;
      }

      if (this.password === this.currentPassword) {
      	this.error = "You can't use your previous password";
      	return ;
      }

      try {
        await fetch(
          this.$store.getters.api + '/password/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer
          },
          body: JSON.stringify({
            password: this.password,
            currentPassword: this.currentPassword
          })
        }).then((r) => r.json());

        this.$store.dispatch("resetPassword");
        this.$router.push('/login');
      } catch(error) {
        console.log(error)
        this.error = error.message;
      }

    }
  }
};
</script>
