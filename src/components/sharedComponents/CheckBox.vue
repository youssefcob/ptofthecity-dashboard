<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: String,
    checked: Boolean
});

const emit = defineEmits(['change']);

let isChecked = ref(props.checked);

function handleCheckboxChange(event:any) {
    isChecked.value = event.target.checked;
    emit('change',isChecked.value);
}

onMounted(() => {
    emit('change',isChecked.value);
});
</script>

<template>
    <div class="checkbox">
        <label for="checkbox">{{ props.label }}</label>
        <input type="checkbox" id="checkbox" :checked="isChecked" @change="handleCheckboxChange" />
    </div>
</template>

<style scoped lang="scss">
.checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>