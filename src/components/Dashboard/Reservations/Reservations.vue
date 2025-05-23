<script setup lang="ts">
import type { Reservation } from '@/interfaces/content';
import ReservationsHeader from './ReservationsHeader.vue';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import ReservationCard from './ReservationCard.vue';

// const props = defineProps({
//     reservation: {
//         type: Object as () => Reservation,
//     },
// });

const reservationsList: Ref<Reservation[]> = ref([]);

const currentPage: Ref<number> = ref(1);

const lastPage: Ref<number> = ref(0);


const getReservations = async (query: string = '') => {
    // console.log(`reservation/filter?${query}`)

    const res = await Http.get(`reservation/filter?${query}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    })


    reservationsList.value = res.data.data;
    currentPage.value = res.data.current_page;
    lastPage.value = res.data.last_page;
    console.log(res.data.data);
    if (res.status === 401) {
        window.location.href = '/login';
        return;
    }
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        return res.data;
        // window.location.reload();
    } else {
        alert(res.data.error);
    }

}

const downloading: Ref<boolean> = ref(false);

const exportReservations = async (query: string = '') => {
    try {
        downloading.value = true;
        const res = await Http.get(`reservation/filter/export?${query}`, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        // console.log(res.data);

        downloading.value = false;
        // return;
        if (res.status === 200) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date().toISOString().split('T')[0];
            link.setAttribute('download', `reservations_${currentDate}.csv`);
            document.body.appendChild(link);
            link.click();
        } else {
            alert(res.data.error);
        }
    }
    catch (e) {
        downloading.value = false;
        console.error(e);

        alert('An error occured while exporting reservations');
    }
}


const changeReservations = (query: string) => {
    debouncedGetReservations(query);
    // currentPage.value = 1;

}

const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
const debouncedGetReservations = debounce(getReservations, 300);

const updateInsurance = (reservation: Reservation) => {
    const index = reservationsList.value.findIndex((r) => r.id === reservation.id);
    if (index !== -1) {
        reservationsList.value[index].co_pay_amount = reservation.co_pay_amount;
        reservationsList.value[index].eligibility_status = reservation.eligibility_status;
    }
}

const updateDate = (reservation: Reservation) => {
    const index = reservationsList.value.findIndex((r) => r.id === reservation.id);
    console.log('index', index);
    if (index !== -1) {
        reservationsList.value[index].date_in_unix = reservation.date_in_unix;
    }
}
onMounted(() => {
    getReservations();
});
</script>
<template>
    <ReservationsHeader :downloading="downloading" :page="currentPage" :lastPage="lastPage"
        @statusChanged="changeReservations($event)"  @exportCsv="exportReservations($event)" />

    <div class="reservations-container">
        <template v-for="reservation in reservationsList">
            <ReservationCard class="reservation" v-if="reservation.clinic" :reservation="reservation"
                :key="reservation.id" @insuranceUpdated="updateInsurance($event)" @dateChanged="updateDate($event)"/>
        </template>
    </div>

</template>
<style scoped lang="scss">
.reservations-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .reservation-city-wrapper {
        padding: 2rem;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    h2 {
        color: $navy;
    }

    .reservation {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>