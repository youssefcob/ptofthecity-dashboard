<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import type { Campaign } from '@/interfaces/content';
import { ref, type Ref } from 'vue';
import EditCampaign from './EditCampaign.vue';
import EditCampaignImageModal from './EditCampaignImageModal.vue';



const props = defineProps({
    campaign: {
        type: Object as () => Campaign,
        required: true
    },
    loading: {
        type: Boolean as () => boolean,
        required: true
    }
});

const emit = defineEmits(['delete']);
const deleteCampaign = (id: number) => {
    emit('delete', id);
}

const editCampaignModal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const openEditModal = () => {
    editCampaignModal.value?.openModal()
}

const editImageModal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const editImageForm: Ref<InstanceType<typeof EditCampaignImageModal> | null> = ref(null);
const openEditImageModal = (id :number) => {
    editImageForm.value?.assignId(id);
    editImageModal.value?.openModal()
}
const refresh=()=>{
    location.reload();
}

</script>

<template>


    <Modal ref="editCampaignModal">
        <EditCampaign :campaign="campaign" @cancel="editCampaignModal?.closeModal()" />
    </Modal>
    <Modal ref="editImageModal">
        <EditCampaignImageModal ref="editImageForm" @cancel="editImageModal?.closeModal()" @update="refresh()" />
    </Modal>

    <div class="card-header">
        <h2>Title: {{ campaign.title }}</h2>
        <div class="btn-wrapper">
            <Btn class="delete" @click="deleteCampaign(campaign.id)" :loading="loading">Delete</Btn>
            <Btn @click="openEditModal()">Edit</Btn>
        </div>
    </div>

    <div class="slogans">
        <h3>Slogans: </h3><span> [<template v-for="(slogan, index) in campaign.slogans" :key="index">{{ slogan
        }},
            </template>]</span>
    </div>

    <h3>Animation: {{ campaign.animation }}</h3>

    <h3>Interval: {{ campaign.animation_interval }}</h3>
    <h3>Button Link: {{ campaign.buttonLink }}</h3>
    <h3>Button Text: {{ campaign.buttonText }}</h3>
    <h3>Images: </h3>
    <div class="images">
        <template v-for="(image, index) in campaign.images" :key="index">
            <a :href="image.path">Image {{ index }}<br></a>
            <Btn class="edit" @click="openEditImageModal(image.id)">Edit</Btn>
        </template>
    </div>

    <!-- {{ landingPage }} -->
</template>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-wrapper {
        display: flex;
        gap: 1rem;
    }
}

.slogans {
    display: flex;

    // flex-direction: column;
    // flex-wrap: wrap;
    // gap: 0.2rem;
    span {
        font-size: 1.5rem;
    }

    // text-align: center;
}

.images {
    display: flex;
    justify-content: space-between;

    a {
        font-size: 1.5rem;
        color: blue;
        text-decoration: underline;

    }
}
</style>