<script setup lang="ts">
import InputField from '@/components/sharedComponents/InputField.vue';
import CheckBox from '@/components/sharedComponents/CheckBox.vue';

import { reactive, ref, type Ref } from 'vue';
import Http from '@/mixins/Http';
import Btn from '@/components/sharedComponents/btn.vue';

let days: Ref<string[]> = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
const scheduleForm = reactive({
    monday: {
        start: '',
        end: '',
        off: false
    },
    tuesday: {
        start: '',
        end: '',
        off: false
    },
    wednesday: {
        start: '',
        end: '',
        off: false
    },
    thursday: {
        start: '',
        end: '',
        off: false
    },
    friday: {
        start: '',
        end: '',
        off: false
    },
    saturday: {
        start: '',
        end: '',
        off: false
    },
    sunday: {
        start: '',
        end: '',
        off: false
    }
});
const form = reactive({
    name: '',
    street_address: '',
    capacity: '',
    state: '',
    city: '',
    phone: '',
    zip_code: '',
    lat: '',
    long: '',
    place_id: '',
    summary: '',
    schedule: {}
})

const submit = () => {
    form.schedule = scheduleForm;
    addClinic();
}

const cancel = () => {
    console.log('cancel');
}

const emit = defineEmits(['newClinic']);

const loading = ref(false);
const addClinic = async () => {
    console.log(form)
    loading.value = true;
    let res = await Http.post(`clinic/create`, form, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.value = false;
    console.log(res);
    if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) { 
        window.location.reload();
    }else{
        alert(res.data.error);
    }
    // window.location.reload();
}



</script>

<template>
    <form action="" class="addClinic">
        <h1>Add Clinic</h1>

        <div class="form-wrapper">
            <div class="info">

                <div class="grid">
                    <InputField required class="field" placeHolder="Clinic Name" id="firstName"
                        @input="form.name = $event" />
                    <InputField required class="field" placeHolder="Street Address" id="street_address"
                        @input="form.street_address = $event" />
                    <InputField required class="field" placeHolder="State" id="state" @input="form.state = $event" />
                    <InputField required class="field" placeHolder="City" id="city" @input="form.city = $event" />
                    <InputField required class="field" placeHolder="Capacity" id="capacity"
                        @input="form.capacity = $event" />
                    <InputField required class="field" placeHolder="Phone" id="phone" @input="form.phone = $event" />
                    <InputField required class="field" placeHolder="Zip Code" id="zip_code"
                        @input="form.zip_code = $event" />
                    <InputField required class="field" placeHolder="Place ID" id="place_id"
                        @input="form.place_id = $event" />
                    <InputField required class="field" placeHolder="Latitude" id="lat" @input="form.lat = $event" />
                    <InputField required class="field" placeHolder="Longitude" id="long" @input="form.long = $event" />


                </div>
                <InputField required class="field" placeHolder="Description" height="5rem" id="summary"
                    @input="form.summary = $event" />
            </div>
            <div class="schedule">
                <h2 class="title">Schedule</h2>
                <div class="day" v-for="day in days">
                    <h3>{{ day }}</h3>
                    <InputField mask="##:##:##" value="00:00:00" class="field" placeHolder="start"
                        @input="scheduleForm[day.toLowerCase() as keyof typeof scheduleForm].start = $event" />
                    <InputField mask="##:##:##" value="00:00:00" class="field" placeHolder="end"
                        @input="scheduleForm[day.toLowerCase() as keyof typeof scheduleForm].end = $event" />
                    <CheckBox label="Is Off?"
                        @change="scheduleForm[day.toLowerCase() as keyof typeof scheduleForm].off = $event" />
                </div>


            </div>
        </div>
        <div class="buttons-wrapper">
            <Btn class="btn" @click="submit()" :loading="loading">Confirm</Btn>
            <div class="btn cancel" @click="cancel()">Cancel</div>
        </div>
    </form>
</template>
<style scoped lang="scss">
.addClinic {

    // width:80%;
    // height:80%;
    
    background-color: $grey;
    padding: 2rem;
    .schedule {}

 

    .day {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;

        h3 {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        // .field{
        //     width:5rem;
        // }
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .title {
            grid-column: 1/3;
        }
    }

    .buttons-wrapper {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;

        .cancel {
            background-color: $darkgrey;
        }
    }

    .form-wrapper {
        display: flex;
        gap: 2rem;

        .info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
}
</style>