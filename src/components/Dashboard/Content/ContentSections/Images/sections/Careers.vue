<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';

const emit = defineEmits(['openModal']);

const props = defineProps<{
    images: any[]
}>();
</script>

<template>
    <div class="wrapper">


        <div class="header">
            <h2>Career Image</h2>
            <Btn class="Add" @click="emit('openModal','careers')">Add Image</Btn>
        </div>
        <div class="body">
            <div class="card" v-for="image in images">{{ image }}</div>
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

    }
}
</style>