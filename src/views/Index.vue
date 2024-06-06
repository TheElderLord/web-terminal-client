<script>
import axios from 'axios'
import { useStateStore } from '../store'
import { BRANCH_ID } from '../constants'
import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'
export default {
  name: 'index-page',
  data() {
    return {
      services: [],
    }
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore,
    }
  },
  computed: {
      formattedServices(){
        return this.services.filter(e=> e.queueId[0]!=1007)
      }
  },
  methods: {
    setBranchId(branchId) {
      this.stateStore.set_branch(branchId)
    },
    setQueueId(id) {
      this.stateStore.set_queueId2(id)
    },
    setTicketBody(body) {
      this.stateStore.set_ticket_body(body)
    },
    getLang() {
      return this.stateStore.get_lang
    },
    getiin() {
      return this.stateStore.get_iin
    },
    async getServices() {
      try {
        // console.log(branchId)
        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services`, {
          branchId: BRANCH_ID,
          queueId: '?',
        })
        this.services = response.data.content
        console.log(this.services)
      } catch (err) {
        console.log(err)
      }
    },
    getFormatService(service) {
      try {
        const arr = service.split(';')
        const result =
          this.getLang() === 'kz'
            ? arr.find((el) => el.includes('KZ')).replace('KZ=', '')
            : this.getLang() === 'ru'
              ? arr.find((el) => el.includes('RU')).replace('RU=', '')
              : arr.find((el) => el.includes('EN')).replace('EN=', '')
        return result
      } catch (err) {
        console.log(err)
      }
    },
    goFree(){
      this.setBranchId(BRANCH_ID)
      this.setQueueId(1007)
      return this.$router.push('/iin-scaner')
    },
    async goNext(service) {
      console.log(service)
      try {
        if (
          service.maxServTime[0] === '' ||
          service.maxServTime[0] === null ||
          service.maxServTime[0] === undefined ||
          service.maxServTime[0] === '#max_serv_time#'
        ) {
          this.setBranchId(BRANCH_ID)
          this.setQueueId(service.queueId[0])
          if(service.workName[0].includes("Юридические лица")){
           return  this.$router.push('/index2')
          }
          return this.$router.push('/iin-scaner')
          // this.$router.push('/index2')
          
        } else {
          // this.setBranchId(BRANCH_ID)
          // this.setQueueId(service.queueId[0])
          try {
            const branchId = BRANCH_ID
            const queueId = service.queueId[0]
            const iin = this.getiin() ? this.getiin() : '?'
            let local = this.getLang()
            if (this.getLang == 'eng') {
              local = 'en'
            }
            const requestBody = {
              branchId: branchId,
              queueId: queueId,
              iin: iin,
              local: local,
            }
            // console.log(body);

            const response = await axios.post(
              `http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/event-now`,
              requestBody,
            )
            console.log('Response', response)
            if (response.data.message == 'Success') {
              this.setTicketBody(response.data.data)
              this.$router.push('/ticket-info')
            } else {
              console.error('Error in API response:', response.data.message)
            }
          } catch (error) {
            console.error('Error in API request:', error)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goMain() {
        this.$router.push('/')
    },
    goBook() {
      this.$router.push("/booking-order")
    },
    detectService(service) {
      // console.log(service.cssclass[0])
      if (service.cssclass[0].includes('red')) {
        return {
          backgroundColor: 'red', // Set your desired style here
          // Add more styles if needed
        }
      } else if (service.cssclass[0].includes('green')) {
        return {
          backgroundColor: 'green', // Set your desired style here
          // Add more styles if needed
        }
      } else {
        return {
          backgroundColor: '#ca8a04', // Set your desired style here
          // Add more styles if needed
        }
      }
    },
  },
  mounted() {
    this.getServices()
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/') {
        // console.log('Line 125 redirect index page')
        this.goMain()

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 24000)
  },
 
  beforeUnmount() {
    // Clear the interval when the component is about to be unmounted
    clearInterval(this.checkRouteInterval)
  },
}
</script>
<template>
  <div class="md:container mx-auto">
    <div class="services  flex  flex-col-reverse">
      <div  v-for="service in formattedServices" :key="service.id" @click="goNext(service)"
        class="service text-white rounded-lg flex items-center justify-center  m-2 " :class="service.cssclass[0]">

        <div class="serviceName text-center ">
          {{ getFormatService(service.workName[0]) }}
        </div>
      </div>

    

      <!-- <div 
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() === "kz" ? "Kazakh" : getLang() === "ru" ? "Russia" :"England" }}</div>
            </div> -->
    </div>
    <div @click="goBook()"
    class="book text-white text-lg  rounded-lg flex items-center justify-center mx-auto basis-5/12 w-2/4 ">
    <div class="icon w-1/4  h-full flex items-center justify-center p-6"><i class="bi bi-ticket"></i></div>
    <div class="text-center w-3/4">
      {{ getLang() == 'kz' ? 'Брондагы талонды алу' : getLang() == 'ru' ? 'Получения талона по онлайн-брони' :
        'Back' }}
    </div>
  </div>
  <div class="foot ">
    <div @click="goFree()" class="queueFree float-start flex">
        <div class="icon flex justify-center items-center">
            <i class="bi bi-person-wheelchair text-3xl"></i>
        </div>
        
        <div class="text px-4">
            Кезектен тыс <br>
            Без очереди
        </div>
    </div>
</div>
    <div class="footer">
      <div class="backButton">
        <button class="rounded-lg" @click="goMain()">
          <i class="bi bi-arrow-return-left"></i>
          <span class="p-4"> {{ getLang() == 'kz' ? 'Басты бетке' : getLang() == 'ru' ? 'На главную' :
            'To main' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.queueFree{
  position: absolute;
  top: 80%;
  background-color: #00BB00;
  color: white;
  padding: .5rem;
  font-size: 43px;
  border-radius: 1rem;
  .icon{
    i{
      font-size: 60px;
      padding: .5rem;
    }
   
  }
}
.service {
  cursor: pointer;

  padding: 1rem;
  background-color: #00BB00;
  line-height: 1.5;

  .icon {
    width: 100%;
    height: 100%;
  }

  .serviceName {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 70px;
    justify-content: center;
    align-items: center;
  }
}

.book {
  cursor: pointer;
  background-color: #00BB00;
  font-size: 43px;
  line-height: 1.5;


  .icon {
    background-color: #033dff;
  }
}

.backButton {
  position: absolute;
  top: 90%;

  button {
    color: #00BB00;

    padding: 1rem;
    font-size: 40px;

    i {
      color: blue;
    }
  }

}


</style>
