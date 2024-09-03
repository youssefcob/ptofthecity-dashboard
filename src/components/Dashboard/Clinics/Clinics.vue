<script setup lang="ts">
import type { Clinic } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import ClinicCard from './ClinicCard.vue';
import ClinicsHeader from './ClinicsHeader.vue';
interface ClinicsByCity {
    [key: string]: Clinic[];
}
const clinic_cities: Ref<string[]> = ref([]);
const clinics: Ref<ClinicsByCity> = ref({});
const searchedClinics: Ref<ClinicsByCity> = ref({});
const getClinics = async () => {
    let data = await Http.get('clinic/groupByLocation');
    clinics.value = data.data;
    searchedClinics.value = data.data;
    clinic_cities.value = Object.keys(data.data);
    console.log(data)
}

const deleteClinic = (id: number) => {
    console.log(id);
    for (let city in clinics.value) {
        clinics.value[city] = clinics.value[city].filter((clinic: Clinic) => clinic.id !== id);
        searchedClinics.value[city] = searchedClinics.value[city].filter((clinic: Clinic) => clinic.id !== id);

    }
}

const search = (searchTerm: string) => {
    let filteredClinics: ClinicsByCity = {};
    for (let city in clinics.value) {
        filteredClinics[city] = clinics.value[city].filter((clinic: Clinic) => clinic.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    }
    // clinics.value = filteredClinics;
    searchedClinics.value = filteredClinics;
}
onMounted(() => {
    getClinics();

});
</script>

<template>
    <div class="clinics-container">
        <div class="clinicsHeader">
            <ClinicsHeader @search="search($event)"/>
        </div>
        <!-- {{ clinic_cities }} -->

        <div class="clinic-city-wrapper" v-for="clinic_city in clinic_cities">
            <h2>{{ clinic_city }}</h2>
            <div class="clinic" v-for="clinic in searchedClinics[clinic_city as keyof typeof clinics]">
                <ClinicCard @clinicDeleted="deleteClinic($event)" :clinic="clinic"></ClinicCard>

            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.clinics-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .clinic-city-wrapper {
    padding: 2rem;
    padding-top:1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h2{
        color:$navy;
    }

    .clinic {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>