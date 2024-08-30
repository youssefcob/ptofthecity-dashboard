<script setup lang="ts">
import type { Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import ServicesHeader from './ServicesHeader.vue';
import ServiceCard from './ServiceCard.vue';

const services: Ref<Service[]> = ref([]);

const searchedServices: Ref<Service[]> = ref([]);

const getServices = async () => {
    let data = await Http.get('services');
    services.value = data;
    searchedServices.value = data;
    console.log(data)
}

const deleteService = (id: number) => {
    console.log(id);
    services.value = services.value.filter((service: Service) => parseInt(service.id) !== id);
    searchedServices.value = searchedServices.value.filter((service: Service) => parseInt(service.id) !== id);
}

const search = (searchTerm: string) => {
    searchedServices.value = services.value.filter((service: Service) => service.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
}

onMounted(() => {
    getServices();

});
</script>


<template>

    <div class="services-container">
        <div class="servicesHeader">
            <ServicesHeader @search="search($event)" />
        </div>
        <!-- {{ service_cities }} -->

        <div class="service-city-wrapper">
            <!-- <h2>Services</h2> -->
            <div class="service" v-for="service in searchedServices">
                <ServiceCard @serviceDeleted="deleteService($event)" :service="service"></ServiceCard>

            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.services-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .service-city-wrapper {
    padding: 2rem;
    padding-top:1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h2{
        color:$navy;
    }

    .service {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>