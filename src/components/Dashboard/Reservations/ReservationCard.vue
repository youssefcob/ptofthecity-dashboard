<script setup lang="ts">
import type { Reservation } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive, ref, type Ref } from 'vue';
import moment from 'moment-timezone';
import Eligibility from '../Eligibility/Eligibility.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import Btn from '@/components/sharedComponents/btn.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import EditDateModal from './EditDateModal.vue';
import { watch, computed } from 'vue';


const props = defineProps({
    reservation: {
        type: Object as () => Reservation,
    },
});

const date = ref(props.reservation?.date_in_unix);

console.log(props.reservation);

const activeButton = ref(props.reservation?.status);

// const emit = defineEmits(['updateReservation']);

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
    return nyDate.format('MM-DD-YYYY HH:mm');
}

const parsedDate = ref(toDate(date.value));

watch(
    () => props.reservation?.date_in_unix,
    (newVal) => {
        date.value = newVal;
        parsedDate.value = toDate(newVal);
    },
    { immediate: true }
);



let form = reactive({
    co_pay_amount: '',
    eligibility_status: '',
})

const emit = defineEmits(['insuranceUpdated', 'dateChanged']);

const loading = ref(false);
const submit = async () => {
    try {
        console.log(form);
        loading.value = true;

        const res = await Http.put(`reservation/insurance/${props.reservation?.id}`, {
            co_pay_amount: parseFloat(form.co_pay_amount),
            eligibility_status: form.eligibility_status,
        }, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });

        console.log(res);
        if (res.status === 401) {
            window.location.href = '/login';
        } else if (res.status === 200) {
            console.log(res.data);
            emit('insuranceUpdated', res.data);
        } else {
            alert(res.data.error);
        }
    } catch (error) {
        if ((error as { status?: number }).status === 401) {
            window.location.href = '/login';
        }
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
    } finally {
        loading.value = false;
    }
};
const editDateModal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const dateChanged = (reservation: Reservation) => {
    emit('dateChanged', reservation);
    editDateModal.value?.closeModal()
    // window.location.reload();
}
</script>


<template>
    <div class="card">
        <Modal ref="editDateModal">
            <EditDateModal :reservation="props.reservation" @close="editDateModal?.closeModal()"
                @updateReservation="dateChanged($event)" />
        </Modal>

        <div class="info">
            <div class="header">
                <h2>{{ props.reservation?.clinic?.name }}</h2>


            </div>
            <h3>Personal Info:</h3>

            <p><strong>Name: </strong>{{ props.reservation?.first_name }} {{ props.reservation?.last_name }}</p>
            <p><strong>Phone: </strong>{{ props.reservation?.phone }}</p>
            <p><strong>Email: </strong>{{ props.reservation?.email }}</p>
            <p><strong>Gender: </strong>{{ props.reservation?.gender }}</p>

            <p><strong>Date Of Birth: </strong>{{ props.reservation?.dob }}</p>

            <h3>Reservation Info:</h3>

            <p><strong>Clinic: </strong> {{ props.reservation?.clinic.name }}</p>
            <p><strong>Service: </strong> {{ props.reservation?.service?.title }}</p>

            <p><strong>Date: </strong> {{ parsedDate }}</p>
            <Btn class="edit" @click="editDateModal?.openModal()">Edit Date</Btn>
            <p><strong>Submitted at: </strong> {{ toDate($props.reservation?.created_at) }}</p>
            <p><strong>Returning patient: </strong> {{ props.reservation?.returning ? "Yes" : "No" }}</p>


            <p><strong>Payment: </strong> {{(props.reservation?.payment.replace(/_/g, ' ').replace(/^\w/, c =>
                c.toUpperCase()))}}</p>

            <p v-if="$props.reservation?.about_your_pain"><strong>Description: </strong>{{
                props.reservation?.about_your_pain }}
            </p>
            <template v-if="props.reservation?.payment == 'insurance' && props.reservation?.returning == false">
                <h3>Insurance Info:</h3>
                <p><strong>Insurance: </strong> {{ props.reservation?.insurance_company }}</p>
                <p><strong>Member ID: </strong> {{ props.reservation?.member_id }}</p>
                <p v-if="props.reservation?.eligibility_status"><strong>Insurace Eligibility Status: </strong> {{
                    props.reservation?.eligibility_status }}</p>
                <p v-if="props.reservation?.co_pay_amount"><strong>Co-pay amount: </strong> {{
                    props.reservation?.co_pay_amount }}</p>
            </template>

            <template v-if="props.reservation?.payment == 'workers_compensation'">
                <h3>Workers Compensation info:</h3>
                <p><strong>Date of Accident: </strong> {{ props.reservation?.date_of_accident }}</p>
                <p><strong>Case Number: </strong> {{ props.reservation?.case_number }}</p>
                <p><strong>Lawyer Name: </strong> {{ props.reservation?.lawyer_name }}</p>
                <p><strong>Lawyer Phone Number: </strong> {{ props.reservation?.lawyer_phone_number }}</p>
            </template>
        </div>
        <div class="insurance-status">
            <div class="btns-wrapper">
                <button :class="{ active: activeButton === 'pending' }" class="btn"
                    @click="changeReservationStatus('pending')">Pending</button>
                <button :class="{ active: activeButton === 'confirmed' }" class="btn"
                    @click="changeReservationStatus('confirmed')">Confirmed</button>
                <button class="btn" :class="{ active: activeButton === 'cancelled' }"
                    @click="changeReservationStatus('cancelled')">Cancelled</button>

            </div>

            <div v-if="props.reservation?.payment == 'insurance' && props.reservation?.returning == false" class="insurance-fields">
                <div class="form-field">
                    <InputField height="15rem" class="inputField" placeHolder="Insurance Eligibility Status"
                        @input="form.eligibility_status = $event" :value="props.reservation?.eligibility_status" />
                </div>
                <div class="form-field">
                    <strong>$</strong>
                    <InputField class="inputField" placeHolder="Co-pay amount" numbersOnly
                        @input="form.co_pay_amount = $event" :value="props.reservation?.co_pay_amount" />
                </div>

                <Btn @click="submit()" :loading="loading">Submit</Btn>

            </div>

        </div>
    </div>

</template>

<style scoped lang="scss">
.card {
    display: flex;

    .insurance-fields {
        display: flex;
        gap: 2rem;
        margin-top: 3rem;
        flex-direction: column;
        width: 100%;
    }

    .form-field {
        display: flex;
        align-items: center;
        gap: .75rem;

        >* {
            flex-grow: 1;
        }

        >strong {
            flex-grow: 0;
            color: $navy;
            font-size: 2rem;
        }


    }

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
            }

            &.active {
                background-color: $green;
            }

        }
    }



}
</style>