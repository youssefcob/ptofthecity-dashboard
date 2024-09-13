<script setup lang="ts">
import type { Job } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const props = defineProps({
    job: {
        type: Object as () => Job,
        required: true
    },
});
console.log(props.job);

const toDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}  ${formattedTime}`;
}

const activeButton = ref(props.job?.isAvailable);

const changeAvailability = async (st: 0 | 1) => {
    if (activeButton.value === st) return;
    const res = await Http.put(`career/jobs/${props.job.id}/${st}`,{}, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(res.data);
    // activeButton.value = st;


    // console.log(res);
    // if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        activeButton.value = st;

        // return res.data;
        // window.location.reload();
    } else {
        // alert(res.data.error);
    }

};
</script>

<template>
    <div class="card">
        <div class="card-header">
            <h3>{{ props.job.title }}</h3>
            <div class="btns-wrapper">
                    <button :class="{ active: activeButton === 1 }" class="btn" @click="changeAvailability(1)">Available</button>
                    <button :class="{ active: activeButton === 0 }" class="btn" @click="changeAvailability(0)">UnAvailable</button>

                </div>
        </div>
        <div class="card-body">
         
            <p><strong>Availaibility: </strong>{{ props.job.isAvailable }}</p>
            <p><strong>Description: </strong>{{ props.job.description }}</p>
            <p><strong>Created at: </strong>{{ toDate(props.job.created_at) }}</p>
            <p><strong>Last updated at: </strong>{{ toDate(props.job.updated_at) }}</p>

        </div>
    </div>
</template>

<style scoped lang="scss">
.card{
    background-color: $darkgrey;
    padding: 1rem;
    border-radius: 10px;;
    h3{
        font-weight: bold;
            font-size: 1.9rem;
            margin: 1rem 0 0.3rem 0;
    }
    .card-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
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
    
}
</style>