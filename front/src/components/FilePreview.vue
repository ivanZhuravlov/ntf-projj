<template>
  <div>
    <div v-if="!tokenUri" class="w-full justify-start">
      <div class="rounded border bg-gray-50">
        <div class="m-4">
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col w-full h-32 border border-indigo-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div class="flex flex-col items-center justify-center pt-7">
                <p class="text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Attach a file</p>
              </div>
              <input type="file" accept="image/png, image/jpeg" required @change='onFileChange($event)' name="tokenUri" class="opacity-0" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <img class="object-contain object-left flex w-96 mt-3" :src="tokenUri"/>
      <button class="rounded bg-red-400 mt-3 text-xs px-3 py-2 text-white hover:bg-gray-700" @click='removeImage($event)'> Remove image </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilePreview",
  data() {
    return {
      tokenUri: "",
    };
  },
  methods: {
    // Preview image
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        this.tokenUri = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (event) {
      this.tokenUri = "";
    },
  },
};
</script>