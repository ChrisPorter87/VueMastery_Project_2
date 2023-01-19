<template>
  <section>
    <div id="base-card" class="row mb-base">
      <form @submit.prevent="submitSurvey">
        <div class="form-control col-auto">
          <label for="name">What's your name?</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Type name"
            v-model.trim="enteredName"
          />
        </div>

        <h2>How are you doing today?</h2>

        <div class="form-control">
          <input
            type="radio"
            id="feeling-poor"
            value="poor"
            name="feeling"
            v-model="chosenFeeling"            
          />
          <label for="feeling-poor">Poor</label>
        </div>
        <div class="form-control">
          <input
            type="radio"
            id="feeling-average"
            value="average"
            name="feeling"
            v-model="chosenFeeling"
          />
          <label for="feeling-average">Average</label>
        </div>
        <div class="form-control">
          <input
            type="radio"
            id="feeling-excellent"
            value="excellent"
            name="feeling"
            v-model="chosenFeeling"
          />
          <label for="feeling-excellent">Excellent</label>
        </div>
        <div id="warning" v-if="invalidInput">
          <!-- <p v-else="!invalidInput" > -->
          <BaseAlert alert-type="danger" alert-header="">
            One or more input fields are invalid. Please check your provided
            data.
          </BaseAlert>
        </div>
        <div v-for="item in savedSurveyResults">
          <p :class="{ excellent: item.feeling }">
            {{ item.name }} is feeling rather {{ item.feeling }} today.
            {{ help(item.feeling) }}
          </p>
        </div>
        <button class="btn btn-secondary" role="button"  @click.invalidInput>Submit</button>
      </form>      
    </div>
  </section>
  <div>
    <div>
    <span>Type, the textarea will grow:</span>
    <textarea
      ref="textarea"
      v-model="input"
      class="resize-none"
      placeholder="What's on your mind?"
    />
  </div>

<button class="btn btn-secondary mb-base" @click="toggleImage" ref="el">{{ isHovered ? 'Click me you putz' : 'Whats your name?'}}</button>
<img id="rockImg" :src="rock" v-if="showImage"  />
</div>
</template>

<script>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import BaseAlert from "./BaseAlert.vue";
import { useCounterStore } from "../store/counter";
import { useElementHover, useTextareaAutosize } from '@vueuse/core';
export default {
  name: "Survey",
  components: {
    BaseAlert,
  },

  setup() {
    const editing = ref(false);
    const savedSurveyResults = ref([]);
    const enteredName = ref("");
    const chosenFeeling = ref(null);
    const invalidInput = ref(false);
    const helpConst = useCounterStore();
    const value = ref("");
    const showImage = ref(false)
    const el = ref<HTMLButtonElement>()
    const isHovered = useElementHover(el)    
    const { textarea, input } = useTextareaAutosize()
    // const surveyValidate = () => {
    //   if (enteredName.value === "" || !chosenFeeling.value) {
    //     invalidInput.value = true;
    //     return;
    //   }
    //   invalidInput.value = false;
    // };
    const toggleImage = () => {
      showImage.value = !showImage.value
    };
    const submitSurvey = () => {
      if (enteredName.value === "" || !chosenFeeling.value) {
        invalidInput.value = true;
        return;
      } else {
        invalidInput.value = false;
        const surveyResults = {
          name: enteredName.value,
          feeling: chosenFeeling.value,
        };
        savedSurveyResults.value.push(surveyResults);
        console.log(surveyResults);
      }
    };
    const help = (feeling) => {
      switch (feeling) {
        case 'poor':
        case 'average':  
          return "Maybe they could use a hug!";
        case 'excellent':
          return "Maybe you should be more like them!";
        default: 
          return '';    
      }      
    };

    return {
      submitSurvey,
      chosenFeeling,
      invalidInput,
      enteredName,
      savedSurveyResults,
      editing,
      help,
      computed,
      rock: "/pictures/rock.jpg",
      showImage,
      toggleImage,
      el,
      isHovered,
      textarea,
      input
    };
  },
};
</script>

<style scoped>

form {
  background-color:rgba(226, 245, 226, 0.3);
}
.form-control {
  margin: 0.5rem 0;
  background-color:rgba(226, 245, 226, 0.3);
  border: none;
}

input[type="text"] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
  background-color:rgba(226, 245, 226, 0.3);
}
.excellent {
  border-color: chartreuse;
  background-color: salmon;
}
.poor {
  border-color: black;
  background-color: black;
  color: azure;
}
label {
  width: 20rem;
}
</style>
