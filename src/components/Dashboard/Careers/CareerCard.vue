<script setup lang="ts">

import type { Career } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref, type Ref } from 'vue';
const props = defineProps({
    career: {
        type: Object as () => Career,
        required: true
    },
});
const activeButton: Ref<number> = ref(props.career.is_read);
// console.log(activeButton.value);

const toDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}  ${formattedTime}`;
}

const changeApplicationStatus = async (st: number) => {
    if (activeButton.value === st) return;
    const res = await Http.put(`career/applications/${props.career.id}/${st}`, {
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
</script>



<template>
    <div class="card">
        <div class="info">
            <div class="header">
            </div>
            <div class="header">
                <h3>Submission Info:</h3>
                <div class="btns-wrapper">
                    <button :class="{ active: activeButton === 1 }" class="btn"
                        @click="changeApplicationStatus(1)">Viewed</button>
                    <button class="btn" :class="{ active: activeButton === 0 }" @click="changeApplicationStatus(0)">Not
                        Viewed</button>

                </div>
            </div>

            <p><strong>Submitted at: </strong> {{ toDate($props.career?.created_at) }}</p>
            <p><strong>Resume: </strong> <a :href="props.career?.resume" target="_blank">View Resume</a></p>
            <p><strong>Job: </strong>{{ $props.career?.job }}</p>

            <h3>Personal Info:</h3>

            <p><strong>Name: </strong>{{ props.career?.first_name }} {{ props.career?.last_name }}</p>
            <p><strong>Phone: </strong>{{ props.career?.phone }}</p>
            <p><strong>Email: </strong>{{ props.career?.email }}</p>
            <p><strong>State: </strong>{{ props.career?.state }}</p>
            <p><strong>City: </strong>{{ props.career?.city }}</p>
            <p><strong>Zip Code: </strong>{{ props.career?.zip_code }}</p>
            <p><strong>Street Address: </strong>{{ props.career?.street_address }}</p>


        </div>
    </div>

</template>

<style scoped lang="scss">
.card {
    display: flex;
    // background-color: $darkgrey;

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