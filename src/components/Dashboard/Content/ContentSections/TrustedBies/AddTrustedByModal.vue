<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const loading = ref(false);

const emit = defineEmits(['close', 'submit']);

const form = {
    path: new FormData(),
    name: '',
}

const submit = async () => {
    let frm = modifyForm();
    loading.value = true;
    const res = await Http.post('trustedBy', frm, { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' });
    console.log(res)
    loading.value = false;
    emit('submit', res.data);
    emit('close');
}

const modifyForm = () => {
    let modifiedForm = new FormData();
    for (let key in form) {
        if (key === 'path') {
            form.path.forEach((value, key) => {
                modifiedForm.append('image', value);
            });
        } else {
            modifiedForm.append(key, form[key as keyof typeof form] as string);
        }
    }
    return modifiedForm;
}
</script>


<template>
    <div class="form-container">
        <InputField placeHolder="Name" @input="form.name = $event" />
        <FileInputField @input="form.path = $event" placeHolder="Image"/>
        <Btn @click="submit" :loading="loading">Submit</Btn>
        <Btn class="cancel" @click="emit('close')">Cancel</Btn>
    </div>
</template>

<style scoped lang="scss">
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding:1.5rem;
    background-color: $darkgrey;
}


</style>