<script>
import { useStateStore } from '../store';
export default{
    name:"Booking-page",
    data(){
        return {}
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    methods:{
        getlang(){
            return this.stateStore.get_lang;
        },
        goReserve(){
            this.$router.push('/reserve-order')
        },
        goBook(){
            this.$router.push('/booking-order')
        },
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
}
</script>

<template>
        <div class="md:container mx-auto">
            <h1 class="text-white text-3xl">{{getlang()==="kz" ? "Броньдау":getlang()==="ru"?"Бронирование":"Reservation"}}</h1>
            <div class="options mx-auto text-center p-5 mt-10 w-3/5">
                <div class="option text-white text-3xl m-5 p-5 bg-yellow-600 w-full rounded-lg flex justify-center items-center" @click="goReserve()">
                    <div class="in text-center">{{getlang()==="kz" ? "Броньдау":getlang()==="ru"?"Бронирование":"Reservation"}}</div>
                </div>
                <div class="option text-white text-3xl m-5 p-5 h-full bg-yellow-600 w-full rounded-lg flex justify-center items-center" @click="goBook()">
                    <div class="in text-center">
                        {{getlang()==="kz" ? "Броньдалған билетті алу" : getlang() === "ru" ?
                    "Получить забронированный билет":"Receive the reserved ticket"}}
                    </div>
                </div>
                <div class="option text-white text-3xl m-5 p-5 bg-yellow-600 w-full rounded-lg flex justify-center items-center" @click="goBack()">
                    <div class="in text-center">{{getlang()==="kz" ? "Артқа":getlang()==="ru"?"Назад":"Back"}}</div>
                </div>
            </div>
        </div>
</template>

<style scoped>
.option{
    cursor: pointer;
}
</style>