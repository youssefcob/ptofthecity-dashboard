<script setup lang="ts">

import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import Http from '@/mixins/Http';
import { ref, onMounted, type Ref, watch } from 'vue';
import AddCampaignModal from './AddCampaignModal.vue';
import Btn from '@/components/sharedComponents/btn.vue';


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

const modal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const loading: Ref<boolean> = ref(false);

const handleSubmission = (data: any) => {
    landingPage.value.push(data);
    modal.value?.closeModal();
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
onMounted(() => {
    fetchLandingPage();
});
</script>

<template>
    <Modal ref="modal">
        <AddCampaignModal ref="modal" @close="modal?.closeModal()" @submit="handleSubmission($event)" />

    </Modal>
    <div class="landing-page">
        <div class="header">
            <h2>Landing Page</h2>
            <div class="btn-wrapper">
                <button class="btn add" @click="modal?.openModal()">Add Image</button>
            </div>
        </div>

        <div class="card" v-for="(campaign, index) in landingPage" :key="index">
            <!-- {{campaign}} -->
            <div class="card-header">
                <h2>Title: {{ campaign.title }}</h2>
                <Btn class="delete" @click="deleteCampaign(campaign.id)" :loading="loading">Delete</Btn>
            </div>

            <div class="slogans">
                <h3>Slogans: </h3><span> [<template v-for="(slogan, index) in campaign.slogans" :key="index">{{ slogan }},
                    </template>]</span>
            </div>

            <h3>Animation: {{ campaign.animation }}</h3>

            <h3>Interval: {{ campaign.animation_interval }}</h3>
            <h3>Button Link: {{ campaign.buttonLink }}</h3>
            <h3>Button Text: {{ campaign.buttonText }}</h3>
            <h3>Images: </h3>
            <div class="images">
                <a v-for="(image, index) in campaign.images" :key="index" :href="image.path">Image {{ index }}<br></a>
            </div>

            <!-- {{ landingPage }} -->
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