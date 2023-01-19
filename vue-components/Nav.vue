<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid border col-auto">
        <div class="row">
          <router-link class="col font-weight-bold" :to="{name: 'about-page'}">About</router-link>
          <router-link class=" col font-weight-bold" :to="{name: 'home-page'}">Home</router-link>
          
          
        </div>
      </div>
    </nav>
    <div class="container">    
    <RouterView></RouterView>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "NavBar",
    setup() {
      const selectedTab = ref("");
      return {
        selectedTab,
        
      };
    },
  });
  </script>
  