<script>
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED
export default {
  methods: {
    getStart() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    }
  },
  mounted() {
    console.log(iin_req)
    console.log(phone_req)
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/print') {
        // console.log('Line 23 redirect print page')
        this.getStart();

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 4000)
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be unmounted
    clearInterval(this.checkRouteInterval)
  }
}
</script>
<template>
  <div class="md:container mx-auto w-full h-full">
    <div class="image mx-auto flex justify-center">
      <img src="../assets/print.gif" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container{
  background-color: rgb(232, 234, 235);
}
</style>