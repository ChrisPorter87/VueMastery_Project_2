<template>
<div> Hello {{ firstName }} {{ lastName }}</div>
</template>
<script>
export default {
    name: 'PersonGreeting',
    props: ['firstName', 'lastName'],
}
</script>

<style scoped></style>