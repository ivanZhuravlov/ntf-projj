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
      </div>
      <!-- text - end -->

      <!-- form - start -->
      <div class="text-gray-800 sm:w-9/12 md:grid grid-cols-2 w-9/12 lg:grid grid-cols-2 w-9/12 gap-7 mx-auto ">

        <div>
          <div>
            <label for="title" class="inline-block text-sm sm:text-base mt-3">Title of the Artpiece*</label>
            <input v-model='title' required name="title" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <label class="inline-block text-sm sm:text-base mt-3">Image of Artpiece*</label>
          <FilePreview/>
        </div> 

        <div>
          <!--TODO: DATE PICKER -->
          <div>
            <label for="createdAt" class="inline-block text-sm sm:text-base mt-3">The Artpiece was created at:*</label>
            <input v-model='createdAt' required name="createdAt" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <!-- <div>
            <label for="price" class="inline-block text-sm sm:text-base mt-3">Price*</label>
            <input required="true" name="price" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div> -->

          <div>
            <label for="technical" class="inline-block text-sm sm:text-base mt-3">Technical Information*</label>
            <input v-model='technical' required name="technical" placeholder="Paint, sculpture, photography, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label for="size" class="inline-block text-sm sm:text-base mt-3">Dimension/Size*</label>
            <input v-model='size' required name="size" placeholder="Height x Width x Depth cm" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label for="material" class="inline-block text-sm sm:text-base mt-3">Support Material*</label>
            <input v-model='material' required name="material" placeholder="Cotton, paper, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label for="tirage" class="inline-block text-sm sm:text-base mt-3">Tirage*</label>
            <input v-model='tirage' required name="tirage" placeholder="Unique copy, 1 out of 10, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label for="movement" class="inline-block text-sm sm:text-base mt-3">Artistic Movement*</label>
            <input v-model='movement' required name="movement" placeholder="Abstract, figurative, portrait, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div>
            <label for="description" class="inline-block text-sm sm:text-base mt-3">Short description*</label>
            <input v-model='description' required name="description" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 placeholder-gray-500 placeholder-opacity-25" />
          </div>

          <div class="flex items-start mb-6 mt-3">
            <div class="flex items-center h-5">
              <input v-model='terms' id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded" required="true">
            </div>
            <div class="text-sm ml-3">
              <label for="terms" class="font-sm">I acknowledge that I have read and agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions*</a></label>
            </div>
          </div>

          <p class="text-gray-400 text-xs">The information given above cannot be edited after it has been recorded into the blockchain.</p>

          <button @click='createCertificate()' class="block mx-auto bg-gray-800 tracking-widest hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase rounded outline-none transition duration-100 px-10 py-3 mt-12"
            type="submit">
            create now
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
import FilePreview from '@/components/FilePreview.vue'

export default {
  name: 'CreateCoa',
  components: {
    Header,
    Footer,
    FilePreview,
  },
  data() {
    return {
      title: null,
      tokenUri: '',
      createdAt: null,
      technical: null,
      size: null,
      material: null,
      tirage: null,
      movement: null,
      description: null,
      terms: false,
      error: null,
    }
  },
  methods: {
    // Validate
    validateForm() {
      if (!this.terms) {
        this.error = 'Please accept terms';
        return false;
      }
      if (!this.title || !this.tokenUri || !this.createdAt || !this.technical || !this.size || !this.material || !this.tirage || !this.movement || !this.description) {
        this.error = 'Please fill up the requirered (*) fields';
        return false;
      }
      this.error = null;
      return true;
    },

    // API call
    createCertificate: async function() {
      
      if (this.validateForm() === true) {

       try { const response = await fetch(this.$store.getters.api + '/certificate', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer,
          },
          body: JSON.stringify({
            "title": this.title,
            "tokenUri": this.tokenUri,
            //"createdAt": this.createdAt,
            "technical": this.technical,
            "size": this.size,
            "material": this.material,
            "tirage": this.tirage,
            "movement": this.movement,
            "description": this.description
          })
          }).then((r) => r.json()); 
      
          // Check for error response
          if (!response.ok) {
            
            const error = response.status;
            return Promise.reject(error);
          }
          // Success
          // Do something
          console.log(this.response);
          
        } catch(error) {
          throw new Error('Undefined error. Please try again later.');
        }
      } 
    },
  }
};
</script>
