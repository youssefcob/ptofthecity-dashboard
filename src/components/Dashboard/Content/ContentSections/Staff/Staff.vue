<script setup lang="ts">
import Http from '@/mixins/Http';
import StaffHeader from './StaffHeader.vue';
import { onMounted, ref, type Ref } from 'vue';
import Btn from '@/components/sharedComponents/btn.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import AddStaffModal from './AddStaffModal.vue';

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
const modal :Ref<InstanceType<typeof Modal> | null> = ref(null)
const loading = ref(false)
const getStaff = async () => {
    const res = await Http.get('content/staff');
    staff.value = res.data
}

const deleteMember = async (id:number) => {
    loading.value = true;
    const res= await Http.delete(`content/staff/${id}`);
    loading.value = false;
    staff.value = staff.value.filter((member) => member.id !== id);
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
            <div class="staff-card-header">
                <h2>{{ member.first_name }} {{ member.last_name }}</h2>
                <Btn class="delete" :loading="loading" @click="deleteMember(member.id)">Delete</Btn>
            </div>
            <div class="staff-card-body">
                <div><strong>occupation: </strong>
                    <p> {{ member.occupation }}</p>
                </div>
                <div><strong>schedule: </strong>
                    <p> {{ member.schedule }}</p>
                </div>
                <div><strong>title: </strong>
                    <p> {{ member.title }}</p>
                </div>
                <div class="img"><strong>image: </strong> <a :href="member.image" target="_blank">Click Here!</a>

                </div>
                <div><strong>bio: </strong>
                    <p> {{ member.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.staff-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .staff-container-header{
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        >h2{
            color:$navy;
        }
        
    }
    .staff-card {
        border-bottom: 1px solid black;
        padding: 1rem;
        background-color: $darkgrey;
        border-radius: 10px;

        .staff-card-header {
            display: flex;
            justify-content: space-between;
        }

        .staff-card-body {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;

            >div {
                
                display: flex;
                flex-direction: row;

                &.img{
                    align-items: center;
                    a{
                        @extend p ;
                        color:blue;
                        text-decoration: underline;
                    }

                }
                p,
                strong {
                    display: inline;
                }
            }
        }
    }
}
</style>