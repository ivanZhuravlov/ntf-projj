<template>
  <div class="h-400 sm:h-600 md:h-screen lg:h-screen bg-local bg-cover bg-hero w-full flex justify-center 2xl:items-center xl:items-center lg:items-center md:items-center">
    <div class="w-4/5 max-w-9xl sm:mt-24 xs:mt-4">
      <h1 class="text-orange uppercase tracking-wide text-2xl lg:text-6xl">Art Fruit
        Token
      </h1>
      <p class="text-mediumGray uppercase tracking-wide mt-2 text-xl lg:text-5xl">
        Certificate of Authenticity
      </p>
      <p class="text-mediumGray text-sm my-3 lg:my-10 lg:text-2xl">Fruit your physical Artworks with
        value makers
      </p>
      <div class="w-full flex justify-between">
        <button @click="redirect" type="submit" class="px-6 py-4 bg-orange text-white text-xs leading-tight uppercase rounded-md shadow-md hover:bg-gray-600 hover:shadow-lg transition duration-200 ease-in-out">
          Get started
        </button>
        <h1 class="uppercase text-white text-right text-xl md:place-self-start lg:font-extralight lg:text-5xl lg:place-self-auto">
          NFTs unlike anothers
        </h1>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: 'CTA',
    methods: {
      redirect() {
        this.$router.push(`/login`)
      },
    }
  };
</script>