<template>
  <li>
    <p>
      <span class="highlight">{{ name }}</span> rated their feelings currently as
      <span :class="feelingClass">{{ feeling }}</span
      >.
    </p>
  </li>
</template>

<script>
export default {
  name: "SurveyResult",
  props: ["name", "feeling"],
  computed: {
    feelingClass() {
      return "highlight feeling--" + this.feeling;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

h3,
p {
  font-size: 1rem;
  margin: 0.5 0;
}
.highlight {
  font-weight: bold;
}
.feeling--poor {
  color: #b80056;
}
.feeling--average {
  color: #008327;
}
.feeling--excellent {
  color: #330075;
}
</style>
