<script>
import axios from 'axios'
import { useStateStore } from '../store'
import { SERVER_HOST } from '../constants';
import {SERVER_PORT} from '../constants';
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED;
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED;
export default {
    data() {
        return {
            resp: '',
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    methods: {
        getBranchId() {
            return this.stateStore.get_branch
        },
        getQueueid() {
            return this.stateStore.get_queueId;
        },
        getLang() {
            return this.stateStore.get_lang
        },
        getiin() {
            return this.stateStore.get_iin
        },
        getStart(){
            if(iin_req === "true"){
                this.$router.push('/iin')
            }
            else if(phone_req === "true"){
                this.$router.push('/phone')
            }
            else
            this.$router.push('/')
        },
        async print() {
            const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/services/print`,{
                // local: this.getLang(),
                local: "ru",
                soapBody:this.resp
            });
            if(response.status === 200)
            this.$router.push('/print')
        },

        async sendEvent() {
            try {
                const branchId = this.getBranchId() ? this.getBranchId() : '?';
                const queueId = this.getQueueid() ? this.getQueueid() : '?';
                const iin = this.getiin() ? this.getiin() : '?';
                const local = this.getLang();
                const body = {
                    branchId: branchId,
                    queueId: queueId,
                    iin: iin,
                    local: local
                }
                // console.log(body);

                const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/services/event-now`, body);
                console.log("Response",response)
                if (response.data.message == 'Success') {
                    this.resp = response.data.data;
                    console.log("This resp", this.resp);
                } else {
                    console.error('Error in API response:', response.data.message);
                }
            } catch (error) {
                console.error('Error in API request:', error);
            }
        },



    },
    mounted() {
        this.sendEvent();
        setTimeout(()=>{
            this.getStart()
        },30000);
    },

}
</script>
<template>
    <div class="md:container mx-auto p-4 text-center  bg-white bg-opacity-10 ">
        <div v-if="resp" class="infos w-3/5    mx-auto rounded-lg p-5">
            <div class="info text-white   flex justify-center items-center py-3">
                <div class="in text-center text-5xl leading-normal">{{ resp["cus:ticketno"][0] }}</div>
            </div>
            <div class="info text-white   flex justify-center items-center py-3">
                <div class="in text-center text-2xl leading-normal">{{ resp["cus:servicename"][0] }}</div>
            </div>
            <div class="info text-white  flex justify-center items-center py-3">
                <div class="in text-center text-2xl leading-normal">Код для оценки: {{ resp["cus:ordernum"][0] }}</div>
            </div>
        </div>
        <div class="buttons w-2/5 mx-auto mt-8">
            <div class="button text-white text-3xl bg-yellow-600 my-4 py-5 rounded-lg" @click="print()">
                 {{getLang()==="kz"?"Басып шығару":getLang()==="ru"?"Распечатать": "Print"}}</div>
            <div class="button text-white text-3xl bg-yellow-600 my-4 py-5 rounded-lg" @click="getStart()">
                {{ getLang()==="kz"?"Басты бетке":getLang()==="ru"?"На главную":"To main page" }}    
            </div>
        </div>
    </div>
</template>

<style scoped>
.button {
    cursor: pointer;
}
</style>