<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>A Super cool and awesome application</h1>
      </div>
    </div>
    <NavBar></NavBar>
    <!-- <p><button @click="emit('add-count', 1)">Add</button>
    <button @click="emit('reset-count')">Reset</button>
    </p> -->
    <div class="row">
      <div class="col">        
        <input v-model="message" placeholder="" />
        <p >The meaning of life is: {{ message }}</p>
      </div>
    </div>
    
    <Survey></Survey>
    <button class="btn btn-primary mb-base"            
            @click="toggle"
            :style="{backgroundColor: isActive ? 'green' : 'red'}"
            >{{ isActive ? 'ON' : 'OFF' }}</button>
    <div class="row">
      <div class="col">
        <NewComponent></NewComponent>
        <div class="row">
          <div v-for="items in savedSurveyResults" class="col-4 col-xxxl-3">
            <SurveyResult :UserFeeling="items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import "crutchstrap/js/alert";
import "crutchstrap/js/dropdown";
import UserData from "./UserData.vue";
// @ts-ignore
import TemplateRef from "./newTemplate.vue";
// @ts-ignore
import NewComponent from "./newComponent";
import { useCounterStore } from "../store/counter";
import Survey from "./Survey.vue";
import SurveyResult from "./SurveyResult.vue";
import Carousel from "./carousel.vue";
import NavBar from "./Nav.vue";

const DefaultComponent = defineComponent({
  name: "DefaultComponent",
  components: {
    // register other components here
    NewComponent,
    TemplateRef,
    UserData,
    Survey,
    SurveyResult,
    Carousel,
    NavBar
  },
  props: [],
  setup() {
    const modal = ref(false);
    const modalRef = ref(null)
    const storeCounter = useCounterStore();
    const message = ref("");
    const isActive = ref(false)
    const defaultRef = ref("this value is reactive");
    const savedSurveyResults = ref([]);
    const testNumbers = [3,1,2, -20, -20.1, 69];
    // const emit = defineEmits<{
    //   (event: 'add-count', num: number): void;
    //   (event: 'reset-count'): void;
    // }>()
    const getMin = (numbers: any) => {
      if(!numbers.length) {
        throw new Error('Should not be an empty array')
      }
 
      for (let i=0; i < numbers.length; i++) {
        let outerElement = numbers[i];
        for (let j = i + 1; j < numbers.length; j++){
          let innerElement = numbers[j];

          if(outerElement> innerElement) {
            numbers[i] = innerElement;
            numbers[j] = outerElement;

            outerElement = numbers[i];
            innerElement = numbers[j];

            }
        }
      }

      return numbers[0];
    } 
    const min = getMin(testNumbers);
    console.log(min);
    const toggle = () => {
      isActive.value = isActive.value ? false :true;
    }
    return {
      storeCounter,
      defaultRef,
      message,
      computed,
      savedSurveyResults,
      getMin,
      isActive,
      toggle,
      modal,
      modalRef,
      
    };
  },
});

export default DefaultComponent;
</script>

<style lang="scss">
body {
  background-color:rgba(226, 245, 226, 0.3);
}
h2 {
  font-size: 20px;
}
</style>
