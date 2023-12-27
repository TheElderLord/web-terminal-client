<script setup>
import { onBeforeMount } from 'vue';
import Header from './components/Header.vue';
import { createRouter, createWebHistory } from 'vue-router';

import IIN_Input from './views/IIN_Input.vue';
import Index from './views/Index.vue';
import Phone_Num from './views/Phone_Num.vue';


const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED;
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED;

const router = createRouter({
  history: createWebHistory(),
  routes: [{ name: 'iin', path: '/iin', component: IIN_Input },
  { name: 'index', path: '/', component: Index },
  {name:'phone',path:'/phone',component:Phone_Num}
 
  ] // Add your routes here
});

onBeforeMount(() => {
 if (iin_req == "true" ) {
   
    // Assuming you have a route named 'IIN'
    router.push({ name: 'iin' });
  }
  else if (phone_req == "true" ){
    router.push({ name: 'phone' });
  }
  else {
    // Assuming you have a route named 'index'
    router.push({ name: 'index' });
  }
});
</script>

<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="rout">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@import url('./assets/main.css');

* {
  padding: 0;
  margin: 0;
}

.header {
  width: 100vw;
  height: 20vh;
}

.rout {
  width: 100vw;
  height: 80vh;
}

/* Your styles go here */</style>
