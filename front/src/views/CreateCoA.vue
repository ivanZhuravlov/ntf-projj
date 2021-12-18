<template>
<div id="create-coa">
  <Header />
  <div class="bg-white py-6 sm:py-8 lg:py-12 flex items-center">
    <div class="px-4 md:px-8  mx-auto">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-10">Create Certificate of Authenticity</h2>

        <p class="max-w-proce text-gray-500 md:text-lg text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>
      </div>
      <!-- text - end -->

      <div class="text-gray-800 xs:block grid grid-cols-2 w-9/12 gap-7 mx-auto ">

        <div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Name of the Artpiece *</label>
            <input required v-model="title" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <!-- TODO : Preview the picture -->
          <label class="inline-block text-sm sm:text-base mt-6 mb-1">Select a picture of the artpiece *</label>
          <div class="w-full justify-start">
            <div v-if='tokenUri' class="inline-flex flex-col justify-center">
              <button @click="tokenUri = null" class="rounded text-white mx-auto bg-red-400 hover:bg-red-500 text-sm font-medium text-center outline-none transition duration-100 px-4 py-1 mt-4">
                Remove image
              </button>
              <img class="max-w-64 mb-6 mt-2 h-auto" :src="`https://ipfs.io/ipfs/${tokenUri}`">
            </div>
            <div class="rounded border bg-gray-50 cursor-pointer" v-else>
              <div class="flex flex-col items-center justify-center w-full border border-indigo-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <p class="absolute text-sm tracking-wider select-none text-gray-400 group-hover:text-gray-600">Attach a file</p>
                <input @change="uploadFileToIPFS" type="file" accept="image/png, image/jpeg" required name="artpiece-image" class="h-full w-full cursor-pointer opacity-0" />
              </div>
            </div>
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-3">Brief description? *</label>
            <textarea required maxlength="200" v-model="description" class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
          </div>
        </div>

        <div>
          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Production Date of the Artpiece *</label>
            <input required v-model="createdAt" type="date" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Technical Information *</label>
            <input required v-model="technical" placeholder="Paint, sculpture, photography, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Dimension *</label>
            <input required v-model="size" placeholder="Height x Width x Depth cm" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Tirage *</label>
            <input required v-model="tirage" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Support Material *</label>
            <input required v-model="material" placeholder="Cotton, paper, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Numbering *</label>
            <input required v-model="artPieceId" placeholder="Unique copy, 1 out of 10, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label class="inline-block text-sm sm:text-base mt-6 mb-1">Artistic Movement *</label>
            <input required v-model="movement" placeholder="Abstract, figurative, portrait, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="flex items-start mb-6 mt-3">
            <div class="flex items-center h-5">
              <input v-model="terms" aria-described by="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded" required>
            </div>
            <div class="text-sm ml-3">
              <label class="font-sm">I read and approve with the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions*</a></label>
            </div>
          </div>

          <p class="text-gray-400 text-xs">The information given above cannot be edited after it has been recorded into the blockchain.</p>

          <button @click="createCOA()" class="block mx-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition duration-100 px-10 py-3 mt-12">
            create now
          </button>
        </div>
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
const axios = require('axios');

// From nft.storage
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI3RjcxYTMyQTg3MzhENzFGMzZjNTIzNTczZDIyRTA4QjNlODIyMmIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTgyNzg3MjM1MiwibmFtZSI6ImplbmtvIn0.04WK7i-3C2ujAoeyRiHxoINCkE5LANFBfL70KhAIlpE';

export default {
  name: 'CreateCoa',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      title: null,
      createdAt: null,
      technical: null,
      size: null,
      tirage: null,
      material: null,
      artPieceId: null,
      description: null,
      movement: null,
      tokenUri: null,
      terms: null,
      error: null,
    }
  },
  methods: {
    async uploadFileToIPFS(event) {
      this.tokenUri = null;
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

      this.tokenUri = `${data.value.cid}/${data.value.files[0].name}`;
    },
    async createCOA() {
      this.error = null;

      try {
        if(!this.terms) {
          this.error = 'You need to read and approve terms and condition';
          return ;
        }

        const data = {
          title: this.title,
          createdAt: this.createdAt,
          technical: this.technical,
          size: this.size,
          tirage: this.tirage,
          material: this.material,
          artPieceId: this.artPieceId,
          description: this.description,
          movement: this.movement,
          tokenUri: this.tokenUri,
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

      await this.$router.push('/dashboard');
    }
  },
};
</script>
