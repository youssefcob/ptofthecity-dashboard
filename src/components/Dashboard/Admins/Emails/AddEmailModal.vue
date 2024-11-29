<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';


const props = defineProps({
   form: {
        type: String,
        required: true
    },

});

const emit = defineEmits(['newEmail']);

const loading = ref(false);

const email = ref('');

const submit = async () => {
    loading.value = true;
    let res = await Http.post(`admin/email`, {
        email: email.value,
        title: props.form
    },
        {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

    );
    loading.value = false;
    console.log(res);
    if (res.status === 200) {
        console.log(res.data);
        emit('newEmail', res.data);
    } else {
        console.log(res);

        alert(res);
    }

}
const assignEmail = (e: any) => {
    email.value = e;
}
</script>

<template>
    <div class="Form-container">
        <h1>Add Email To <br> {{ form.charAt(0).toUpperCase() + form.slice(1) }} Form</h1>
        <InputField type="email" placeHolder="Email" @input="assignEmail($event)"/>
        <Btn class="add" :loading="loading" @click="submit()">Submit</Btn>
    </div>
</template>

<style scoped lang="scss">
.Form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: grey;
    border-radius: 5px;
    // width:60%;
    
}
</style>