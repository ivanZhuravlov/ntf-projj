<template>
  <div class="add-royalties">
    <Header />
    <div class="xs:rounded-2xl px-3 bg-gray-50 container border-t-2 max-w-4xl filter drop-shadow-md sm:py-8 lg:px-20 py-8 md:px-8 mx-auto text-gray-800 border border-gray-100 rounded-md mt-10" >
      <!-- text - start -->
      <div class="xs:px-3 mb-10 md:mb-16">
        <h2 class=" text-2xl lg:text-3xl font-bold text-left mb-4 md:mb-6 xs:text-3xl">Royalties</h2>
        <p class="text-gray-700 font-semibold text-left mx-auto text-sm">
          Share and collect fees when the artpiece you originally created has been re-sold. 
        </p>
      </div>
      <div v-if='error'  class="mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>
     <!-- text - end -->
     <!-- form - start -->
      <div class="xs:px-3 flex flex-col lg:grid grid-rows-3 grid-flow-col gap-10">
        <div class=" row-span-3 col-span-2 filter drop-shadow-md rounded-md p-5 bg-white">
          <h3 class="text-lg font-semibold text-left pb-2"> Percentage of Royalties %</h3>
          <p class="border-b-2 text-xs font-base text-left pb-2 text-gray-500 xs:text-sm">You can set fees of up to 50 % in total.</p>
          <div class="flex justify-between">
            <label class="inline-block text-md font-semibold sm:text-base my-6">Artist</label>
            <input v-on:change="total()" required maxlength="2" v-model.number="roylatiesArtist" placeholder="20" class="my-3 bg-white border text-md font-semibold focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 text-center w-16" />
          </div>
          <div class="flex justify-between ">
            <label class="inline-block text-md font-semibold sm:text-base my-6 mr-6">Gallery</label>
            <input v-on:change="total()" required maxlength="2" v-model.number="roylatiesGallery" placeholder="5" class="my-3 bg-white border text-md font-semibold focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 text-center w-16" />
          </div>
          <div class="flex justify-between ">
            <label class="inline-block text-md font-semibold sm:text-base my-6 mr-6">First Collector</label>
            <input v-on:change="total()" required maxlength="2" v-model.number="roylatiesCollector0" placeholder="2" class="my-3 bg-white border text-md font-semibold focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 text-center w-16" />
          </div>
          <div class="flex justify-between ">
            <label class="inline-block text-md font-semibold sm:text-base my-6 mr-6">Second Collector</label>
            <input v-on:change="total()" required maxlength="2" v-model.number="roylatiesCollector1" placeholder="2" class="my-3 bg-white border text-md font-semibold focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 text-center w-16" />
          </div>
          <div class="flex justify-between ">
            <label class="inline-block text-md font-semibold sm:text-base my-6 mr-6">Third Collector</label>
            <input v-on:change="total()" required maxlength="2" v-model.number="roylatiesCollector2" placeholder="2" class=" my-3 bg-white border text-md font-semibold focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 text-center w-16" />
          </div>
          <div class="flex justify-between ">
            <label class="inline-block text-md font-semibold sm:text-base my-6 mr-6">X Collector</label>
            <input v-on:change="total()" required maxlength="2" v-model.number="roylatiesCollectorX" placeholder="2" class=" my-3 bg-white border text-md font-semibold focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 text-center w-16" />
          </div>
          <div class="flex justify-between border-t-2">
            <h2 class="px-3 py-2 text-md font-bold sm:text-base my-6 mr-6 ">Total*</h2>
            <h3 class="px-3 py-2 text-md font-bold sm:text-base text-center my-6"> {{this.sum}} %</h3>
          </div>
          <p class="text-xs font-base text-left pb-2 text-gray-500">*Jenko's 3 % royalty fee included.</p>
        </div>
   
        <div class="col-start-3 col-span-3">
          <div class="px-10 mt-10">
            <div class="flex place-content-left pb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 class="font-bold uppercase font-mono font-sm mb-3 text-gray-400">About royalties</h1>
            <p class="text-sm font-base text-left pb-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. 
            Default for </p>
          </div>
        </div>

        <div class="row-start-3 col-start-3 row-span-1 col-span-3 space-x-10 space-y-10 place-content-end xs:space-y-5">
          <div class="flex px-10 pt-20">
            <div class="items-center h-5">
              <input v-model="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-indigo-300 h-4 w-4 rounded" required>
            </div>
            <div class="text-sm ml-3">
              <label for="terms" class="font-sm font-semibold">I read and approve the <a href="#" class="text-blue-400 hover:underline">terms and conditions*</a></label>
            </div>
          </div>
          <!-- form - end -->
          <router-link  to="/dashboard" class="rounded-md inline-block mx-auto bg-red-400 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition px-10 py-3 hover:transition ease-out duration-200 transform hover:scale-110 tracking-widest" type="submit">
            SKIP*
          </router-link>
          <button @click="setRoyalties()" class="rounded-md inline-block mx-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition px-10 py-3 hover:transition ease-out duration-200 transform hover:scale-110 tracking-widest" type="submit">
            Add Royalties!
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
  name: 'SetRoyalties',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
        roylatiesArtist: null,
        roylatiesGallery: null,
        roylatiesCollector0: null,
        roylatiesCollector1: null,
        roylatiesCollector2: null,
        roylatiesCollectorX: null,
        error: null,
        terms: null,
        sum: 3,
        tokenId: null,
    }
  },
  methods: {

      // TODO: Get tokenId, user is artist, no royalties already

    total: function(){

      const royalties = [
        this.roylatiesArtist,
        this.roylatiesGallery, 
        this.roylatiesCollector0,
        this.roylatiesCollector1,
        this.roylatiesCollector2,
        this.roylatiesCollectorX,
      ];
      this.sum = royalties.reduce((a, b) => a + b, 3);  
    },

    async setRoyalties() {

      this.error = null;

      try {
        if(!this.terms) {
          this.error = 'You need to read and approve terms and condition to add royalties.';
          return ;
        };

        const data = {
          roylatiesArtist: this.roylatiesArtist,
          roylatiesGallery: this.roylatiesGallery,
          roylatiesCollector0: this.roylatiesCollector0,
          roylatiesCollector1: this.roylatiesCollector1,
          roylatiesCollector2: this.roylatiesCollector2,
          roylatiesCollectorX: this.roylatiesCollectorX,
          tokenID: this.tokenID,
        };
              
        const royaltyArr = Object.values(data);
        royaltyArr.pop();

        // Check input it between 0 - 47 and it's a number
        const outOfRange = royaltyArr.some(a => a < 0 || a > 47 || typeof(a) != 'number'); 
        if (outOfRange) {
            this.error = 'Invalid input. You can set the fee between 0-47 but the total must not be more than 50%';
            return ;
        };

        // Check the sum of inputs is 0-47 (47 because jenko fee (3%) is not included)
        const sum = royaltyArr.reduce((a, b) => a + b, 0);
        if(sum > 47 || sum < 0) {
            this.error = 'The amount of royalties exceeded the maximum royalties percentage.';
            return ;
        };

        await fetch(this.$store.getters.api + '/royalties', {
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
