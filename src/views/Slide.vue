<script>

import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
export default {
  name: 'slide-page',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
        items:[
            {
                src:"src/assets/KGD.jpg"
            }
        ]
    }
  },
  methods: {
    swap() {
      this.$router.push('/iin')
    },
  },
  mounted() {
   
  },
  beforeMount(){
    // document.addEventListener('mousemove', this.swap)
    document.addEventListener('keydown', this.swap)
  },
  beforeUnmount() {
    // document.removeEventListener('mousemove', this.swap)
    document.removeEventListener('keydown', this.swap)
  },
}
</script>

<template>
    <Carousel id="car" :autoplay="3000" :wrap-around="true">
        <Slide v-for="slide in items" :key="slide">
          <div class="carousel__item">
            <img :src=slide.src alt="">
          </div>
        </Slide>
    
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
</template>
<style scoped>

.carousel__slide{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
}
.carousel__item img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
}
#car{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    
}
</style>
