<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import Http from '@/mixins/Http';
import { title } from 'process';
import { ref } from 'vue';

const loading = ref(false);

const form = {
    first_name: '',
    last_name: '',
    title: '',
    image: new FormData(),
    schedule: '',
    occupation: '',
    bio: ''
}

const emit = defineEmits(['newStaff','cancel']);
const submit = async () => {
    let newForm = modifyForm();
    loading.value = true;
    const res = await Http.post('content/staff', newForm, { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' });

    loading.value=false;
    emit('cancel');
    if(res.status === 201) {
        emit('newStaff', res.data);
    } else {
        console.log(res);
    }
    setTimeout(() => {
        loading.value = false;
    }, 2000);
}

const modifyForm = () => {
    let modifiedForm = new FormData();
    for (let key in form) {
        if (key === 'image') {
           form.image.forEach((value,key) => {
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
        <div class="left">
            <InputField placeHolder="First Name" @input="form.first_name = $event" />
            <InputField placeHolder="Last Name" @input="form.last_name = $event"/>
            <InputField placeHolder="title" @input="form.title = $event" />
            <InputField placeHolder="Schedule" @input="form.schedule = $event" />
            <InputField placeHolder="Occupation" @input="form.occupation = $event"/>
            <FileInputField placeHolder="Image" @input="form.image = $event"/>

        </div>
        <div class="right">
            <InputField height="19rem" placeHolder="Bio" @input="form.bio = $event" />
            <div class="btn-container">
                <Btn :loading="loading" @click="submit()">Submit</Btn>
                <Btn class="cancel" @click="emit('cancel')">Cancel</Btn>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

.form-container {
    display: flex;
    gap: 2rem;
    padding:2rem;
    background-color: $darkgrey;
    border-radius: 10px; 
    .left {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .right {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .btn-container {
            width:100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
}

</style>