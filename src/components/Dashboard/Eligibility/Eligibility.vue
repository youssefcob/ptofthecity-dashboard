<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import EligibilityHeader from './EligibilityHeader.vue';
import EligibilityCard from './EligibilityCard.vue';
import Http from '@/mixins/Http';
import type { Eligibility } from '@/interfaces/content';

const status: Ref<string> = ref('pending');


const currentPage: Ref<number> = ref(1);


const lastPage: Ref<number> = ref(0);

    const eligibilityList: Ref<Eligibility[]> = ref([]);

const handleStatusChange = (s: string) => {
    status.value = s;
    debouncedGetEligibility();
}

const paginate = (page: number) => {
    if (currentPage.value == 1 && page < 0) return;
    if (currentPage.value == lastPage.value && page > 0) return;
    currentPage.value = currentPage.value + page;

    debouncedGetEligibility();
}


const getEligibility = async () => {
    const res = await Http.get(`insurance/status/${status.value}?page=${currentPage.value}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    eligibilityList.value = res.data.data;
    lastPage.value = res.data.last_page;

    console.log(res.data);
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

const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

const debouncedGetEligibility = debounce(getEligibility, 300);


onMounted(() => {
    getEligibility();
});
</script>

<template>
    <EligibilityHeader :page="1" @statusChanged="handleStatusChange($event)" @paginate="paginate($event)"/>

    <div class="eligibility-container">
        <EligibilityCard class="eligibility" v-for="eligibility in eligibilityList" :key="eligibility.id" :eligibility="eligibility" />
    </div>
</template>

<style scoped lang="scss">
.eligibility-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .eligibility {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;
    }
}
</style>