<script>
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED;
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED;
export default{
    methods:{
        getStart(){
            if(iin_req === "true"){
                this.$router.push('/iin')
            }
            else if(phone_req === "true"){
                this.$router.push('/phone')
            }
            else
            this.$router.push('/')
        }
    },
    mounted() {
        console.log(iin_req);
        console.log(phone_req)
        setTimeout(()=>{
            this.getStart()
        },30000);   
    },
}
</script>
<template>
    <div class="md:container mx-auto w-full h-full">
        <div class="image mx-auto flex justify-center">
            <img src="../assets/print.gif" alt="">
        </div>
    </div>
</template>