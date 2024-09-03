<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import InsurancesHeader from './InsurancesHeader.vue';
import InsuranceCard from './InsuranceCard.vue';
import type { Insurance } from '@/interfaces/content';
import Http from '@/mixins/Http';




const insurances: Ref<Insurance[]> = ref([]);

const searchedInsurances: Ref<Insurance[]> = ref([]);

const search = (searchTerm: string) => {
    searchedInsurances.value = insurances.value.filter((insurance: Insurance) => insurance.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
}

const deleteInsurance = (id:number) => {
    searchedInsurances.value = searchedInsurances.value.filter((insurance: Insurance) => insurance.id !== id);
    insurances.value = insurances.value.filter((insurance: Insurance) => insurance.id !== id);
}

const getInsurances = async () =>{
    let data = await Http.get('images/insurance');
    insurances.value = data.data;
    searchedInsurances.value = data.data;
    console.log(data)
}

onMounted(() => {
    getInsurances();
});
</script>

<template>
    <div class="insurances-container">
        <div class="insurancesHeader">
            <InsurancesHeader @search="search($event)"/>
        </div>
       
        <div class="insurance-city-wrapper">
            <!-- <h2>insurances</h2> -->
            <div class="insurance" v-for="insurance in searchedInsurances">
                <InsuranceCard @insuranceDeleted="deleteInsurance($event)" :insurance="insurance"></InsuranceCard>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.insurances-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .insurance-city-wrapper {
    padding: 2rem;
    padding-top:1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h2{
        color:$navy;
    }

    .insurance {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>