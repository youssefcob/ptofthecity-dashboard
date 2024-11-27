<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import { onMounted, reactive, ref, type Ref } from 'vue';
import FileInputField from './FileInputField.vue';

const props = defineProps({
    list: {
        type: Array as () => string[],
    },
    placeHolder: {
        type: String,
        default: 'Add Images'
    }
});
const input = ref('');

const list: FormData = new FormData();

const namesList: Ref<string[]> = ref([]);
const fileInputField = ref<InstanceType<typeof FileInputField> | null>(null);

const emit = defineEmits(['input']);

const listInput: Ref<InstanceType<typeof InputField> | null> = ref(null);
const addToList = (data: FormData) => {
    // console.log(data);
    data.forEach((value, key) => {
        list.append(key, value);
        namesList.value.push(key);
        // console.log(key, value);

    });
    // console.warn('')
    // list.forEach((value, key) => {
    //     console.log(key, value);
    // });
    // console.warn('')

    fileInputField.value?.clear();

let frmData = new FormData();
    list.forEach((value, key) => {
        frmData.append('images[]', value);
    });

    emit('input', frmData);

}

const deleteItem = (item: string, event: any) => {
    event.stopPropagation(); // Stop event propagation
    list.delete(item);
    namesList.value = namesList.value.filter((value) => value !== item);
    // console.warn('form')
    list.forEach((value, key) => {
        console.log(key, value);
    });
    // console.warn('form')

    emit('input', list);

}



onMounted(() => {
    emit('input', list);
});
</script>
<template>
    <div class="addToList-wrapper">
        <!-- <InputField ref="listInput" placeHolder="Add To List" :value="input" @input="input = $event" /> -->
        <FileInputField :placeHolder="props.placeHolder" @input="addToList($event)" ref="fileInputField" />
        <!-- <div class="btn add" @click="addToList()">Add</div> -->


        <div class="list input-field">
            <!-- <div class="item" v-for="item in list"><span>{{ item }}</span> -->
            <div class="item" v-for="(value, index) in namesList" :key="index">
                <div class="btn delete" @click="deleteItem(value, $event)">-</div>

                <span>{{ value }}</span>
                <!-- <div class="btn delete" @click="deleteItem(value[0])">-</div> -->

            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
.addToList-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
        padding: 0.5rem;

        .btn {
            padding: 0.1rem 0.5rem;
            border-radius: 100vh;
        }
    }
}
</style>