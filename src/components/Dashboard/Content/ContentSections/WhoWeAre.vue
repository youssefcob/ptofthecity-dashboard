<script setup lang="ts">

import Modal from '@/components/sharedComponents/Modal.vue';
import { reactive, ref} from 'vue';
import EditWhoWeAre from './EditWhoWeAre.vue';

const props = defineProps<{
    content: any
}>();
const modal = ref<InstanceType<typeof Modal> | null>(null);

</script>

<template>
    <Modal ref="modal">
       <EditWhoWeAre :whoWeAre="props.content" @cancel="modal?.closeModal()" />

    </Modal>
    <div class="landing-page">
        <div class="header">
            <h2>Who We Are</h2>
            <div class="btn-wrapper">
                <button class="btn add" @click="modal?.openModal()">Edit</button>
            </div>
        </div>

        <div class="card">
            <p><strong>Number of Clinics:</strong> {{ props.content.clinics }}</p>
            <p><strong>Successful Cases:</strong> {{ props.content.successful_cases }}</p>
            <p><strong>Employees:</strong> {{ props.content.employees }}</p>
            <p><strong>Our Story:</strong> {{ props.content.our_story }}</p>
            <p><strong>Our Technique:</strong> {{ props.content.our_technique }}</p>
            <p><strong>vision:</strong> {{ props.content.vision }}</p>
            <p><strong>Mission:</strong> {{ props.content.mission }}</p>

        </div>
    </div>
</template>

<style scoped lang="scss">
.add-image {
    background-color: $darkgrey;
    width: 20rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.landing-page {
    .header {
        display: flex;

        justify-content: space-between;


    }

    .card {
        margin-top: 2rem;
        width: 100%;
        background-color: $darkgrey;
        border-radius: 10px;
        padding: 2rem;
        display:grid;
        gap:1rem;

        
    }
}
</style>