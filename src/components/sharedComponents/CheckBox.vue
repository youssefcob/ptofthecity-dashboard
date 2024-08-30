<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: String
});

const emit = defineEmits(['change']);

let isChecked = false;

function handleCheckboxChange(event:any) {
    isChecked = event.target.checked;
    emit('change',isChecked);
}
</script>

<template>
    <div class="checkbox">
        <label for="checkbox">{{ props.label }}</label>
        <input type="checkbox" id="checkbox" @change="handleCheckboxChange" />
    </div>
</template>

<style scoped lang="scss">
.checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>