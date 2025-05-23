<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import CareersHeader from './CareersHeader.vue';
import CareerCard from './CareerCard.vue';
import type { Career } from '@/interfaces/content';
import Http from '@/mixins/Http';

const status: Ref<boolean> = ref(false);
const job: Ref<string> = ref('All');
const careersList: Ref<Career[]> = ref([]);

const currentPage: Ref<number> = ref(1);


const lastPage: Ref<number> = ref(0);


const handleStatusChange = (s: boolean) => {
    status.value = s;
    // console.log(status.value);
    debouncedGetCareers();
}

const handleJobChange = (j: string) => {
    job.value = j;
    debouncedGetCareers();
}

const getCareers = async () => {
    const res = await Http.get(`career/filter/${job.value}/${status.value}?page=${currentPage.value}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    careersList.value = res.data.data;
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

const paginate = (page: number) => {
    if (currentPage.value == 1 && page < 0) return;
    if (currentPage.value == lastPage.value && page > 0) return;
    currentPage.value = currentPage.value + page;

    debouncedGetCareers();
}

const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
const debouncedGetCareers = debounce(getCareers, 300);
onMounted(() => {
    getCareers();
});
</script>

<template>
    <CareersHeader :page="currentPage" @statusChanged="handleStatusChange($event)" @paginate="paginate($event)"
        @jobChanged="handleJobChange($event)" />

    <div class="careers-container">
        <CareerCard class="career" v-for="career in careersList" :career="career" :key="career.id" />
    </div>
</template>

<style scoped lang="scss">
.careers-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .career {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;
    }
}
</style>