<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import { ref, type Ref } from 'vue';
import AddTrustedByModal from './AddTrustedByModal.vue';


const modal: Ref<InstanceType<typeof Modal> | null> = ref(null);

    const emit = defineEmits(['submit'])

</script>


<template>
    <Modal ref="modal">
        <AddTrustedByModal @submit="emit('submit',$event)" @close="modal?.closeModal"/>
    </Modal>

    <div class="header">
        <h2>Trusted By</h2>
        <button class="btn" @click="modal?.openModal()">Add Trusted By</button>
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