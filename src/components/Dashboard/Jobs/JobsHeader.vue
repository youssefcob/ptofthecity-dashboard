<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import { ref, type Ref } from 'vue';
import AddJobModal from './AddJobModal.vue';


const modal: Ref<InstanceType<typeof Modal> | null> = ref(null);


</script>


<template>
    <Modal ref="modal">
        <AddJobModal />
    </Modal>

    <div class="header">
        <h1>Jobs</h1>
        <button class="btn" @click="modal?.openModal()">Add Job</button>
    </div>
</template>


<style scoped lang="scss">
.header {
    padding: 1rem;
    // height:30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
}
</style>