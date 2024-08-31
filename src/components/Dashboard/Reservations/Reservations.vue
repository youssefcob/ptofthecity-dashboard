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

const reservationsList:Ref<Reservation[]> = ref([]);

const currentPage:Ref<number> = ref(1);

const lastPage:Ref<number> = ref(0);



const getReservations = async (status:string = 'pending') => {
    const res = await Http.get(`reservation/status/${status}?page=${currentPage.value}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    reservationsList.value = res.data.data;
    // currentPage.value = res.data.current_page;
    lastPage.value = res.data.last_page;

    if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        return res.data;
        // window.location.reload();
    } else {
        alert(res.data.error);
    }

}

const paginate = (page: number) => {
    if(currentPage.value == 1 && page < 0) return;
    if(currentPage.value == lastPage.value && page > 0) return;
    currentPage.value =  currentPage.value + page;
 
    getReservations();
}

const changeReservations = (status: string) => {
    getReservations(status);
    currentPage.value = 1;

}

onMounted(() => {
    getReservations();
});
</script>
<template>
    <ReservationsHeader :page="currentPage" @paginate="paginate($event)" @statusChanged="changeReservations($event)"/>

    <div class="reservations-container">
        <!-- <div class="reservation" v-for="reservation in reservationsList">
            {{ reservation.id }}
        </div> -->
        <ReservationCard class="reservation" v-for="reservation in reservationsList" :reservation="reservation" :key="reservation.id"/>
    </div>

</template>
<style scoped lang="scss">
.reservations-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .reservation-city-wrapper {
    padding: 2rem;
    padding-top:1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h2{
        color:$navy;
    }

    .reservation {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>