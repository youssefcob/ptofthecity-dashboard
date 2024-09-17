<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import RadioInputField from '@/components/sharedComponents/RadioInputField.vue';
import type { User } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive } from 'vue';

const props = defineProps({
    admin: {
        type: Object as () => User,
        required: true
    }
})

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

const getAdminRole = () => {
    switch(props.admin.role){
        case 'admin':
            return 'Admin';
        case 'super_admin':
            return 'Super Admin';
    }
    
}
</script>

<template>
<div class="form">
    <h1>Add Admin</h1>
    <InputField placeHolder="First Name" @input="form.first_name = $event" :value="props.admin.first_name" />
    <InputField placeHolder="Last Name" @input="form.last_name = $event" :value="props.admin.last_name"/>
    <InputField placeHolder="User Name" @input="form.phone = $event" :value="props.admin.phone"/>
    <RadioInputField class="radio-field" title="Role" :options="roleOptions" @change="assignRole($event)" :checked="getAdminRole() || ''" :error="false" />

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