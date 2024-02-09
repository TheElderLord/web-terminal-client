<script>
import { useStateStore } from '../store';
export default {
    data() {
        return {
            IIN: '',
            error: false
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    computed: {
        setIIN() {
            try {
                return this.stateStore.set_iin(this.IIN);
            } catch (err) {
               return console.log(err)
            }
        },
    },
    methods: {
        getLang() {
            return this.stateStore.get_lang;
        },
        addNum(num) {
            if (this.IIN.length < 12) {
                this.IIN += num;
               
            }
            
        },
        delNum() {
            this.IIN = this.IIN.slice(0, -1);
            this.IIN =  this.IIN.replace(/[^0-9]/g, "")
        },
        submit() {
            if (this.error) {
                return
            }
            try {
                const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED;
                // if (this.IIN !== "020214501513") {
                //     this.error = true;
                //     return;
                // }
                if (this.IIN.length <12) {
                    this.error = true;
                    return;
                }
               
                // console.log(phone_req)
                // console.log(phone_req === "true")

                this.setIIN;
                if (phone_req == "true") {
                    this.$router.push('/phone');
                } else {
                    
                    this.$router.push('/');
                }
            } catch (err) {
                console.log(err)
            }


        },
        isCorrect() {
            if (this.IIN.length > 0 && this.IIN.length < 12 || this.IIN.length > 12) {
                return true;
            }
            else if (this.error) {
                return true;
            }
        },
        goRating() {
            this.$router.push('/rating-code');
        },
        goBooking(){
            this.$router.push('/booking');
        },
        inputFocus() {
            this.$refs.iininput.focus(); // Focus on the input element with the ref "iininput"
        }

    },
    mounted() {
    this.$refs.iininput.focus();
    document.addEventListener('keydown', (e) => {
        try {
            switch (e.key) {
                case "Backspace":
                    this.delNum();
                    break;
                case "Enter":
                    this.submit();
                    break;
                default: 
                this.IIN =  this.IIN.replace(/[^0-9]/g, "")
            }
        } catch (err) {
            console.log(err);
        }
    });
}

}
</script>
<template>
    <div class="md:container md:mx-auto p-3">


        <div class="numpad text-center w-3/5 md:mx-auto bg-white bg-opacity-20 rounded-lg p-3">
            <div class="numpadHeader text-center m-3 ">

                <h1 class="text-white text-2xl m-3">{{ getLang() === "kz" ? "ЖСН енгізіңіз" : getLang() === "ru"
                    ? "Введите ИИН" : "Enter the IIN" }}</h1>
                <input ref="iininput" type="text" name="IIN" id="IINInp" class="w-full h-12 rounded-md text-xl text-center" v-model="IIN" maxlength="12">
                <div v-if="isCorrect()" class="error-text text-red-500 text-xl mt-2 mb-0 p-0">{{ getLang() === "kz" ? "Дұрыс емес ЖСН"
                                    : getLang() === "ru" ? "Неправильный ИИН" : "Invalid IIN" }}</div>
            </div>
            <div class=" grid grid-cols-3 gap-4 ">
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(1)">1</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(2)">2</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(3)">3</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(4)">4</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(5)">5</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(6)">6</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(7)">7</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(8)">8</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(9)">9</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white flex items-center justify-center"
                    @click="delNum()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(0)">0</div>
                <div class="keys  h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="submit()">OK</div>

            </div>

        </div>

        <div class="md:container md:mx-auto text-white  mt-3 flex justify-center">
            <div class="keys flex items-center justify-center m-4">
                <div @click="inputFocus()" class="text-center  bg-yellow-600  text-xl p-5 rounded-lg">{{ getLang() === "kz" ? "ЖСН сканерлеу" : getLang() ===
                    "ru"
                    ? "Сканировать ИИН" : "Scan the IIN" }}</div>
            </div>


            <div class="keys flex items-center justify-center m-4">


                <div class="text-center  bg-yellow-600 text-xl p-5 rounded-lg" @click="goRating()">{{ getLang() === "kz"
                    ? "Қызмет көрсету сапасын бағалау" : getLang() === "ru"
                        ? "Оценка качества обслуживания" : "Rate the quality of service" }}</div>

            </div>
            <div class="keys flex items-center justify-center m-4">


                <div class="text-center  bg-yellow-600 text-xl p-5 rounded-lg" @click="goBooking()">{{ getLang() === "kz"
                    ? "Броньдау" : getLang() === "ru"
                        ? "Бронирование" : "Reservation" }}</div>

            </div>
        </div>

    </div>
</template>


<style  scoped>
.keys {
    cursor: pointer;


}
</style>

