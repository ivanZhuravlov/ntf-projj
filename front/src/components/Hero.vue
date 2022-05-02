<template>
  <section class="h-400 sm:h-600 md:h-screen lg:h-screen bg-local bg-cover bg-hero w-full">
    <div class="px-4 pt-10 lg:pt-0">
      <div class="flex-row justify-evenly items-center sm:px-10 md:justify-around lg:h-screen lg:flex">
        <div>
          <!-- Text - start -->
          <h1 class="text-orange uppercase tracking-wide font-bold text-2xl lg:text-6xl lg:font-semibold">Art Fruit
            Token</h1>
          <p class="text-mediumGray uppercase tracking-wide mt-2 font-bold text-xl lg:text-5xl lg:font-semibold">
            Certificate of Authenticity</p>
          <p class="text-mediumGray font-medium text-sm my-3 lg:my-10 lg:text-2xl">Fruit your physical Artworks with
            value makers</p>
          <!-- Text - end -->
          <!-- Button - start -->
          <div class="flex justify-center pt-28 lg:justify-start">
            <button type="submit"
              class="px-6 py-4 bg-orange text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-gray-600 hover:shadow-lg transition duration-200 ease-in-out">Get
              started</button>
          </div>
          <!-- Button - end -->
        </div>
        <div class="-mt-28 lg:mt-40">
          <h1
            class="uppercase text-white text-right font-bold text-xl md:place-self-start lg:font-extralight lg:text-5xl lg:place-self-auto ">
            NFTs unlike anothers </h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CTA',
  };
</script>