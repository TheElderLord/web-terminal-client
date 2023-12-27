<script>
import axios from 'axios'
import { useStateStore } from '../store'
import {BRANCH_ID} from '../constants';
import { SERVER_HOST } from '../constants';
import {SERVER_PORT} from '../constants';
export default {
    name:"index2-page",
    data() {
        return {
            services: ''
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    computed: {


    },
    methods: {
        setBranchId(branchId) {
            this.stateStore.set_branch(branchId);
        },
        setQueueId(id) {
            this.stateStore.set_queueId(id);
        },
        getLang() {
            return this.stateStore.get_lang
        },
        getQueueId(){
            return this.stateStore.get_queueId
        },
        async getServices() {
            // console.log(branchId)
            const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/services`,{
                branchId:BRANCH_ID, 
                queueId:this.getQueueId()
            });
            this.services = response.data.content;
            console.log(this.services)

        },
        getFormatService(service) {
            try {
                const arr = service.split(';');
                const result = this.getLang() === "kz" ? arr.find(el => el.includes("KZ")).replace("KZ=", '') :
                    this.getLang() === "ru" ? arr.find(el => el.includes("RU")).replace("RU=", '') : arr.find(el => el.includes("EN")).replace("EN=", '');
                return result;
            } catch (err) {
                console.log(err)
            }
        },
        async goNext(service) {
            // console.log(service)
            try {
                if (service.maxServTime === ' ' || service.maxServTime === null || service.maxServTime === undefined) {
                    this.setBranchId(BRANCH_ID)
                    this.setQueueId(service.queueId[0])
                    this.$router.push('/index4')
                    return
                }
                else {

                    // const response = await axios.post(`http://localhost:3000/event-now`, {
                    //     branchId: branchId,
                    //     queueId: service.queueId,
                    //     iin: (this.get_iin !== '' || this.get_iin !== undefined) ? this.get_iin : '?',
                    //     local: this.getLang()
                    // });
                    // if (response.data.message === 'Success') {
                    //     console.log('Success')
                    //     // this.$router.push('/print')
                    // }
                    try {
                        this.setBranchId(BRANCH_ID);
                        this.setQueueId(service.queueId[0]);
                        this.$router.push('/ticket-info');
                    } catch (err) {
                        console.log(err)
                    }
                }
            } catch (err) {
                console.log(err)
            }

        },
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }

    },
    mounted() {
        this.getServices();
    }
}
</script>
<template>
    <div class="md:container mx-auto">

        <div class="services flex justify-center flex-wrap flex-row  mt-24">

            <div v-for="service in services" :key="service.id" @click="goNext(service)"
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getFormatService(service.workName[0]) }}</div>
            </div>
            <div @click="goBack()"
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() == "kz" ? "Артқа" : getLang() == "ru" ? "Назад" : "Back" }}</div>
            </div>

            <!-- <div 
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() === "kz" ? "Kazakh" : getLang() === "ru" ? "Russia" :"England" }}</div>
            </div> -->


        </div>
    </div>
</template>
<style scoped>
.service {
    cursor: pointer;
}
</style>