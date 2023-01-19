<template>

<h3>{{ age }}</h3>
</template>

<script>
import { computed, onBeforeMount,  } from 'vue';
export default {
    props: ['firstName',
            'lastName', 
            'age' ],
    setup(props, context) {
        const uName = computed(function(){
            return props.firstName + '' + props.lastName;
        }
        )
        onBeforeMount(function() {
        
        });
        
    },
    computed: {
        userName() {
            return this.firstName + '' +this.lastName;
        }
    }
    
}
</script>