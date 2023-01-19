<template>
    <div class="alert" :class="alertTypeClass" role="alert">
        <h6 v-if="useHeader" class="p-0 m-0">{{ alertHeader }}</h6>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ComputedRef, computed } from 'vue';

    const BaseAlert = defineComponent({
        name: "BaseAlert",
        props: {
            alertHeader: { type: String, default: 'set alertHeader !' },
            alertType: { type: String, default: 'warning' },
            useHeader: { type: Boolean, default: true }
        },
        setup(props) {
            let alertTypeClass: ComputedRef<string> = computed((): string =>
                `alert-${props.alertType.toLowerCase()}`
            );

            return {
                alertTypeClass
            }
         }
    })
    export default BaseAlert;
</script>