<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import type { User } from '@/interfaces/content';
import EditAdminModal from './EditAdminModal.vue';
import { ref } from 'vue';


const props = defineProps({
    admin: {
        type: Object as () => User,
        required: true
    }
})

const edit = ref<InstanceType<typeof Modal> | null>(null);
</script>


<template>
    <Modal ref="edit">
        <EditAdminModal :admin="admin" />
    </Modal>
    <Modal ref="changePassword">
        <AddAdminModal />
    </Modal>
    <div class="card">
        <div class="card-header">
            <h2>Name: {{ props.admin.first_name }} {{ props.admin.last_name }}</h2>

            <div class="btns-wrapper">
                <button class="btn" @click="edit?.openModal()">Edit</button>
                <button class="btn">Change Password</button>
            </div>
        </div>
        <div class="card-body">
            <p><strong>User Name:</strong>{{ props.admin.phone }}</p>
            <p><strong>Role: </strong>{{ props.admin.role }}</p>
        </div>
    </div>
</template>
<style scoped lang="scss">
.card{
    background-color: $darkgrey;

    padding:2rem;
    border-radius: 10px;
    .card-header{
        display:flex;
        justify-content:space-between;
        .btns-wrapper{
            display:flex;
            gap:1rem;
            align-items: flex-start;
        }
    }
}

</style>
