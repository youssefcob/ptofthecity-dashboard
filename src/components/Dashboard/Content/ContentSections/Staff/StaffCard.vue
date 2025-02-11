<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import Http from '@/mixins/Http';
import { ref, type Ref } from 'vue';
import EditStaffModal from './EditStaffModal.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import type { Staff } from '@/interfaces/content';
import EditImageModal from './EditImageModal.vue';


const props = defineProps({
    member: Object as () => Staff,
});

const loading = ref(false)

const emit = defineEmits([`delete`, 'update']);

const deleteMember = async (id: number | undefined) => {
    if (!id) return;
    loading.value = true;
    const res = await Http.delete(`content/staff/${id}`);
    loading.value = false;

    emit(`delete`, id);
}

const editModal: Ref<InstanceType<typeof Modal> | null> = ref(null)

const changeImageModal: Ref<InstanceType<typeof Modal> | null> = ref(null)

</script>

<template>
    <Modal ref="editModal">
        <EditStaffModal :member="props.member" @update="emit('update', $event)" @cancel="editModal?.closeModal" />
    </Modal>

    <Modal ref="changeImageModal">
        <EditImageModal :id="props.member?.id" @update="emit('update', $event)" @cancel="changeImageModal?.closeModal" />
    </Modal>

    <div class="staff-card-header">
        <h2>{{ member?.first_name }} {{ member?.last_name }}</h2>
        <div class="btn-container">
            <Btn class="delete" :loading="loading" @click="deleteMember(member?.id)">Delete</Btn>
            <Btn class="edit" @click="editModal?.openModal()">Edit</Btn>
        </div>
    </div>
    <div class="staff-card-body">
        <div><strong>occupation: </strong>
            <p> {{ member?.occupation }}</p>
        </div>
        <div><strong>schedule: </strong>
            <p> {{ member?.schedule }}</p>
        </div>
        <div><strong>title: </strong>
            <p> {{ member?.title }}</p>
        </div>
        <div class="img">
            <div><strong>image: </strong> <a :href="member?.image" target="_blank">Click Here!</a>
            </div>
            <Btn class="edit" @click="changeImageModal?.openModal()">Change Image</Btn>
        </div>
        <div><strong>bio: </strong>
            <p> {{ member?.bio }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.staff-card-header {
    display: flex;
    justify-content: space-between;

    .btn-container {
        display: flex;
        gap: 1rem;
    }
}

.staff-card-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    >div {

        display: flex;
        flex-direction: row;

        &.img {
            align-items: center;
            justify-content: space-between;

            a {
                @extend p;
                color: blue;
                text-decoration: underline;
            }

        }

        p,
        strong {
            display: inline;
        }
    }
}
</style>