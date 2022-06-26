<template>
  <div class=" space-y-8">
    <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-8" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>
    <div id='vouched-element' style="height: 100%"/>
  </div>
</template>

<script>

export default {
  name: 'Kyc',
  data() {
  	return {
  		error: null,
  	}
  },
  async mounted() {
    const { user } = await fetch(this.$store.getters.api + '/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.$store.getters.bearer
      }
    }).then((r) => r.json());

    const vouched = Vouched({
      verification: {
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.email,
        phone: user.data.phone
      },
      liveness: 'straight',
      
      appId: '<PUBLIC_KEY>',
      // your webhook for POST verification processing
      callbackURL: '/profile',

      // mobile handoff
      crossDevice: true,
      crossDeviceQRCode: true,
      crossDeviceSMS: true,
      
      // called when the verification is completed.
      onDone: (job) => {
        // token used to query jobs
        console.log("Scanning complete", { token: job.token });

        // An alternative way to update your system based on the 
        // results of the job. Your backend could perform the following:
        // 1. query jobs with the token
        // 2. store relevant job information such as the id and 
        //    success property into the user's profile
        fetch(`/yourapi/idv?job_token=${job.token}`);

        // Redirect to the next page based on the job success
        if( job.result.success){
          this.$route.push("/profile");
        }else{
          this.error = `Your identy was not verified`
        }
      },
      
      // theme
      theme: {
        name: 'avant',
      },
    });

    vouched.mount("#vouched-element");
  },
  methods: {
  }
};

</script>
