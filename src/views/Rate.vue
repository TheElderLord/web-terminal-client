<script>
import axios from 'axios'
import { useStateStore } from '../store'
import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED
const show_err = import.meta.env.VITE_SERVER_SHOW_ORDER_ERROR;
export default {
  name: 'rate-page',
  data() {
    return {
      rating: 0,
      rated: false
    }
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore
    }
  },
  computed: {},
  methods: {
    getRatingCode() {
      return this.stateStore.get_rating_code
    },

    getLang() {
      return this.stateStore.get_lang
    },

    goBack() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    },
    selectRate(value) {
      this.rating = value
    },

    async submit(mark) {
      const orderNum = this.getRatingCode()
      const currentPath = this.$route.path
      // console.log(orderNum)
      // const mark = this.rating;
      try {
        const result = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/rate`, {
          orderNum: orderNum,
          rating: mark
        })
        console.log(result)

        if(show_err == 'true'){
        const m = result.data.message
        if (m == 'REP') {
          this.stateStore.set_message(
            'RU=Прошло время оценки;KZ=Бағалау уақыты өтіп кеткен;EN=Ticket is already reported'
          )
          return this.$router.push('/messages')
           } 
         }
        // else {
          this.rated = true

          // console.log('Line 64 redirect rate page')
          setTimeout(() => {
            if (currentPath === '/rate') {
              this.goBack()
            }
          }, 5000)
        // }
     
      } catch {
        this.rated = true

        // console.log('Line 74 redirect rate page')
        setTimeout(() => {
          if (currentPath === '/rate') {
            this.goBack();
          }
        }, 5000)
        // this.stateStore.set_message(
        //   'RU=Произошла ошибка. Попробуйте поэже;KZ=Қате. Кейін қайталап көріңіз;EN=Error occured. Try again later'
        // )
        // return this.$router.push('/messages')
      }
    }
  },
  mounted() {
  this.checkRouteInterval = setInterval(() => {
    const currentPath = this.$route.path;

    // Check if the route is '/rate'
    if (currentPath === '/rate') {
      // console.log('Line 92 redirect rate page');
      this.goBack();

      // Clear the interval if the condition is met
      clearInterval(this.checkRouteInterval);
    }
  }, 24000);
},
beforeUnmount() {
  // Clear the interval when the component is destroyed or route changes
  clearInterval(this.checkRouteInterval);
}
}
</script>
<template>
  <div class="md:container mx-auto justify-center items-center p-5">
    <div
      v-if="rated"
      class="container mx-auto text-center text-white text-3xl my-5 mx-2 py-3 font-bold"
    >
      <p class="leading-relaxed">
        {{
          getLang() === 'kz'
            ? 'Баға қойғаныңызға рахмет'
            : getLang() === 'ru'
            ? 'Спасибо за оценку'
            : 'Thank you for evaluation'
        }}
      </p>
    </div>
    <div
      v-if="!rated"
      class="rates text-center p-3 m-4 w-8/12 mx-auto bg-white bg-opacity-20 rounded-lg sm:w-10/12"
    >
      <div
        class="rate text-white bg-green-700 py-7 my-5 rounded-xl text-xl text font-bold"
        :class="{ selected: rating === 5 }"
        @click="submit(5)"
      >
        {{ getLang() === 'kz' ? 'Өте жақсы' : getLang() === 'ru' ? 'Отлично' : 'Perfect' }}
      </div>
      <!-- <div
        class="rate text-white bg-yellow-400 py-7 my-5 rounded-xl text-xl font-bold"
        :class="{ selected: rating === 4 }"
        @click="submit(4)"
      >
        {{ getLang() === 'kz' ? 'Жақсы' : getLang() === 'ru' ? 'Удовлетворительно' : 'Good' }}
      </div> -->
      <div
        class="rate text-white bg-red-700 py-7 my-5 rounded-xl text-xl font-bold"
        :class="{ selected: rating === 2 }"
        @click="submit(2)"
      >
        {{ getLang() === 'kz' ? 'Жаман' : getLang() === 'ru' ? 'Плохо' : 'Bad' }}
      </div>
      <!-- <div class="rate text-white bg-yellow-600 py-5 mt-14 mx-auto  rounded-xl text-xl font-bold" @click="submit()">
                {{ getLang() === "kz"?"Растау":getLang()==="ru"?"Подтвердить":"Submit" }}
            </div> -->
    </div>
    <div
      class="rate text-white bg-yellow-600 py-5 mx-auto rounded-xl text-xl font-bold mt-15 text-center"
      @click="goBack()"
    >
      {{ getLang() === 'kz' ? 'Басты бет' : getLang() === 'ru' ? 'На главную' : 'To main page' }}
    </div>
  </div>
</template>

<style scoped>
.rate {
  cursor: pointer;
}

.selected {
  border: 5px white solid;
}
</style>