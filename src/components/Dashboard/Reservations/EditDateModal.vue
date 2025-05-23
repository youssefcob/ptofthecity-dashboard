<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Reservation } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, reactive, ref, watch } from 'vue';
import moment from 'moment-timezone';



const props = defineProps({
    reservation: {
        type: Object as () => Reservation,
    },
});

const form = reactive({
    date: '',
    time: '',
})

const loading = ref(false);

const submit = async () => {
    console.log('submit');

    // form.date is in "mm-dd-yyyy", form.time is in "HH:mm"
    const dateTimeString = `${form.date} ${form.time}`;
    const dateObj = moment.tz(dateTimeString, 'MM-DD-YYYY HH:mm', 'America/New_York');
    const date_in_unix = dateObj.valueOf();

    console.log(dateObj);
    console.log(date_in_unix);

    loading.value = true;
    const res = await Http.put(`reservation/update/date/${props.reservation?.id}`, { date: date_in_unix }, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.value = false;

    console.log(res)




}

onMounted(() => {
    if (props.reservation && props.reservation.date_in_unix) {
        const date = new Date(props.reservation.date_in_unix * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        form.date = `${day}-${month}-${year}`;

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        form.time = `${hours}:${minutes}`;

    }

})


</script>

<template>
    <div class="modal-wrapper">
        <InputField placeHolder="date" mask="##-##-####" date :value="form.date" @input="form.date = $event">
        </InputField>
        <InputField placeHolder="Time" mask="##:##" @input="form.time = $event"></InputField>
        <Btn :loading="loading" @click="submit">Submit</Btn>

    </div>
</template>

<style scoped lang="scss">
.modal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>