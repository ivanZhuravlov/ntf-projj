<template>
  <div id="create-artist">
    <Header />
    <div class="bg-white py-6 sm:py-8 lg:py-12 px-4 md:px-8 mx-auto text-gray-800">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Create Artist</h2>
        <p class="max-w-proce text-gray-500 md:text-lg text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>
      </div>
      <!-- text - end -->
      <!-- form - start -->
      <div class="xs:block grid-cols-2 grid w-9/12 gap-7 mx-auto">
        <div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-3">Firstname *</label>
            <input required type="text" v-model="firstName" class="w-full bg-gray-50  border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-3">Artist name *</label>
            <input required v-model="artistName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-3">Who are you? *</label>
            <textarea required maxlength="500" v-model="bio" class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
          </div>
        </div>
        <div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-3">Lastname *</label>
            <input required type="text" v-model="lastName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-3">Phone Number *</label>
            <input required v-model="phone" type="tel" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-3">What are you doing? *</label>
            <textarea required v-model="research" maxlength="500" class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
          </div>
        </div>
      </div>
      <div class="w-6/12 mx-auto">
        <div>
          <hr class="my-4">
          <p class="max-w-screen-md md:text-lg my-4">Proove your identity:</p>
          <div class="grid mx-auto mb-5">
            <div class="md:col-span-2 lg:col-span-2">
              <label class="inline-block text-sm sm:text-base mb-2">Artist Registration Number *</label>
              <input v-model="verificationId" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>
          </div>
          <hr class="my-4">
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input v-model="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded" required>
            </div>
            <div class="text-sm ml-3">
              <label for="terms" class="font-sm">I read and approve the <a href="#" class="text-blue-600 hover:underline">terms and conditions*</a></label>
            </div>
          </div>
          <button @click='createArtist()' class="block mx-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition duration-100 px-10 py-3" type="submit">
            Create my profile
          </button>
        </div>
      </div>
      <!-- form - end -->
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import FilePreview from '@/components/FilePreview.vue'


export default {
  name: 'CreateArtist',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      firstName: null,
      artistName: null,
      lastName: null,
      verificationId: null,
      bio: null,
      phone: null,
      research: null,
      terms: null,
      error: null,
    }
  },
  methods: {
    async createArtist() {
      this.error = null;

      try {
        if(!this.terms) {
          this.error = 'You need to read and approve terms and condition';
          return ;
        }

        const data = {
          firstName: this.firstName,
          artistName: this.artistName,
          lastName: this.lastName,
          verificationId: this.verificationId,
          bio: this.bio,
          phone: this.phone,
          research: this.research,
        };
        
        const somethingIsEmpty = Object.values(data).some((value) => !value);
        if(somethingIsEmpty) {
          this.error = 'Some fields are empty';
          return ;
        }

        await fetch(this.$store.getters.api + '/artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer
          },
          body: JSON.stringify(data)
        }).then((r) => r.json());
      } catch(err) {
        this.error = 'Error, please contact an administrator';
      }
    },
  },
};
</script>
