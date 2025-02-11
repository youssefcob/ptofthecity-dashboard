<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Staff } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const props = defineProps({
    member: Object as () => Staff,
});

const loading = ref(false);

const form = {
    first_name: props.member?.first_name,
    last_name: props.member?.last_name,
    title: props.member?.title,
    schedule: props.member?.schedule,
    occupation: props.member?.occupation,
    bio: props.member?.bio
}

const emit = defineEmits(['update','cancel']);
const submit = async () => {
    console.log(form);
    if(!props.member) return;
    loading.value = true;
    const res = await Http.patch(`content/staff/update/${props.member?.id}`, form, { Authorization: `Bearer ${localStorage.getItem('token')}` });

    loading.value=false;
    emit('cancel');
    if(res.status === 201 || res.status === 200) {
        emit('update', res.data);
    } else {
        console.log(res);
    }
    setTimeout(() => {
        loading.value = false;
    }, 2000);
}



</script>

<template>

    <div class="form-container">
        <div class="left">
            <InputField placeHolder="First Name" @input="form.first_name = $event" :value="form.first_name" />
            <InputField placeHolder="Last Name" @input="form.last_name = $event" :value="form.last_name" />
            <InputField placeHolder="Title" @input="form.title = $event" :value="form.title" />
            <InputField placeHolder="Schedule" @input="form.schedule = $event" :value="form.schedule" />
            <InputField placeHolder="Occupation" @input="form.occupation = $event" :value="form.occupation" />

        </div>
        <div class="right">
            <InputField height="14rem" placeHolder="Bio" @input="form.bio = $event" :value="form.bio"/>
            <div class="btn-container">
                <Btn :loading="loading" @click="submit()">Submit</Btn>
                <Btn class="cancel" @click="emit('cancel')">Cancel</Btn>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

$gap: 2rem;
.form-container {
    display: flex;
    gap: 2rem;
    padding:2rem;
    background-color: $darkgrey;
    border-radius: 10px; 
    .left {
        display: flex;
        flex-direction: column;
        gap: $gap;
    }
    .right {
        display: flex;
        flex-direction: column;
        gap: $gap;

        .btn-container {
            width:100%;
            display: flex;
            flex-direction: column;
            gap: $gap;
        }
    }
}

</style>