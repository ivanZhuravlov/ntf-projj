<template>
  <div id="create-artist">
    <Header />
    <div class="bg-white py-6 sm:py-8 lg:py-12 flex items-center">
      <div class="px-4 md:px-8  mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
          <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Create Artist</h2>
          <p class="max-w-proce text-gray-500 md:text-lg text-center mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <!-- text - end -->

        <!-- form - start -->
        <div class="text-gray-800 sm:grid grid-cols-2 w-9/12 md:grid grid-cols-2 w-9/12 lg:grid grid-cols-2 w-9/12 gap-7 mx-auto ">
          <div>
            <div>
              <label for="artistName" class="inline-block text-sm sm:text-base mt-3">Artist name*</label>
              <input v-model='artistName' required name="artistName" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
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
              <label for="phoneNumber" class="inline-block text-sm sm:text-base mt-3">Phone Number*</label>
              <input v-model='phoneNumber' required name="phoneNumber" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>
            <div>
              <label for="email" class="inline-block text-sm sm:text-base mt-3">Email*</label>
              <input v-model='email' required type="email" name="email" class="w-full bg-gray-50  border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>
            <div>
              <label for="emailRepeat" class="inline-block text-sm sm:text-base mt-3">Email Again*</label>
              <input v-model='emailRepeat' required type="email" name="emailRepeat" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>
            <!-- TODO : Preview the picture -->
            <label class="inline-block text-sm sm:text-base mt-3">Choose a profile picture:</label>
            <FilePreview />
          </div>
          <div>
            <div>
              <label for="research" class="inline-block text-sm sm:text-base mt-3">What are you doing?*</label>
              <textarea v-model='research' required name="research" maxlength="500" class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
            </div>
            <div>
              <label for="bio" class="inline-block  text-sm sm:text-base mt-3">Who are you?*</label>
              <textarea v-model='bio' required maxlength="500" name="bio" class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
            </div>
            <hr class="my-4">
            <p class="max-w-screen-md md:text-lg my-4">Proove your identity by selecting one of two options:* </p>

            <!-- TODO: Require one of two fields -->
            <div class="md:grid grid-cols-3 lg:grid grid-cols-5 mb-5">
              <div class="md:col-span-2 lg:col-span-2">
                <label for="artistID" class="inline-block text-sm sm:text-base mb-2">Artist Registration Number</label>
                <input v-model='artistID' name="artistID" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
              </div>
              <p class= "text-center underline md:text-lg my-5 uppercase"> or </p>
              <div class="md:col-span-2 lg:col-span-2">
                <label for="copyID" class="inline-block text-sm sm:text-base mb-2"> Picture of your ID, driving lincense or passport</label>
                <input  type="file" accept="image/png, image/jpeg" name="copyID" class="w-full text-gray-500 text-sm py-2" />
              </div>
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
            <button @click='createArtist()' class="block mx-auto bg-gray-800 rounded tracking-widest hover:bg-gray-600 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition duration-100 px-10 py-3" type="submit">
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
  name: 'CreateArtist',
  components: {
    Header,
    Footer,
    FilePreview,
  },
  data() {
    return {
    //  artistName: null,
      firstName: null,
      lastName: null,
      // phoneNumber: null,
      // email: null,
      // emailRepeat: null,
       tokenUri: '',
      // research: null,
      // bio: null, 
      // artistID: null,
      // copyID: null,
       terms: false,
      // newsletter: false,
       error: null,
    }
  },
  methods: {

    validateForm() {
      if (!this.terms) {
        this.error = 'Please accept terms';
        return false;
      }
      if (!this.firstName || !this.lastName) {
        this.error = 'Please fill up the requirered (*) fields';
        return false;
      }
      this.error = null;
      return true;
    },

    createArtist: async function() {
      //  Check inputs + call API
      if (this.validateForm() === true) {

        // call api
       try { const response = await fetch(this.$store.getters.api + '/artist', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer,
          },
          body: JSON.stringify({
            "firstName": this.firstName,
            "lastName": this.lastName,
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

    // onfileChange(e) {
    //   var files = e.target.files || e.dataTransfer.files;
    //   if (!files.length) return;
    //   this.tokenUri = files[0]
    //   console.log(this.tokenUri);
    // }
  }
};
</script>
