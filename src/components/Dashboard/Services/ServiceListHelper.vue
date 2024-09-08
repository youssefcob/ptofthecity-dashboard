<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps({
    list: {
        type: Array as () => string[],
    }
});
const input = ref('');

const list = ref<string[]>(props.list ||[]);

const emit = defineEmits(['input']);

const listInput: Ref<InstanceType<typeof InputField> | null> = ref(null);
const addToList = () => {
    list.value.push(input.value);
    input.value = '';
    listInput.value?.clear();

    emit('input', list.value);
}

const deleteItem = (item: string,event:any) => {
    event.stopPropagation(); // Stop event propagation

    const index = list.value.indexOf(item);
    if (index > -1) { 
        list.value.splice(index, 1); 
    }

    emit('input', list.value);

}

onMounted(() => {
    emit('input', list.value);
});
</script>
<template>
    <div class="addToList-wrapper">
        <InputField ref="listInput" placeHolder="Add To List" :value="input" @input="input = $event" />
        <div class="btn add" @click="addToList()">Add</div>

    </div>

    <div class="list input-field">
        <div class="item" v-for="item in list"><span>{{ item }}</span>
            <div class="btn delete" @click="deleteItem(item,$event)">-</div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.addToList-wrapper {
    display: flex;
    gap: 2rem;
}

.list {
    width: 100%;
    max-width: 24rem;
    height: fit-content;
    min-height: 10rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;

    .item {
        display: flex;
        // justify-content:center;
        gap: 0.2rem;
        align-items: center;
        background-color: $darkgrey;
        border-radius: 10px;
        padding:0.5rem;

        .btn {
            padding: 0.1rem 0.5rem;
            border-radius: 100vh;
        }
    }
}
</style>