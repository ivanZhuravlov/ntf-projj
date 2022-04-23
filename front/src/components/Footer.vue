<template>
  <div class="w-screen">
    <footer>
      <div
        class="grid grid-cols-2 px-10 my-5 gap-4 gap-y-10 justify-around lg:flex lg:flex-row lg:justify-center lg:space-x-10">
        <!-- nav - start-->
        <div class="w-28">
          <div class="uppercase text-xs font-medium leading-12 text-textGray mb-3">Features</div>
          <nav class="flex flex-col">
            <div>
              <router-link to="/about#about-us"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">AFT
                Certificate
              </router-link>
            </div>
            <div>
              <router-link to="/contact"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">Secure
                Stickers</router-link>
            </div>
          </nav>
        </div>
        <!-- nav - end -->

        <!-- nav - start -->
        <div class="w-28">
          <div class="uppercase text-xs font-medium leading-12 text-textGray mb-3">Pricing</div>
          <nav class="flex flex-col">
            <div>
              <router-link to="/about#about-us"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">
                Individual</router-link>
            </div>
            <div>
              <router-link to="/contact"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">
                Business</router-link>
            </div>
          </nav>
        </div>
        <!-- nav - end -->

        <!-- nav - start -->
        <div class="w-28">
          <div class="uppercase text-xs font-medium leading-12 text-textGray mb-3">Learn</div>
          <nav class="flex flex-col">
            <div>
              <router-link to="/about#terms"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">About
              </router-link>
            </div>
            <div>
              <router-link to="/about#privacy-policy"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">Getting
                Started</router-link>
            </div>
            <div>
              <router-link to="/about#terms-of-use"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">How it
                Works</router-link>
            </div>
            <div>
              <router-link to="/about#terms-of-use"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">Help
              </router-link>
            </div>
          </nav>
        </div>
        <!-- nav - end -->

        <!-- nav - start -->
        <div class="">
          <div class="uppercase text-xs font-medium leading-12 text-textGray mb-3">Community</div>

          <nav class="flex flex-col">
            <div>
              <router-link to="/service"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">
                Newsletter</router-link>
            </div>

            <div>
              <router-link to="/about#help"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">Contact
              </router-link>
            </div>

            <div>
              <router-link to="/about#faq"
                class="text-textGray text-xs font-normal leading-12 hover:text-gray-800 transition duration-100">Join
                our community</router-link>
            </div>

            <!-- social - start -->
            <div class="flex justify-center mt-7 gap-2 lg:gap-3">
              <router-link to="#" target="_blank">
                <img class="h-auto w-30" src="../assets/icons/instagram.svg">
              </router-link>

              <router-link to="#" target="_blank">
                <img class="h-auto w-30" src="../assets/icons/linked-in.svg">
              </router-link>

              <router-link to="#" target="_blank">
                <img class="h-auto w-30" src="../assets/icons/twitter.svg">
              </router-link>

              <router-link to="#" target="_blank">
                <img class="h-auto w-30" src="../assets/icons/facebook.svg">
              </router-link>
            </div>
            <!-- social - end -->
          </nav>
        </div>
      </div>
      <!-- nav - end -->
      <!-- copyright - start -->
      <div class="mx-10 lg:mx-24">
        <div class="flex border-t border-darkerGray py-3 justify-evenly ">
          <div class="text-xs font-normal leading-12 text-gray-500 text-center ">copyrights © 2022 Jenko Private
            Limited. All rights reserved.</div>
          <div class="flex divide-x divide-gray-500">
            <router-link to="/about#privacy-policy"
              class="text-xs font-normal leading-12 text-gray-500 text-center hover:text-gray-800 transition duration-100 px-3">
              Privacy Policy</router-link>
            <router-link to="/about#privacy-policy"
              class="text-xs font-normal leading-12 text-gray-500 text-center hover:text-gray-800 transition duration-100 px-3">
              Terms</router-link>
          </div>
        </div>
      </div>
      <!-- copyright - end -->
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>