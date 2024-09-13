<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import RadioInputField from '@/components/sharedComponents/RadioInputField.vue';
import Http from '@/mixins/Http';
import { reactive } from 'vue';


const form = reactive({
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: ''
})

const assignRole = (role:string) =>{
    switch(role){
        case 'Admin':
            form.role = 'admin';
            break;
        case 'Super Admin':
            form.role = 'super_admin';
            break;
    }
    
}

const roleOptions = ['Admin', 'Super Admin'];

const submit= async ()=>{
    const res = await Http.post('admin/create', form, { Authorization: `Bearer ${localStorage.getItem('token')}` });
    console.log(res);
    if(res.status != 200) {
        alert(res.data.error)
        // console.log(res.data.error)
    } else {
        alert('Admin Added Successfully');
        window.location.reload();
    }
}
</script>

<template>
<div class="form">
    <h1>Add Admin</h1>
    <InputField placeHolder="First Name" @input="form.first_name = $event" />
    <InputField placeHolder="Last Name" @input="form.last_name = $event" />
    <InputField placeHolder="User Name" @input="form.phone = $event" />
    <RadioInputField class="radio-field" title="Role" :options="roleOptions" @change="assignRole($event)" :checked="'Admin'" :error="false" />

    <InputField placeHolder="Password" @input="form.password = $event" />
    <InputField placeHolder="Confirm Password" @input="form.password_confirmation = $event" />
    <button class="btn" @click="submit">Submit</button>
</div>
</template>

<style scoped lang="scss">

.form{
    background-color: $darkgrey;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .radio-field{
        margin:1rem 0;
    }
    .btn{
        padding:2rem;
    }
}


</style>