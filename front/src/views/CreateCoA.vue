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
        <form class="text-gray-800 sm:w-9/12 md:grid grid-cols-2 w-9/12 lg:grid grid-cols-2 w-9/12 gap-7 mx-auto ">

          <div>
            <div>
              <label for="artpiece-title" class="inline-block text-sm sm:text-base mt-3">Artpiece Title*</label>
              <input required="true" name="artistpiece-title" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <!-- TODO : Preview the picture -->
            <label class="inline-block text-sm sm:text-base mt-3">Select a picture of the artpiece*</label>
            <div class="w-full justify-start">
              <div class="rounded border bg-gray-50">
                <div class="m-4">
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border border-indigo-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <p class="text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Attach a file</p>
                      </div>
                      <input type="file" accept="image/png, image/jpeg" required="true" name="profile-picture" class="opacity-0" />
                    </label>
                  </div>
                </div>
              </div>
            </div> 
          </div>
         
          <div>
            <div>
                <label for="creation-date" class="inline-block text-sm sm:text-base mt-3">Creation Date*</label>
                <input required="true" name="creation-date" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="price" class="inline-block text-sm sm:text-base mt-3">Price*</label>
                <input required="true" name="price" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="technical" class="inline-block text-sm sm:text-base mt-3">Technical Information*</label>
                <input required="true" name="technical" placeholder="Paint, sculpture, photography, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="dimension" class="inline-block text-sm sm:text-base mt-3">Dimension*</label>
                <input required="true" name="dimension" placeholder="Height x Width x Depth cm" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="support-material" class="inline-block text-sm sm:text-base mt-3">Support Material*</label>
                <input required="true" name="support-material" placeholder="Cotton, paper, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="tirage" class="inline-block text-sm sm:text-base mt-3">Tirage*</label>
                <input required="true" name="tirage" placeholder="Unique copy, 1 out of 10, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="artistic-movement" class="inline-block text-sm sm:text-base mt-3">Artistic movement*</label>
                <input required="true" name="artistic-movement" placeholder="Abstract, figurative, portrait, etc..." class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div>
                <label for="associated-tag" class="inline-block text-sm sm:text-base mt-3">Associated Tag*</label>
                <input required="true" name="associated-tag" placeholder="#" class="w-full bg-gray-50 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
            </div>

            <div class="flex items-start mb-6 mt-3">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" class="bg-gray-50 border focus:ring focus:ring-blue-300 h-4 w-4 rounded" required="true">
              </div>
            <div class="text-sm ml-3">
                <label for="terms" class="font-sm">I read and approve with the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions*</a></label>
              </div>
            </div>

            <p class="text-gray-400 text-xs">The information given above cannot be edited after it has been recorded into the blockchain.</p>

            <button class="block mx-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 focus:ring-2 text-white text-sm md:text-base font-semibold text-center uppercase outline-none transition duration-100 px-10 py-3 mt-12" type="submit">
            create now
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
  name: 'CreateCoa',
  components: {
    Header,
    Footer,
  }
};
</script>
