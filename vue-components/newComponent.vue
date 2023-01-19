<template>
  <div>
    <div v-if="!speech.isSupported">
      Your browser does not support SpeechSynthesis API,
      <a
        href="https://caniuse.com/mdn-api_speechsynthesis"
        target="_blank"
      >more details</a>
    </div>
    <div v-else>
      <label class="font-bold mr-base">Spoken Text</label>
      <input v-model="text" class="!inline-block ml-base" type="text">

      <br>
      <label class="font-bold mr-2">Language</label>
      <div bg="$vp-c-bg" border="$vp-c-divider-light 1" inline-flex items-center relative rounded>
        <i i-carbon-language absolute left-2 opacity-80 pointer-events-none />
        <select v-model="voice" px-8 border-0 bg-transparent h-9 rounded appearance-none>
          <option bg="$vp-c-bg" disabled>
            Select Language
          </option>
          <option
            v-for="(voice, i) in voices"
            :key="i"
            bg="$vp-c-bg"
            :value="voice"
          >
            {{ `${voice.name} (${voice.lang})` }}
          </option>
        </select>
        <i i-carbon-chevron-down absolute right-2 opacity-80 pointer-events-none />
      </div>

      <div class="mt-2">
        <button
          :disabled="speech.isPlaying.value"
          @click="play"
        >
          {{ speech.status.value === 'pause' ? 'Resume' : 'Speak' }}
        </button>
        <button :disabled="!speech.isPlaying.value" class="orange" @click="pause">
          Pause
        </button>
        <button :disabled="!speech.isPlaying.value" class="red" @click="stop">
          Stop
        </button>
      </div>
    </div>
  </div>
  <button @click="increaseCount" class="btn btn-primary me-base">
    <Icon name="circle-plus" class="me-extra-tight" width="28" height="28" />Add One
  </button>
  <button @click="add" class="btn btn-primary me-base">
    <Icon name="circle-plus" class="me-extra-tight" width="28" height="28" />Add 5
  </button>
  <button @click="decreaseCount" class="btn btn-primary me-base">
    <Icon name="minus" class="me-extra-tight" width="28" height="28" />Subtract One
  </button>
  <button @click="subtract" class="btn btn-primary me-base">
    <Icon name="minus" class="me-extra-tight" width="28" height="28" />Subtract 5
  </button>
  <button @click="reset" class="btn btn-primary me-base" width="28" height="28">
    Reset Value
  </button>
  <h3>The count is</h3>
  <h3>{{ count }}</h3>
  <p>this counter is {{ oddOrEven }}</p>
  <hr />
  <div>
    <h3>Edit counter:</h3>
    <input v-model="count" type="number" />
  </div>

  <div
    class="alert alert-danger fade"
    :class="{ show: isCountLessThanZero }"
    v-show="count < 0"
    role="alert"
    id="alert"
    width="100px"
  >
    The count shouldn't go below zero! Please add to the count immediately
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>

  <UserData :first-name="firstName" :last-name="lastName"></UserData>

  <!-- <div>
    <input type="text" placeholder="First Name" v-model="firstName" />
    <input type="text" placeholder="Last Name" v-model="lastName" />
  </div> -->

  <PersonGreeting :firstName="firstName" :lastName="lastName" />

  <a
    class="cf-dropdown btn btn-dark dropdown-toggle shadow-none"
    href="#"
    role="button"
    id="dropdownMenuLink"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    What is your favorite bird?&nbsp;
    <Icon name="caret-down" class="filter-white animated-caret" /><br />
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li>
      <a class="dropdown-item" href="javascript:void(0)" @click="bird = 'quetzal'">Quetzal</a>
    </li>
    <li>
      <a class="dropdown-item" href="javascript:void(0)" @click="bird = 'hawk'">Hawk</a>
    </li>
    <li>
      <a class="dropdown-item" href="javascript:void(0)" @click="bird = 'cassowary'"
        >Cassowary</a
      >
    </li>
    <li>
      <a class="dropdown-item" href="javascript:void(0)" @click="bird = 'bop'">Bird of paradise</a>
    </li>
  </ul>

  <div id="birds">
    <img v-show="bird === 'quetzal'" :src="quetzal" style="width: 25%" alt="" />
    <img v-show="bird === 'cassowary'" :src="cassowary" style="width: 25%" alt="" />
    <img v-show="bird === 'hawk'" :src="hawk" style="width: 25%" alt="" />
    <img v-show="bird === 'bop'" :src="bop" style="width: 25%" alt="" />
  </div>
  
  <Carousels />
</template>

<script lang="ts">
import UserData from "./UserData.vue";
import { ref, defineComponent, watch, onMounted } from "vue";
import PersonGreeting from "./PersonGreeting.vue";
import Icon from "crutch-vue/components/Icon";
import { useCounterStore } from "../store/counter";
import { storeToRefs } from "pinia";
import Carousels from './carousel.vue';
import { useSpeechSynthesis } from "@vueuse/core";
export default defineComponent({
  name: "newComponent",

  components: {
    Icon,
    PersonGreeting,
    UserData,
    Carousels
},
  setup() {
    const storeCounter = useCounterStore();
    const firstName = ref("");
    const lastName = ref("");
    const bird = ref("");
    const isCountLessThanZero = ref(false);
    const { add, subtract, reset, increaseCount, decreaseCount } = useCounterStore();
    const { oddOrEven, count } = storeToRefs(storeCounter);
    const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
    const text = ref('Hello,everyone! Good Morning!')
    const speech = useSpeechSynthesis(text, {
      voice,
    })  
    let synth: SpeechSynthesis
    const voices = ref<SpeechSynthesisVoice[]>([])

    onMounted(() => {
      if (speech.isSupported.value) {
        setTimeout(() => {
          synth = window.speechSynthesis
          voices.value = synth.getVoices()
          voice.value = voices.value[0]
        })
      }
    })
    const play = () => {
      if (speech.status.value === 'pause') {
        console.log('resume')
        window.speechSynthesis.resume()
      }
      else {
        speech.speak()
      }
    }
    const pause = () => {
  window.speechSynthesis.pause()
    }
    const stop = () => {
  window.speechSynthesis.cancel()
    }
    watch(count, (newValue) => {
      if (newValue < 0) isCountLessThanZero.value = true;
    });

    return {
      firstName,
      lastName,
      count,
      isCountLessThanZero,
      hawk: "/pictures/hawk.jpg",
      quetzal: "/pictures/quetzal.jpg",
      cassowary: "/pictures/cassowary.jpg",
      bop: "/pictures/BOP.jpg",      
      bird,
      UserData,
      add,
      subtract,
      reset,
      oddOrEven,
      increaseCount,
      decreaseCount,
      pause, 
      play, 
      stop,
      voice,
      voices,
      speech,
      text
    };
  },
});
</script>

<style lang="scss">
p {
  color: orange;

  &:hover {
    color: blue;
    font-family:'Courier New', Courier, monospace;
    border: black;
    font-weight: bolder;
    
     }

  span {
    color: red;
  }
}

.btn {
  padding: 20px;
  margin: auto;
}
.birds {
  border:crimson
}
</style>
