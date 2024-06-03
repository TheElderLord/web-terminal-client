<script>
import { useStateStore } from '../store'
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED
export default {
  name: 'messages-page',
  data() {
    return {}
  },
  methods: {
    getLang() {
      return this.stateStore.get_lang
    },
    getMessage() {
      return this.stateStore.get_error_message
    },
    goBack() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    },
    formatted(val) {
      try {
        let result
        val.split(';').forEach((e) => {
          if (this.getLang() == 'kz' && e.includes('KZ=')) {
            result = e.replace('KZ=', '')
          } else if (this.getLang() == 'ru' && e.includes('RU=')) {
            result = e.replace('RU=', '')
          } else if (this.getLang() == 'eng' && e.includes('EN=')) {
            result = e.replace('EN=', '')
          }
        })
        return result
      } catch (err) {
        console.log(err)
      }
    },
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore,
    }
  },
  mounted() {
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/messages') {
        // console.log('Line 50 redirect messages page')
        this.goBack()

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 24000)
  },
}
</script>

<template>
  <main class="w-4/5 mx-auto">
    <div class="container mx-auto w-full h-64 mt-10">
      <div class="flex justify-center"><img src="../assets/warning.png" alt="" /></div>
      <div class="textBlock text-white text-3xl text-center py-5 mt-3">
        {{ formatted(getMessage()) }}
      </div>
      <!-- <div class="textBlock text-white text-3xl text-center py-5 ">dasfasdasdas</div> -->
    </div>
    <div class="buttonDiv">
      <div
        class="rate text-white 0 py-5 mx-auto rounded-xl text-xl font-bold mt-15 text-center"
        @click="goBack()"
      >
        {{ getLang() === 'kz' ? 'Басты бет' : getLang() === 'ru' ? 'На главную' : 'To main page' }}
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.rate{
  background-color: #00BB00;;
}
</style>