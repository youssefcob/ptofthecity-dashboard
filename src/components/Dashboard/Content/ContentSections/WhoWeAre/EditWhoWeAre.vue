<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

type Content = {
    clinics: number,
    successful_cases: number,
    employees: number,
    our_story: string,
    our_technique: string,
    vision: string,
    mission: string
}

const props = defineProps<{
    whoWeAre: Content
}>();

// let whoWeAre = ref<Content>({
//     clinics: 0,
//     successful_cases: 0,
//     employees: 0,
//     our_story: '',
//     our_technique: '',
//     vision: '',
//     mission: ''
// });

const form = ref({
    clinics: 0,
    successful_cases: 0,
    employees: 0,
    our_story:'',
    our_technique:'',
    vision:'',
    mission: ''
});
const loading = ref(false);

const submit = async () => {
    loading.value =true
    const res = await Http.post('content/whoWeAre', form.value, { Authorization: `Bearer ${localStorage.getItem('token')}` });

    loading.value = false
    if(res.status != 200) {

        alert(res.data.error)
        // console.log(res.data.error)
    } else {
        alert('updated Successfully');
        window.location.reload();
    }};

</script>

<template>

<div class="wrapper">
    <div class="header"><h1>Edit Who We Are</h1> <Btn class="add" :loading="loading" @click="submit">Submit</Btn></div>
<div class="input-fields">
    <InputField placeHolder="Number of Clinics" :value="whoWeAre.clinics.toString()" @input="form.clinics = $event" />
    <InputField placeHolder="Number of Successful Cases" :value="whoWeAre.successful_cases.toString()" @input="form.successful_cases = $event" />
    <InputField placeHolder="Number of Employees" :value="whoWeAre.employees.toString()" @input="form.employees = $event" />
</div>
    <div class="text-fields">
    <InputField height="13rem" placeHolder="Our Story" :value="whoWeAre.our_story" @input="form.our_story = $event" />
    <InputField height="13rem" placeHolder="Our Technique" :value="whoWeAre.our_technique" @input="form.our_technique = $event" />
    <InputField height="13rem" placeHolder="Vision" :value="whoWeAre.vision" @input="form.vision = $event" />
    <InputField height="13rem" placeHolder="Mission" :value="whoWeAre.mission" @input="form.mission = $event" />
</div>
</div>
</template>

<style scoped lang="scss">
$gap:2rem;
.wrapper{
    padding:1rem;
    background-color: $darkgrey ;
    .header{
        display:flex;
        justify-content:space-between;
    }
    .input-fields{
        margin-top: $gap;
        display:flex;
    
    }
    .text-fields{
        margin-top:$gap;
        display:grid;
        gap:$gap;
        grid-template-columns: 1fr 1fr;
    }

}
</style>