<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import { ref, type Ref } from 'vue';
import AddAdminModal from './AddAdminModal.vue';
const emit = defineEmits(['search']);
const search = (event: any) => {
    emit('search',event.target.value);
}

const modal:Ref<InstanceType<typeof Modal> | null> = ref(null);
</script>

<template>
            <Modal ref="modal" >
                <AddAdminModal />
            </Modal>

    <div class="header">
        <h1>Admins</h1>

        <div class="btn-search-wrapper">
            <router-link to="/dashboard/admin/emails" class="add">Admin Emails</router-link>
            <input type="text" placeholder="Search Admins" class="search" @input="search($event)">
            <button class="add" @click="modal?.openModal()">Add Admin</button>

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