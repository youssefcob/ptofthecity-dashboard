<script setup lang="ts">
import Http from '@/mixins/Http';
import StaffHeader from './StaffHeader.vue';
import { onMounted, ref, type Ref } from 'vue';
import Btn from '@/components/sharedComponents/btn.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import AddStaffModal from './AddStaffModal.vue';
import EditStaffModal from './EditStaffModal.vue';
import StaffCard from './StaffCard.vue';

type Staff = {
    id: number;
    title: string;
    first_name: string;
    last_name: string;
    bio: string;
    schedule: string;
    image: string;
    occupation: string;
};
const staff: Ref<Staff[]> = ref([])
const modal: Ref<InstanceType<typeof Modal> | null> = ref(null)
const getStaff = async () => {
    const res = await Http.get('content/staff');
    staff.value = res.data
}

const deleteMember = (id: number) => {
    staff.value = staff.value.filter(member => member.id !== id)
}

const updateMember = (member: Staff) => {
    staff.value = staff.value.map(m => m.id === member.id ? member : m)
}

onMounted(() => {
    getStaff();
})
</script>

<template>
    <Modal ref="modal">
        <AddStaffModal @cancel="modal?.closeModal()" @newStaff="staff.push($event)" />
    </Modal>

    <!-- {{ staff }} -->
    <div class="staff-container">
        <div class="staff-container-header">
            <h2>Staff</h2>
            <Btn class="add" @click="modal?.openModal()">Add</Btn>
        </div>
        <div class="staff-card" v-for="member in staff">
            <StaffCard :member="member"  @delete="deleteMember($event)" @update="updateMember($event)"/>
         
        </div>
    </div>
</template>

<style lang="scss" scoped>
.staff-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .staff-container-header {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        border-radius: 10px;

        >h2 {
            color: $navy;
        }

    }

    .staff-card {
        border-bottom: 1px solid black;
        padding: 1rem;
        background-color: $darkgrey;
        border-radius: 10px;

 
    }
}
</style>