<template>
  <h1 class="text-center">Events for good</h1>
  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event"
      :event="event"
    ></EventCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import EventCard from "../../EventCard.vue";
import EventService from "../../EventService";

export default defineComponent({
  name: "newComponent",

  components: {
    EventCard,
  },
  setup() {
    const events = ref(null);    
    onMounted(() => {
      EventService.getEvents()
        .then((response) => {
          events.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return {
      events,
      
    };
  },
});
</script>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
