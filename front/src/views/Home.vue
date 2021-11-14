<template>
  <div class="home flex flex-col items-center">
    <Header />
    <ArtPreview class="mt-24" />
    <Footer class="w-full" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ArtPreview from '@/components/ArtPreview.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    ArtPreview
  }
}
</script>
