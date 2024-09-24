<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';


const props = defineProps<{
    whoWeAre: any
}>();
</script>

<template>

<div class="wrapper">

    <InputField placeHolder="Number of Clinics" :value="props.whoWeAre.clinics" />
</div>
</template>

<style scoped lang="scss">
.wrapper{
    padding:2rem;
    background-color: $darkgrey ;
}
</style>