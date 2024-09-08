<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import type { Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref, type Ref } from 'vue';
import EditService from './EditService.vue';
import ChangeImage from './ChangeImage.vue';
const props = defineProps({
    service: {
        type: Object as () => Service,
        required: true
    },
});

const serviceState:Ref<Service> = ref({ ...props.service });

const showDeleteModal = ref(false);
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}

const emit = defineEmits(['serviceDeleted']);

const deleteService = async (id: string | undefined) => {
    // console.log(id);
    if (!id) return;
    let res = await Http.delete(`services/${id}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // console.log(res);
    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) emit('serviceDeleted', id);
    toggleDeleteModal();
    // window.location.reload();
}

const cancelEdit = ()=>{
    editServiceModal.value?.closeModal();
}

const editServiceModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const changeImageModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
</script>

<template>
    <Modal ref="editServiceModal">
        <EditService :service="serviceState" @serviceChanged="serviceState = $event" @cancel="cancelEdit()"/>
    </Modal>

    <Modal ref="changeImageModal">
        <ChangeImage @serviceChanged="serviceState = $event"   @cancel="changeImageModal?.closeModal()" :id="props.service.id"/>
    </Modal>
    <div class="card">
        <div class="info">
            <div class="header">
                <h2>{{ serviceState?.title }}</h2>

                <div class="btns-wrapper">
                    <button  @click="editServiceModal?.openModal()">Edit</button>
                    <button v-if="!showDeleteModal" class="delete" @click="toggleDeleteModal()">Delete</button>
                    <div class="delete-container" v-if="showDeleteModal">
                        <span>Are you sure you want to delete?</span>
                        <div>
                            <button class="cancel" @click="toggleDeleteModal()">Cancel</button>
                            <button class="delete" @click="deleteService(serviceState?.id)">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <p><strong>Description: </strong>{{ serviceState?.description }}</p>
    <p><strong>list header: </strong> {{ serviceState?.listHeader }}</p>
    <p><strong>list: </strong><span v-for="listItem in serviceState?.list"><br>{{ listItem }}</span></p>
    <div class="img"><p><strong>image:</strong><a :href=" serviceState?.path">Click Here!</a></p> <div class="btn add" @click="changeImageModal?.openModal()">Change Image</div></div>
</template>

<style scoped lang="scss">

.img{
        display:flex;
        justify-content: space-between;
    }
.card {
    display: flex;



    .info {
        width: 100%;


        .header {
            display: flex;

            .delete-container {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-left: auto;

                div {
                    display: flex;
                    gap: 1rem;
                }
            }
        }

        h3 {
            font-weight: bold;
            margin-top: 1rem;
            
        }

        .day {
            display: flex;
        }
    }

    .btns-wrapper {
        display: flex;
        margin-left: auto;
        gap: 1rem;

        button {
            padding: 1rem;
            background-color: $navy;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;

            &.delete {
                background-color: red;
            }

            &.cancel {
                background-color: $grey;
                color: black;
            }

        }
    }



}
</style>