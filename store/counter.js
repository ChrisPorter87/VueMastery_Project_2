import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const feeling = ref('')
  const reset = () => {
    count.value = 0;
  };
  const increaseCount = () => {
    count.value++;
  };
  const decreaseCount = () => {
    count.value--;
  };
  const add = () => {
    count.value = count.value + 5;
  };

  const subtract = () => {
    count.value = count.value - 5;
  };
  const oddOrEven = computed(() => {
    if (count.value % 2 === 0) {
      return "even";
    }
    return "odd";
    
  });
  const help = computed (() => {
    if(feeling.value === 'poor') {
      return "maybe they could use a hug!"
    }
  })

  return {
    oddOrEven,
    decreaseCount,
    increaseCount,
    count,
    subtract,
    add,
    reset,
    help
  };
});
