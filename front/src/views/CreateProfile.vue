<template>
  <div id="create-profile">
    <Header />
    <div class="bg-white py-6 sm:py-8 lg:py-12 flex items-center">
      <div class="px-4 md:px-8  mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
          <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Create Profile</h2>
          <p class="max-w-proce text-gray-500 md:text-lg text-center mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p> 
        </div>
        <!-- text - end -->

        <!-- form - start -->
        <form class="text-gray-800 sm:grid grid-cols-2 w-9/12 md:grid grid-cols-2 w-9/12 lg:grid grid-cols-2 w-9/12 gap-7 mx-auto ">

        <div>
          <div>
            <label for="first-name" class="inline-block text-sm sm:text-base mt-3">First name*</label>
            <input required="true" name="first-name" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="last-name" class="inline-block text-sm sm:text-base mt-3">Last name*</label>
            <input required="true" name="last-name" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="email" class="inline-block text-sm sm:text-base mt-3">Email*</label>
            <input required="true" type="email" name="email" class="w-full bg-gray-50  border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="email-confirmation" class="inline-block text-sm sm:text-base mt-3">Email Again*</label>
            <input required="true" type="email" name="email-confirmation" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label for="phone-number" class="inline-block text-sm sm:text-base mt-3">Phone Number*</label>
            <input required="true" name="phone-number" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
        </div>
         
        <div>

        <div>
          <p class="md:text-sm text-center mx-auto mt-3">I am*</p>
          <div class="grid grid-cols-3 gap-4 flex justify-items-center">
          <div> 
            <input type="checkbox" id="gallery" name="profile-type" value="Gallery">
            <label for="gallery" class="text-xs sm:text-base mx-3">Gallery</label>
          </div>
          <div>
            <input type="checkbox" id="agent" name="profile-type" value="Agent">
            <label for="agent" class="text-sm sm:text-base mx-3">Agent</label>
          </div>
          <div>
            <input type="checkbox" id="buyer" name="profile-type" value="Buyer">
            <label for ="buyer" class="text-sm sm:text-base mx-3">Buyer</label>
          </div>
        </div>

        <hr class="my-4">
        <div> 
          <label for="description" class="inline-block  text-sm sm:text-base mt-3">Description</label>
          <textarea required="true" maxlength="500" name="description" placeholder="Description will be recorded into blockchain and associated to the artpiece (optional)." class="w-full h-40 bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"></textarea>
        </div>


        </div>   

        <hr class="my-4">
        <div class="">
          <label for="pic-id" class="inline-block text-sm sm:text-base mt-3"> A copy of your ID, driving lincense or passport*</label>
          <input type="file" accept="image/png, image/jpeg" name="pic-id" class="w-full text-gray-500 text-sm py-2" />
        </div>
        <hr class="my-4">
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded" required="true">
          </div>
          <div class="text-sm ml-3">
            <label for="terms" class="font-sm">I read and approve the <a href="#" class="text-blue-600 hover:underline">terms and conditions*</a></label>
          </div>
        </div>

        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded">
          </div>
          <div class="text-sm ml-3">
            <label for="newsletter" class="font-sm">Sign up to the newsletter!</label>
          </div>
        </div>

        <button class="block mx-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition duration-100 px-10 py-3" type="submit">
            s t a r t
        </button>

      </div>
    </form>
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
  name: 'CreateProfile',
  components: {
    Header,
    Footer,
  }
};
</script>
