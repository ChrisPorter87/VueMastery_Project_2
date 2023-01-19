import * as VueRouter from "vue-router";

import About from "../router/views/AboutView.vue";
import Home from "../router/views/Home.vue";
import EventDetails from "../router/views/EventDetails.vue"

const routes = [
    {name: "about-page", 
    path: "/views/AboutView.vue", 
    component: About
    },
    {name: "home-page", 
    path: "/views/Home.vue", 
    component: Home
    },
    {name: "event-details", path: "/views/EventDetails/:id", component: EventDetails, props: true
    }    
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory("/views/Home.vue"),
    routes
});