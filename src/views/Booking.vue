<script>
import { useStateStore } from '../store'
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED

export default {
  name: 'Booking-page',
  data() {
    return {}
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore,
    }
  },
  methods: {
    getlang() {
      return this.stateStore.get_lang
    },
    goReserve() {
      this.$router.push('/reserve-order')
    },
    goBook() {
      this.$router.push('/booking-order')
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goMain() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    },
  },
  mounted() {
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/booking') {
        //   console.log('Line 92 redirect rate page');
        this.goMain()

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 24000)
  },
  beforeUnmount() {
    clearInterval(this.checkRouteInterval)
  },
}
</script>

<template>
  <div class="md:container mx-auto">
    <div class="text-white text-4xl m-5 p-5 w-full rounded-lg flex justify-center items-center">
      {{ getlang() === 'kz' ? 'Броньдау' : getlang() === 'ru' ? 'Бронирование' : 'Reservation' }}
    </div>
    <div class="options mx-auto text-center p-5 mt-10 w-3/5">
      <div
        class="option text-white text-3xl m-5 p-5 bg-yellow-600 w-full rounded-lg flex justify-center items-center"
        @click="goReserve()"
      >
        <div class="in text-center">
          {{
            getlang() === 'kz' ? 'Броньдау' : getlang() === 'ru' ? 'Бронирование' : 'Reservation'
          }}
        </div>
      </div>
      <div
        class="option text-white text-3xl m-5 p-5 h-full bg-yellow-600 w-full rounded-lg flex justify-center items-center"
        @click="goBook()"
      >
        <div class="in text-center">
          {{
            getlang() === 'kz'
              ? 'Броньдалған билетті алу'
              : getlang() === 'ru'
                ? 'Получить забронированный билет'
                : 'Receive the reserved ticket'
          }}
        </div>
      </div>
      <div
        class="option text-white text-3xl m-5 p-5 bg-yellow-600 w-full rounded-lg flex justify-center items-center"
        @click="goBack()"
      >
        <div class="in text-center">
          {{ getlang() === 'kz' ? 'Артқа' : getlang() === 'ru' ? 'Назад' : 'Back' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option {
  cursor: pointer;
}
</style>
