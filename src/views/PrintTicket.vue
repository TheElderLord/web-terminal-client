<script>
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED
import axios from 'axios'
import { useStateStore } from '../store'
// import { BRANCH_ID } from '../constants'
import { SERVER_HOST, SERVER_PORT } from '../constants'

export default {

  setup() {
    const stateStore = useStateStore()
    return {
      stateStore,
    }
  },
  methods: {
    getStart() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    },
    async print() {
            try {
                const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/print`, {
                    local: this.stateStore.get_lang,
                    // local: 'ru',
                    soapBody: this.stateStore.get_ticket_body,
                })
                if (response.status === 200) this.$router.push('/print')
            } catch (err) {
                console.log(err)
            }
        },
  },
  mounted() {
   this.print();
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