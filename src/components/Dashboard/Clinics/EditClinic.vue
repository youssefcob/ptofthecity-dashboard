<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Clinic } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive, ref, TrackOpTypes } from 'vue';


const props = defineProps({
    clinic: {
        type: Object as () => Clinic,
        required: true
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
})

const emit = defineEmits(['close','clinicUpdated']);
const closeModal = () => {
    emit('close');
}


const loading = ref(false);
const submit = async () => {
    // try{
    console.log('submit')

    loading.value = true;
        const res = await Http.put(`clinic/update/${props.clinic.id}`,form,{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    loading.value = false;

        console.log(res)

        if(res.status === 200) emit('clinicUpdated',res.data);
    
        if(res.status === 401){
            alert('Unauthorized');
            window.location.href = '/login';
        }

    // } catch (error: any) {
    //     console.log(error.status)
    //     if(error.status === 401){
    //         alert('Unauthorized');
    //         window.location.href = '/login';
    //     }
        // alert(error)
    // }
}
// console.log(form)

</script>


<template>
    <form>
        <div class="editClinicForm">
            <div class="form-field"><strong>Name: </strong>
                <InputField class="inputField" placeHolder="Clinic Name" required @input="form.name = $event"
                    :value="props.clinic.name" />
            </div>
            <div class="form-field"><strong>Street Address:</strong>
                <InputField class="inputField" placeHolder="Street Address" required
                    @input="form.street_address = $event" :value="props.clinic.street_address" />
            </div>
            <div class="form-field"><strong>State: </strong>
                <InputField class="inputField" placeHolder="State" required @input="form.state = $event"
                    :value="props.clinic.state" />
            </div>
            <div class="form-field"><strong>City: </strong>
                <InputField class="inputField" placeHolder="City" required @input="form.city = $event"
                    :value="props.clinic.city" />
            </div>
            <div class="form-field"><strong>Capacity: </strong>
                <InputField class="inputField" placeHolder="Capacity" required @input="form.capacity = $event"
                    :value="props.clinic.capacity.toString()" />
            </div>
            <div class="form-field"><strong>Phone: </strong>
                <InputField class="inputField" placeHolder="Phone" required @input="form.phone = $event"
                    :value="props.clinic.phone" />
            </div>
            <div class="form-field"><strong>Zip Code: </strong>
                <InputField class="inputField" placeHolder="Zip Code" required @input="form.zip_code = $event"
                    :value="props.clinic.zip_code" />
            </div>
            <div class="form-field"><strong>Latitude:</strong>
                <InputField class="inputField" placeHolder="Latitude" required @input="form.lat = $event"
                    :value="props.clinic.lat" />
            </div>
            <div class="form-field"><strong>Longitude:</strong>
                <InputField class="inputField" placeHolder="Longitude" required @input="form.long = $event"
                    :value="props.clinic.long" />
            </div>
            <div class="form-field"><strong>Place ID: </strong>
                <InputField class="inputField" placeHolder="Place ID" required @input="form.place_id = $event"
                    :value="props.clinic.place_id" />
            </div>
            <div class="form-field"><strong>Description:</strong>
                <InputField class="inputField" height="20rem" placeHolder="Description" required
                    @input="form.summary = $event" :value="props.clinic.summary" />
            </div>
            <div class="btn-wrapper">
                <div class="btn cancel" @click="closeModal()">Cancel</div>
                <Btn  @click="submit()" :loading="loading">Submit</Btn>
            </div>

        </div>
    </form>
</template>

<style scoped lang="scss">
.editClinicForm {
    padding: 2rem;
    background-color: $darkgrey;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;

    .form-field {
        display: flex;
        gap: 1rem;
        // align-items: center;
        justify-content: space-between;

        // width:50rem;
        .inputField {
            width: 30rem;
        }


    }

    .btn {
        padding: 2rem;
        margin-top: 2rem;
        height: 30px;
        width: 50%;
        margin-left: auto
    }
}
</style>