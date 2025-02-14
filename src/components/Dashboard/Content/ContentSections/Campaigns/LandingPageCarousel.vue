<script setup lang="ts">

import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import Http from '@/mixins/Http';
import { ref, onMounted, type Ref, watch } from 'vue';
import AddCampaignModal from './AddCampaignModal.vue';
import Btn from '@/components/sharedComponents/btn.vue';
import EditCampaign from './EditCampaign.vue';
import CampaignCard from './CampaignCard.vue';


const landingPage = ref<{
    id: number,
    title: string,
    slogans: string[],
    images: {
        path: string
    }[],
    animation_interval: string,
    buttonLink: string,
    buttonText: string,
    animation: string
}[]>([]);

const campaignModal: Ref<InstanceType<typeof Modal> | null> = ref(null);


const loading: Ref<boolean> = ref(false);

const handleSubmission = (data: any) => {
    console.log(data);
    let updatedLandingPage = landingPage.value;
    updatedLandingPage.push(...data);
    landingPage.value = updatedLandingPage;
    campaignModal.value?.closeModal();
}

const fetchLandingPage = async () => {
    try {
        const res = await Http.get('content/campaign', { Authorization: `Bearer ${localStorage.getItem('token')}` });
        console.log(res.data);
        landingPage.value = res.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteCampaign = async (id: number) => {
    loading.value = true;
    try {
        const res = await Http.delete(`content/campaign/${id}`, { Authorization: `Bearer ${localStorage.getItem('token')}` });
        console.log(res.data);
        loading.value = false;
        if (res.status != 200) {
            console.log(res);
            return;
        }
        landingPage.value = landingPage.value.filter((campaign) => campaign.id !== id);
    } catch (error) {
        loading.value = false;
        console.log(error);
    }
}
const openModal = () => {
    campaignModal.value?.openModal()
}



onMounted(() => {
    fetchLandingPage();
});
</script>

<template>
    <Modal ref="campaignModal">
        <AddCampaignModal @close="campaignModal?.closeModal()" @submit="handleSubmission($event)" />

    </Modal>

    <div class="landing-page">
        <div class="header">
            <h2>Landing Page</h2>
            <div class="btn-wrapper">
                <button class="btn add" @click="openModal()">Add Image</button>
            </div>
        </div>

        <div class="card" v-for="(campaign, index) in landingPage" :key="index">
            <!-- {{campaign}} -->
            <CampaignCard :campaign="campaign" @delete="deleteCampaign($event)"
                :loading="loading" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.landing-page {
    .header {
        display: flex;

        justify-content: space-between;


    }

    .card {
        margin-top: 2rem;
        width: 100%;
        background-color: $darkgrey;
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

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
            a {
                font-size: 1.5rem;
                color: blue;
                text-decoration: underline;
            }
        }

    }
}
</style>