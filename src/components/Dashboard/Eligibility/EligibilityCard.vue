<script setup lang="ts">
import type { Eligibility } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref } from 'vue';


const props = defineProps({
    eligibility: {
        type: Object as () => Eligibility,
    },
});

const activeButton = ref(props.eligibility?.status);

const changeInsuranceStatus = async (st: "pending" | "accepted" | "rejected") => {
    if (activeButton.value === st) return;
    const res = await Http.put(`insurance/setStatus/${props.eligibility?.id}/${st}`, {
        status: st
    }, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // console.log(res);


    // console.log(res);
    if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        activeButton.value = st;

        // return res.data;
        // window.location.reload();
    } else {
        alert(res.data.error);
    }
    
};

const toDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}  ${formattedTime}`;
}
</script>


<template>
    <div class="card">
        <div class="info">
            <div class="header"><h3>Personal Info:</h3>
            
                <div class="btns-wrapper">
                    <button :class="{ active: activeButton === 'pending' }" class="btn" @click="changeInsuranceStatus('pending')">Pending</button>
                    <button :class="{ active: activeButton === 'accepted' }" class="btn" @click="changeInsuranceStatus('accepted')">Accepted</button>
                    <button class="btn" :class="{ active: activeButton === 'rejected' }" @click="changeInsuranceStatus('rejected')">Rejected</button>

                </div>
            </div>

            <p><strong>Name: </strong>{{ props.eligibility?.first_name }} {{ props.eligibility?.last_name }}</p>
            <p><strong>Phone: </strong>{{ props.eligibility?.phone }}</p>
            <p><strong>Email: </strong>{{ props.eligibility?.email }}</p>
            <p><strong>Gender: </strong>{{ props.eligibility?.gender }}</p>
            <p><strong>Date Of Birth: </strong>{{ props.eligibility?.dob }}</p>

            <h3>Insurance Info:</h3>

            <p><strong>Insurance Company: </strong> {{ props.eligibility?.insurance_provider }}</p>
            <p><strong>Insurance Card Front: </strong> <a :href="props.eligibility?.insurance_card_front" target="_blank">{{ props.eligibility?.insurance_card_front }}</a></p>
            <p><strong>Insurance Card Back: </strong> <a :href="props.eligibility?.insurance_card_back" target="_blank">{{ props.eligibility?.insurance_card_back }}</a></p>
            <p><strong>Member ID: </strong> {{ $props.eligibility?.member_id }}</p>
            <p><strong>Medicare ID: </strong> {{ $props.eligibility?.medicare_id }}</p>
            <p><strong>Medicaid ID: </strong> {{ $props.eligibility?.medicaid_id }}</p>
            <p><strong>Submitted at: </strong> {{ toDate($props.eligibility?.created_at) }}</p>
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