<script>

import { useStateStore } from '../store'


// import img from "./img/icon/paper.png"

export default {
    name: 'change-lang',
    data() {
        return {
            services: '',
        }
    },
    setup() {
        const stateStore = useStateStore()
        return {
            stateStore,
        }
    },
    computed: {},
    methods: {
        setBranchId(branchId) {
            this.stateStore.set_branch(branchId)
        },
        setQueueId(id) {
            this.stateStore.set_queueId(id)
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

        goToSevicesPage(lang){
            this.stateStore.set_lang(lang);
            this.$router.push('/index')
        }
    },


    mounted() {
        

    },

}
</script>
<template>
    <div class="md:container mx-auto">
        <div class="title text-center">
            <h1>Bereke Bank-ке қош келдіңіз  <br>
                Добро пожаловать в Bereke Bank</h1>
        </div>
        <div class="services  mt-24">

            <div @click="goToSevicesPage('kz')" class="service text-white   rounded-lg flex items-center justify-center ">
                <div class="text-center">
                    Қазақша
                </div>
            </div>
            <div @click="goToSevicesPage('ru')" class="service text-white   rounded-lg flex items-center justify-center ">
                <div class="text-center">
                   Русский
                </div>
            </div>
            

            <!-- <div 
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() === "kz" ? "Kazakh" : getLang() === "ru" ? "Russia" :"England" }}</div>
            </div> -->
        </div>
        <div class="footer">
            <div class="queueFree">

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.title{
    h1{
        font-size: 65px;
    }
}
.service {
    width: 50%;
    cursor: pointer;
    padding: 1rem;
    background-color: #00BB00;
    font-size: 75px;
    margin: 1rem auto;

   
}
</style>
