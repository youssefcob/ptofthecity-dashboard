<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import { ref, type Ref } from 'vue';
import AddClinicModal from './AddClinicModal.vue';
const emit = defineEmits(['search']);
const search = (event: any) => {
    emit('search',event.target.value);
}

const modal:Ref<InstanceType<typeof Modal> | null> = ref(null);
</script>

<template>
            <Modal ref="modal" >
                <AddClinicModal @close="modal?.closeModal()" />
            </Modal>

    <div class="header">
        <h1>Clinics</h1>

        <div class="btn-search-wrapper">
            <input type="text" placeholder="Search Clinics" class="search" @input="search($event)">
            <button class="add" @click="modal?.openModal()">Add Clinic</button>

        </div>
    </div>
</template>

<style scoped lang="scss">

.header {
    padding:1rem;
    // height:30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display:flex;
    justify-content:space-between;
    .btn-search-wrapper{
        display:flex;
        gap:2rem;
        align-items: center;
        .add{
            padding:1rem;
            background-color: $green;
            color:white;
            border:none;
            border-radius:10px;
            cursor:pointer;
        }
        input{
            padding:1rem;
            border-radius:10px;
            border:none;
            width:20rem;
        }
    }
}

</style>