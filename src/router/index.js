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



import PrintTicket from '../views/PrintTicket.vue';




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
   
  ]
})

export default router
