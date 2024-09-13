<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import RadioInputField from '@/components/sharedComponents/RadioInputField.vue';
import Http from '@/mixins/Http';
import { reactive } from 'vue';

const emit = defineEmits(['faqAdded']);
const form = reactive({
    question: '',
    answer: '',
    category: '',
    is_main: false,
});
const assignToForm = (value: string) => {
    form.is_main = (value == 'Yes')
}
const submit = async () => {
    const res = await Http.post('content/faqs', form, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    console.log(res);
    if(res.status == 201) {
        emit('faqAdded', res.data);
    }
}
</script>
<template>

<div class="form">
<h1>Add FAQ</h1>
<InputField height="12rem"  @input="form.question = $event" type="text" placeHolder="Question" />
<InputField height="12rem" @input="form.answer = $event" type="text" placeHolder="Answer" />
<div class="ps">
<InputField @input="form.category = $event" type="text" placeHolder="Category" />
<span>Questions are grouped by category</span>
</div>
<RadioInputField @change="assignToForm($event)" title="In Main Page" :options="['Yes', 'No']" :checked="'No'" :error="false" />

<button class="btn" @click="submit()">Submit</button>
</div>



</template>

<style scoped lang="scss">

.form{
    padding:3rem;
    background-color: $darkgrey;
    display:flex;
    flex-direction: column;
    gap:2rem;
    width:50vw;

    .ps{
        display:flex;
        flex-direction: column;
        gap:1rem;
        width:100%;
        margin:0;
    }
    .btn{
        padding:2rem;
        // width:30%;
    }
}

</style>