import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Vue from 'vue';
import DefaultComponent from 'components/component';
import { createPinia } from 'pinia';
import { router } from "../../vue-components/router/index";

Vue.createApp({
    components: {
        DefaultComponent
    }
}).use(createPinia()).use(router).mount('#app');