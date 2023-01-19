<template>
  <!-- <div class="row">
    <div class="col-auto">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100 h-100" :src="jerry80s" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100 h-100" :src="jerry70s" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100 h-100" :src="jerry90s" alt="Third slide">
          </div>
        </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </div>
    </div>
  </div> -->
  <div class="carousel">
    <transition><img :src="state" alt="" :key="state" /></transition>
  </div>  
  <button @click="prev()">Previous</button>
  <button @click="next()">Next</button><br />  
</template>

<script>
import { defineComponent } from 'vue';
import { useCycleList } from '@vueuse/core';

export default  defineComponent({
  name: "Carousels",
  components: {
      
    },
  setup() {
    const { state, next, prev } = useCycleList([
      '/pictures/jerry70s.png',
      '/pictures/jerry80s.jpg',
      '/pictures/jerry90s.webp'
    ]);
    
    return {        
        state,
        next,
        prev,         
      }
  },  
})
</script>

<style scoped>
.carousel {
  position: relative;
  height: 200px;
}
img {
  /* width:100%; */
  position: absolute;
  height: 100%;
  object-fit: cover;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>