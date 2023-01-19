<template>
    <section>
      <div id="base-card">
        <h2>Submitted Experiences</h2>
        <div>
          <button>Load Submitted Experiences</button>
        </div>
        <ul>
          <survey-result
            v-for="result in results"
            :key="result.id"
            :name="result.name"
            :rating="result.feeling"
          ></survey-result>
        </ul>
      </div>
    </section>
  </template>
  
  <script> 
 import SurveyResult from './SurveyResult.vue';  
  export default {
    name: 'UserFeeling',
    props: ['results'],
    components: {
      SurveyResult,
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .base-card {
        margin: 2rem auto;
        max-width: 40rem;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
  </style>