<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import RadioInputField from '@/components/sharedComponents/RadioInputField.vue';
import Http from '@/mixins/Http';
import { reactive } from 'vue';

const form = reactive({
    title: '',
    description: '',
    isAvailable: false,
});

const assignToForm = (value: string) => {
    form.isAvailable = (value == 'Available')
}
const submit = async () => {
    const res = await Http.post('career/jobs', form, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(res);
    // console.log(form);
}

</script>

<template>
    <div action="" class="form">
        <h1>Add Job</h1>
        <InputField @input="form.title = $event" type="text" placeHolder="Enter Job Title" />
        <RadioInputField @change="assignToForm($event)" style="width:100%;" title=""
                        :options="['Available', 'Unavailable']" :checked="'Available'" id="availability"
                        :error="false" />
        <InputField @input="form.description = $event" height="20rem" label="Job Description" type="text" placeHolder="Enter Job Description" />


        <button class="btn" @click="submit">Submit</button>
    </div>
</template>

<style scoped lang="scss">

.form{
    padding:3rem;
    background-color: $darkgrey;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .btn{
        padding:2rem;
        // width:30%;
    }
}

</style>