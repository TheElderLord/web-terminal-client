<script>
import axios from 'axios';
import { useStateStore } from '../store';
import { SERVER_HOST } from '../constants';
import {SERVER_PORT} from '../constants';
export default {
    name:"rate-page",
    data() {
        return {
            rating: 0,
            rated:false
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    }
    ,
    computed: {
       
    

    },
    methods: {
        getRatingCode() {
            return this.stateStore.get_rating_code
        },
        
        getLang() {
            return this.stateStore.get_lang
        },

        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        selectRate(value) {
           
            this.rating = value;
        },
       
        async submit(){
            
            const orderNum = this.getRatingCode();
            console.log(orderNum)
            const mark = this.rating;
            const result = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/rate`,{
                orderNum:orderNum,
                rating:mark,
            })
            console.log(result);
            this.rated = true;

            setTimeout(()=>{
                this.$router.push('/')
            },2000)
            
        }


    },
    mounted() {
        console.log(this.getRatingCode())
    }

}
</script>
<template>
    <div class="md:container mx-auto justify-center items-center p-5 ">
        <div v-if="rated" class="container mx-auto text-center text-white text-3xl m-2 font-bold">
            <p class="leading-relaxed">{{getLang()==="kz"?"Баға қойғаныңызға рахмет"
                :getLang()==="ru"?"Спасибо за оценку":"Thank you for evaluation"}}</p>
        </div>
        <div class="rates text-center p-3 m-4 w-8/12 mx-auto bg-white bg-opacity-20 rounded-lg sm:w-10/12">
            <div class="rate text-white bg-green-700 py-7 my-5 rounded-xl text-xl text font-bold" :class="{selected :rating===5}" @click="selectRate(5)">
                {{getLang()==="kz" ? "Өте жақсы" : getLang()==="ru"?"Отлично": "Perfect"
            }}</div>
            <div class="rate text-white bg-yellow-400 py-7 my-5 rounded-xl text-xl font-bold" :class="{selected :rating===4}" @click="selectRate(4)">
                {{ getLang() === "kz" ? "Жақсы" : getLang() === "ru"?"Удовлетворительно":"Good" }}    
            </div>
            <div class="rate text-white bg-red-700 py-7 my-5 rounded-xl text-xl font-bold" :class="{selected :rating===2}" @click="selectRate(2)">
                {{ getLang()==="kz"?"Жаман":getLang()==="ru"?"Плохо":"Bad" }}
            </div>
            <div class="rate text-white bg-yellow-600 py-5 mt-14 mx-auto  rounded-xl text-xl font-bold" @click="submit()">
                {{ getLang() === "kz"?"Растау":getLang()==="ru"?"Подтвердить":"Submit" }}
            </div>
            <div class="rate text-white bg-yellow-600 py-5 mt-5 mx-auto  rounded-xl text-xl font-bold" @click="goBack()">
                {{ getLang()==="kz"?"Артқа":getLang()==="ru"?"Назад":"Back" }}
            </div>
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