<script>
import axios from 'axios'
import { useStateStore } from '../store'
import { BRANCH_ID } from '../constants'
import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'

export default {
  name: 'index2-page',
  data() {
    return {                                                                                                                                                                                                                                                                                                                                      
      services: ''
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
    setBranchId(branchId) {
      this.stateStore.set_branch(branchId)
    },
    setQueueId(id) {
      this.stateStore.set_queueId4(id)
    },
    getLang() {
      return this.stateStore.get_lang
    },
    getQueueId() {
      return this.stateStore.get_queueId4
    },
    async getServices() {
      console.log(this.getQueueId())
      try {
        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services`, {
          branchId: BRANCH_ID,
          queueId: this.getQueueId()
        })
        this.services = response.data.content
        console.log(this.services)
      } catch (err) {
        console.log(err)
      }
      // console.log(branchId)
    },
    setTicketBody(body) {
      this.stateStore.set_ticket_body(body)
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
    async goNext(service) {
      // console.log(service)
      try {
        if (
          service.maxServTime[0] === '' ||
          service.maxServTime[0] === null ||
          service.maxServTime[0] === undefined
        ) {
          this.setBranchId(BRANCH_ID)
          this.setQueueId(service.queueId[0])
          this.$router.push('/index4')
          return
        } else {
          try {
            const branchId = BRANCH_ID
            const queueId = service.queueId[0]
            const iin =  '?'
            const local = this.getLang()
            const requestBody = {
              branchId: branchId,
              queueId: queueId,
              iin: iin,
              local: local
            }
            this.stateStore.set_request_body(requestBody);
            this.$router.push('/ticket-type')
            // console.log(body);

            // const response = await axios.post(
            //   `http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/event-now`,
            //   body
            // )
            // console.log('Response', response)
            // if (response.data.message == 'Success') {
            //   this.setTicketBody(response.data.data)
            //   this.$router.push('/ticket-info')
            // } else {
            //   console.error('Error in API response:', response.data.message)
            // }
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
    }
  },
  mounted() {
    this.getServices()
    // this.checkRouteInterval = setInterval(() => {
    //   const currentPath = this.$route.path

    //   // Check if the route is '/rate'
    //   if (currentPath === '/index2') {
    //     // console.log('Line 116 redirect index2 page')
    //     this.goMain()

    //     // Clear the interval if the condition is met
    //     clearInterval(this.checkRouteInterval)
    //   }
    // }, 24000)
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be unmounted
    clearInterval(this.checkRouteInterval)
  }
}
</script>
<template>
  <div class="md:container mx-auto w-full h-full">
    <div class="services flex justify-center flex-wrap flex-row w-full h-1/5">
      <div
        v-for="service in services"
        :key="service.id"
        @click="goNext(service)"
        class="service text-white text-xl  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2"
      >
      <div v-if="service.cssclass[0]!=='' &&  service.cssclass[0]!=='mbutton'" class="icon">
      </div>
        
        <div class="text-center">{{ getFormatService(service.workName[0]) }}</div>
      </div>
      

      <!-- <div 
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() === "kz" ? "Kazakh" : getLang() === "ru" ? "Russia" :"England" }}</div>
            </div> -->
    </div>
    <div class="footer flex mt-20">
      <div class="backButton">
        <button class="rounded-lg" @click="goBack()">
          <i class="bi bi-arrow-left"></i>
          <span class="px-4"> {{ getLang() == 'kz' ? 'Артқа' : getLang() == 'ru' ? 'Назад' :
            'To main' }}</span>
        </button>
      </div>
      <div class="backButton">
        <button class="rounded-lg" @click="goMain()">
          <i class="bi bi-arrow-return-left"></i>
          <span class="px-4"> {{ getLang() == 'kz' ? 'Басты бетке' : getLang() == 'ru' ? 'На главную' :
            'To main' }}</span>
        </button>
      </div>
      
    </div>
  </div>
</template>
<style lang="scss" scoped>

.service {
  cursor: pointer;
  background-color: #00BB00;
  font-size: 43px;
  line-height: 1.5;
}
.backButton {
  button {
    color: #00BB00;

    padding: 1rem;
    font-size: 32px;

    i {
      color: blue;
    }
  }

}
.footer{
  position: absolute;
  top:85%
}
.icon {
  padding: 0.2rem;
}


.accounts .icon {
  background-image: url('../assets/icon/accounts.png');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}

.add-deposit .icon {
  background-image: url('../assets/icon/add_deposit.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.bars .icon {
  background-image: url('./img/icon/bars.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.bell .icon {
  background-image: url('./img/icon/bell.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.bellYellow .icon {
  background-image: url('./img/icon/bellYellow.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.boxXpaper .icon {
  background-image: url('./img/icon/boxXpaper.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.calendar .icon {
  background-image: url('./img/icon/calendar.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.card .icon {
  background-image: url('./img/icon/card.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.cardYellow .icon {
  background-image: url('./img/icon/cardYellow');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.checklistYellow .icon {
  background-image: url('./img/icon/checklistYellow.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.clips .icon {
  background-image: url('./img/icon/clips.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.loop .icon {
  background-image: url('./img/icon/loop.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.mech .icon {
  background-image: url('./img/icon/mech.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.paper2 .icon {
  background-image: url('./img/icon/paper2.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.paperCheck .icon {
  background-image: url('./img/icon/paperCheck.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.paperCheckYes .icon {
  background-image: url('./img/icon/paperCheckYes.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.paperwrite .icon {
  background-image: url('./img/icon/paperWrite.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.paperX .icon {
  background-image: url('./img/icon/paperX.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.paperXpost .icon {
  background-image: url('./img/icon/paperXpost.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.phone .icon {
  background-image: url('./img/icon/phone.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.post .icon {
  background-image: url('./img/icon/post.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.question .icon {
  background-image: url('./img/icon/question.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.questionYellow .icon {
  background-image: url('./img/icon/questionYellow.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.tagYellow .icon {
  background-image: url('./img/icon/tagYellow.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.text .icon {
  background-image: url('./img/icon/text.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.userWhite .icon {
  background-image: url('./img/icon/userWhite.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.userYellow .icon {
  background-image: url('./img/icon/userYellow.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.writeYellow .icon {
  background-image: url('./img/icon/writeYellow.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}
</style>