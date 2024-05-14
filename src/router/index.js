import { createRouter, createWebHistory } from 'vue-router'
import IIN_Input from '../views/IIN_Input.vue';
import Phone_Num from '../views/Phone_Num.vue';

import Index from '../views/Index.vue';
import Index2 from '../views/Index2.vue';
import Index3 from '../views/Index3.vue';
import Index4 from '../views/Index4.vue';

import TicketInfo from '../views/TicketInfo.vue';

import Booking from '../views/Booking.vue';
import Booking_order from '../views/Booking_order.vue';
import Reserve_order from '../views/Reserve_order.vue';


import Rating_code from '../views/Rating_code.vue';
import Rate from '../views/Rate.vue';

import Messages from '../views/Messages.vue'

import PrintTicket from '../views/PrintTicket.vue';
import Slide from '../views/Slide.vue';


const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED;
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED;




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name:'index',
      component: Index,
      props: true
     
    },
    {
      path: '/index2',
      name:'index2',
      component: Index2,
      props: true
    },
    {
      path: '/index3',
      name:'index3',
      component: Index3,
      props: true
    },
    {
      path: '/index4',
      name:'index4',
      component: Index4,
      props: true
    },
    {
      path: '/ticket-info',
      name:'ticket-info',
      component: TicketInfo,
      props: true
    },
    {
      path: '/print',
      name: 'print-ticket',
      component: PrintTicket,
      props: true

    },
    {
      path: '/iin',
      name: 'IIN',
      component: IIN_Input,
      props: true

    },
    {
      path: '/phone',
      name: 'phone',
      component: Phone_Num,
      props: true
      
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking,
      props: true

    },
    {
      path:'/booking-order',
      name: 'booking-order',
      component:Booking_order
    },
    {
      path:'/reserve-order',
      name: 'reserve-order',
      component:Reserve_order
    },
    {
      path: '/rating-code',
      name: 'rating-code',
      component: Rating_code,
      props: true

    },
    {
      path: '/rate',
      name: 'rate',
      component: Rate,
      props: true

    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
      props: true

    },
    {
      path: '/slide',
      name: 'Slide',
      component: Slide,
      props: true

    },

    
   
  ]
})


let initialRouteSet = false;

router.beforeEach((to, from, next) => {
  if (!initialRouteSet) {
    let initialRoute = 'index'; // Default route

    if (iin_req === 'true') {
      initialRoute = 'IIN';
    } else if (phone_req === 'true') {
      initialRoute = 'phone';
    }

    // Redirect to the initial route
    next({ name: initialRoute });

    // Unregister the navigation guard to prevent further redirections
    initialRouteSet = true;
  } else {
    // Continue with the navigation
    next();
  }
});
export default router
