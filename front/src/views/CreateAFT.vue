<template>
<div id="create-coa">
  <Header />
  <div class="container max-w-full px-2 bg-white py-6 sm:py-8 lg:py-12 flex items-center flex-col">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-10 text-lightGay">CREATE NEW <span class="text-orange">AFT</span></h2>

        <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>
      </div>
      <!-- text - end -->

      <div class="text-gray-800 xs:block grid grid-cols-2 gap-7 max-w-6xl w-full top-border pt-4 xs:px-1 sm:px-2 md:px-3">

        <div class="w-full max-w-xl flex flex-col justify-center items-center xs:h-20">
          <div v-if='tokenUri' class="inline-flex flex-col justify-center">
            <img class="max-w-64 mt-2 h-auto" :src="`https://ipfs.io/ipfs/${tokenUri}`">
            <button @click="tokenUri = null" class="rounded text-white mx-auto bg-red-400 hover:bg-red-500 text-sm font-medium text-center outline-none transition duration-100 px-4 py-1 mt-4">
              Remove image
            </button>
          </div>
          <div class="rounded border bg-gray-50 cursor-pointer shrink grow w-full h-full" v-else>
              <div class="flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 hover:border-gray-300">
                <img class="absolute w-8 h-8 sm:w-7 sm:h-7 xs:w-6 xs:h-6" alt="add_photo_alternate" :src="require(`@/assets/icons/add_photo_alternate.svg`)">
                <p class="absolute mt-12 text-sm text-slightGay tracking-wider select-none text-gray-400 group-hover:text-gray-600">Select photo</p>
                <input :disabled="fileUploadPending" @change="uploadFileToIPFS" type="file" accept="image/png, image/jpeg" required name="artpiece-image" class="h-full w-full cursor-pointer opacity-0" />
              </div>
            </div>
        </div>

        <div class="xs:mt-5 w-full max-w-xl">
          <div class="text-center text-slightGay">Description</div>

          <div class="mt-2">
            <input required v-model="artwork_title" placeholder="Artwork title" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="mt-2">
            <input required v-model="createdAt" placeholder="Creation date" type="date" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="mt-2">
            <input required v-model="technique" placeholder="Technique" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="mt-2">
            <input required v-model="dimension" placeholder="Dimension" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="flex flex-row justify-around items-baseline">
            <div class="flex flex-row items-baseline">
              <input type="checkbox" required v-model='isUnique'>
              <label class="text-slightGay ml-2 inline-block text-sm sm:text-base mt-6 mb-1">Unique </label>
            </div>
            <input required v-model="serie_name" placeholder="Serie name" class="bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <p class="text-center text-slightGay mt-3">Each art piece of a serie requires its own AFT</p>

          <div class="mt-1 flex flex-row items-baseline justify-around xs:justify-around flex-wrap">
            <input required v-model="numbering" placeholder="Numbering" class="bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
            <p class="text-slightGay">out of</p>
            <input required v-model="total_quantity" placeholder="Total quantity" class="xs:mt-2 sm:mt-2 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="top-border mt-3">
            <textarea placeholder="Artwork description" maxlength="200" v-model="description" class="w-full placeholder-gray-500 placeholder-opacity-25 mt-3 h-20 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
          </div>

          <div class="top-border low-border mt-3 pb-2 flex flex-col">
            <p class="text-orange text-slightGay mt-1">AFT on behalf of the Artist</p>
            <input required v-model="artist_email" placeholder="Artist email" class="mt-1 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

        </div>
      </div>

    <div class="mt-12">
      <button @click="createAFT()" class="bg-lighterOrange hover:bg-gray-400 active:bg-gray-200 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center outline-none transition duration-500 px-16 py-2">
        CREATE
      </button>
    </div>

    <div class="mt-6 max-w-md">
      <p class="text-center text-slightGay text-xs">
        By clicking CREATE you agree to terms and conditions here. The information given above cannot be edited after it has been added to a blockchain.
      </p>
    </div>
    </div>
  <Footer />
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
const axios = require('axios');

// From nft.storage
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI3RjcxYTMyQTg3MzhENzFGMzZjNTIzNTczZDIyRTA4QjNlODIyMmIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTgyNzg3MjM1MiwibmFtZSI6ImplbmtvIn0.04WK7i-3C2ujAoeyRiHxoINCkE5LANFBfL70KhAIlpE';

export default {
  name: 'CreateAFT',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      fileUploadPending: false,
      title: null,
      createdAt: null,
      artwork_title: null,
      technique: null,
      dimension: null,
      serie_name: null,
      numbering: null,
      total_quantity: null,
      artist_email: null,
      artPieceId: null,
      description: null,

      isUnique: false,
      createBelongArtist: false,

      tokenUri: null,
      terms: null,
      error: null,
    }
  },
  methods: {
    async uploadFileToIPFS(event) {
      this.tokenUri = null;
      this.fileUploadPending = true;
      const files = event.target.files;
      if (!files.length) {
        return;
      }

      const formData = new FormData();
      formData.append('file', files[0]);

      const { data } = await axios.post('https://api.nft.storage/upload', formData, {
        maxBodyLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization': `Bearer ${API_KEY}`
        }
      });
      if(!data.ok) {
        this.error = 'An error occurred while uploading the image';
      }
      this.fileUploadPending = false;
      this.tokenUri = `${data.value.cid}/${data.value.files[0].name}`;
    },
    async createAFT() {
      this.error = null;

      try {
        if(!this.terms) {
          this.error = 'You need to read and approve terms and condition';
          return ;
        }

        const data = {
          title: this.title,
          createdAt: this.createdAt,
          artwork_title: this.artwork_title,
          technique: this.technique,
          dimension: this.dimension,
          serie_name: this.serie_name,
          numbering: this.numbering,
          total_quantity: this.total_quantity,
          artist_email: this.artist_email,
          artPieceId: this.artPieceId,
          description: this.description,
          tokenUri: this.tokenUri,
        }

        if(this.isUnique) {
          data.isUnique = true;
        } 
        if(this.createBelongArtist) {
          data.createBelongArtist = this.createBelongArtist;
        }

        const somethingIsEmpty = Object.values(data).some((value) => !value);
        if(somethingIsEmpty) {
          this.error = 'Some fields are empty';
          return ;
        }
        await fetch(this.$store.getters.api + '/certificate', {
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

      await this.$router.push('/artworks');
    }
  },
};
</script>
