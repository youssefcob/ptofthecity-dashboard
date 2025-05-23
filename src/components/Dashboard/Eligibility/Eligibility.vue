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


const changeElig = (query: string) => {
    debouncedGetEligibility(query);
    // currentPage.value = 1;

}

const getEligibility = async (query: string = '') => {
    const res = await Http.get(`insurance/filter?${query}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    eligibilityList.value = res.data.data;
    lastPage.value = res.data.last_page;
    currentPage.value = res.data.current_page;


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
const downloading: Ref<boolean> = ref(false);

const exportEligibility = async (query: string = '') => {
    try {
        downloading.value = true;
        const res = await Http.get(`insurance/filter/export?${query}`, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        downloading.value = false;
        if (res.status === 200) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date().toISOString().split('T')[0];
            link.setAttribute('download', `insurances_${currentDate}.csv`);
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
    <EligibilityHeader :downloading="downloading" :page="currentPage" :lastPage="lastPage"
        @statusChanged="changeElig($event)" @exportCsv="exportEligibility($event)" />

    <div class="eligibility-container">
        <EligibilityCard class="eligibility" v-for="eligibility in eligibilityList" :key="eligibility.id"
            :eligibility="eligibility" />
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