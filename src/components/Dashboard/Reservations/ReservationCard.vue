<script setup lang="ts">
import type { Reservation } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref } from 'vue';
import moment from 'moment-timezone';


const props = defineProps({
    reservation: {
        type: Object as () => Reservation,
    },
});

const activeButton = ref(props.reservation?.status);

const changeReservationStatus = async (st: "pending" | "confirmed" | "cancelled") => {
    activeButton.value = st;

    const res = await Http.put(`reservation/status/${props.reservation?.id}`, {
         status: st 
    }, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    console.log(res);
    if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        return res.data;
        // window.location.reload();
    } else {
        alert(res.data.error);
    }
    
};

const toDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return '';
    // const date = new Date(timestamp);
    // const formattedDate = date.toLocaleDateString();
    // const formattedTime = date.toLocaleTimeString();
    // return `${formattedDate}  ${formattedTime}`;

    const nyDate = moment.tz(timestamp, 'America/New_York');
    // console.log('New York Date:', nyDate.format());

    // Return the formatted date string
    return nyDate.format('YYYY-MM-DD HH:mm:ss');
}
</script>


<template>
    <div class="card">
        <div class="info">
            <div class="header">
                <h2>{{props.reservation?.clinic?.name}}</h2>

                <div class="btns-wrapper">
                    <button :class="{ active: activeButton === 'pending' }" class="btn" @click="changeReservationStatus('pending')">Pending</button>
                    <button :class="{ active: activeButton === 'confirmed' }" class="btn" @click="changeReservationStatus('confirmed')">Confirmed</button>
                    <button class="btn" :class="{ active: activeButton === 'cancelled' }" @click="changeReservationStatus('cancelled')">Cancelled</button>

                </div>
            </div>
            <h3>Personal Info:</h3>

            <p><strong>Name: </strong>{{ props.reservation?.first_name }} {{ props.reservation?.last_name }}</p>
            <p><strong>Phone: </strong>{{ props.reservation?.phone }}</p>
            <p><strong>Email: </strong>{{ props.reservation?.email }}</p>

            <h3>Reservation Info:</h3>

            <p><strong>Clinic: </strong> {{ props.reservation?.clinic.name }}</p>
            <p><strong>Date: </strong> {{ toDate(props.reservation?.date_in_unix) }}</p>
            <p><strong>Submitted at: </strong> {{ toDate($props.reservation?.created_at) }}</p>
            <p><strong>Payment: </strong> {{ props.reservation?.payment == 'self_pay' ? 'Self Pay' : 'Insurance' }}</p>

            <p v-if="$props.reservation?.about_your_pain"><strong>Description: </strong>{{
                props.reservation?.about_your_pain }}
            </p>
            <template v-if="props.reservation?.insurance_company">
                <h3>Insurance Info:</h3>
                <p><strong>Insurance: </strong> {{props.reservation?.insurance_company}}</p>
                <p><strong>Member ID: </strong> {{props.reservation?.member_id}}</p>

            </template>
        </div>
    </div>

</template>

<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;


        .header {
            display: flex;

            .delete-container {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-left: auto;

                div {
                    display: flex;
                    gap: 1rem;
                }
            }
        }

        h3 {
            font-weight: bold;
            font-size: 1.9rem;
            margin: 1rem 0 0.3rem 0;
            ;
        }

        .day {
            display: flex;
        }
    }

    .btns-wrapper {
        display: flex;
        margin-left: auto;
        // flex-direction: column;
        gap: 1rem;
        // align-items: flex-end;
        // justify-content: flex-end;

        button {
            padding: 1rem;
            background-color: $navy;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            &.delete {
                background-color: red;
            }&.active{
                background-color: $green;
            }

        }
    }



}
</style>