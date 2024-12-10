<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';


const props = defineProps({
    images: Array
})

const type = ref('')

const loading = ref(false)

let form = new FormData();

const emit = defineEmits(['newImage']);

// console.log(localStorage.getItem('token'));
const handleImageInput = (e: FormData) => {
    let frm = new FormData();
    form = e as FormData;
    for (let [key, value] of form.entries()) {
        console.log(key, value);
        if (value) {
            frm.set('image', value);
            // console.log(value);
            break;
        }
    }
    frm.set('title', type.value);

    form = frm;
}

const submit = async () => {
    loading.value = true;
    console.log(form);

    const res = await Http.post(`content/images`, form, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.value = false;
    if (res.status === 200) {
        console.log(res.data);
        emit('newImage', res.data);
    } else {
        console.log(res);
        alert(res);
    }
}

defineExpose({
    type
})

</script>
<template>

    <div class="wrapper">
        <h1>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</h1>
        <FileInputField placeHolder="Image" @input="handleImageInput($event)" />
        <Btn class="Add" :loading="loading" @click="submit()">Add Image</Btn>
    </div>

</template>

<style lang="scss" scoped>
.wrapper {
    padding: 1rem;
    border-radius: $border-radius;
    background-color: $darkgrey;
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;


}
</style>