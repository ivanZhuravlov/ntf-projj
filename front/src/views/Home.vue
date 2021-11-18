<template>
  <div class="home flex flex-col items-center">
    <Header />
    <ArtPreview class="mt-24" />
    <div class="justify-between flex xs:flex-col-reverse sm:flex-col-reverse w-full items-center px-24">
      <Newsletter />
      <div class="xs:pb-8 sm:pb-8">
        <button class="mx-2 my-2 bg-gray-600 transition duration-150 ease-in-out hover:bg-gray-700 rounded border border-gray-300 text-gray-100 px-6 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
          Create now
        </button>
      </div>
    </div>
    <Footer class="w-full" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ArtPreview from '@/components/ArtPreview.vue'
import Newsletter from '@/components/Newsletter.vue'

export default {
  name: 'Home',
  components: {
    Header,
    ArtPreview,
    Newsletter,
    Footer,
  }
}
</script>
