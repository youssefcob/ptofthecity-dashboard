<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

// const props = defineProps({
//     id: Number
// });
const id = ref(0);
const emit = defineEmits(['update', 'cancel']);
const loading = ref(false);

let image= new FormData();
const submit = async () => {
    try{

    if(!id) return;
    loading.value = true;
    let form = new FormData();
    image.forEach((value,key) => {
        form.append('image', value);
    });
    console.log(form);
    const res = await Http.post(`content/campaign/image/${id.value}`, form, { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' });

    loading.value=false;
    emit('cancel');
    if(res.status === 201 || res.status === 200) {
        emit('update', res.data);
    } else {
        console.log(res);
    }

    loading.value=false;
}catch (e) {
    console.error(e);
    loading.value=false;
}


}

const assignId = (iden: number) => {
    id.value = iden;
}

defineExpose({
    assignId
});
</script>

<template>
    <div class="form-wrapper">
        {{ id }}
        <FileInputField placeHolder="Image" @input="image = $event"/>
        <Btn class="submit" @click="submit" :loading="loading">Submit</Btn>
    </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width:50vw;
    background-color: $grey;
    padding: 2rem;
    border-radius: 10px;
}
</style>