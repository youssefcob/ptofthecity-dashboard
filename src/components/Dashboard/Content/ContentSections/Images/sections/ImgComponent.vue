<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
const emit = defineEmits(['openModal']);

const props = defineProps<{
    // title:string,
    image: {
        title: string,
        path: string
    }
}>();

</script>

<template>
    <div class="wrapper">


        <div class="header">
            <h2>{{ image.title.charAt(0).toUpperCase() + image.title.slice(1) }} Image</h2>
            <Btn class="Add" @click="emit('openModal', image.title)">Add Image</Btn>
        </div>
        <div class="body">
            <img :src="image.path">
        </div>

    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 1rem;
    border-radius: $border-radius;
    background-color: $darkgrey;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

    }

    .body{
        img{
            width:20rem;
            height:auto;
        }
    }
}
</style>