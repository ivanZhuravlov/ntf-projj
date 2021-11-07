<template>
  <div class="home flex flex-col items-center">
    <ArtPreview class="mt-24" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import ArtPreview from '@/components/ArtPreview.vue'

export default {
  name: 'Home',
  components: {
    Footer,
    ArtPreview
  }
}
</script>
