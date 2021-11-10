<template>
  <div class="create-artist">
    <Header />
   <h1>Create Artist</h1>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Service',
  components: {
    Header,
    Footer,
  }
};
</script>
