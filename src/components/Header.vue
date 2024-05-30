
<template>

   
    <div class="container  flex   h-full w-full md:mx-auto ">
        <div class="logo  bg-contain bg-center  h-full basis-1/4">
          
        </div>
        <div class="headerText  h-full  flex items-center justify-center basis-1/2 ">
           <div class="text-3xl py-6 text-white text-center" > {{ getLang() === "kz" 
            ? "Қазақстан Республикасы Қаржы министрлігінің Мемлекеттік Кірістер Комитеті" 
            : getLang() === "ru" ? "Комитет Государственных Доходов Министерства финансов Республики Казахстан" 
            :"State Revenue Committee Ministry of Finance of the Republic of Kazakhstan" }}</div> 
        </div>
        <div class="langs text-white  h-full flex justify-between basis-1/6" >
            <div class="lang  h-full   flex items-center justify-center mx-1" @click='setLang("kz")'>
                <div class="text-center  bg-yellow-600  py-4 px-5 ">KZ</div>
            </div>
            <div class="lang  h-full  flex items-center justify-center mx-1" @click='setLang("ru")'>
                <div class="text-center  bg-yellow-600 py-4 px-5">RU</div>
            </div>
            <div class="lang  h-full  flex items-center justify-center mx-1" @click='setLang("eng")'>
                <div class="text-center  bg-yellow-600 py-4 px-5">ENG</div>
            </div>
        </div>
    </div>

</template>

<script>
import { useStateStore } from '../store'
export default {
    data(){
        return{
            
        }
    },
    setup(){
        const stateStore = useStateStore();
        return{
            stateStore
        }
    },
    computed:{
       
    },
    methods:{
        setLang(lang){
            console.log(lang)
            this.stateStore.set_lang(lang)
        },
        getLang(){
            return this.stateStore.get_lang
        }
    }

}
</script>

<style scoped>


.logo{
    
    background: url('../assets/icons/logo.png') no-repeat;
    background-size: 40%;
    background-position: center;
}
.lang{
    cursor: pointer;
}

</style>