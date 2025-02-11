<script setup lang="ts">
import Http from '@/mixins/Http';
import { onMounted, reactive, ref, type Ref } from 'vue';


import Modal from '@/components/sharedComponents/Modal.vue';
import EditWhoWeAre from './EditWhoWeAre.vue';

const modal = ref<InstanceType<typeof Modal> | null>(null);

type Content = {
    clinics: number,
    successful_cases: number,
    employees: number,
    our_story: string,
    our_technique: string,
    vision: string,
    mission: string
}

let content: Ref<Content> = ref({
    clinics: 0,
    successful_cases: 0,
    employees: 0,
    our_story: '',
    our_technique: '',
    vision: '',
    mission: ''
});


const loading = ref(true);

const getContent = async (title: string) => {
    let data = await Http.get('content')
    if (data.data.length === 0) {
        loading.value = false;
        return;
    }

    content.value = data.data.filter((item: any) => item.title === title)[0].body;

    loading.value = false;

}

onMounted(async () => {
    await getContent("Who We Are")
    // console.log(content)
})

</script>

<template>
    <Modal ref="modal">

        <template v-if="!loading">
            <EditWhoWeAre :whoWeAre="content" @cancel="modal?.closeModal()" />
        </template>
    </Modal>

    <div class="landing-page">
        <div class="header">
            <h2>Who We Are</h2>
            <div class="btn-wrapper">
                <button class="btn add" @click="modal?.openModal()">Edit</button>
            </div>
        </div>

        <div class="card">
            <p><strong>Number of Clinics:</strong> {{ content.clinics }}</p>
            <p><strong>Successful Cases:</strong> {{ content.successful_cases }}</p>
            <p><strong>Employees:</strong> {{ content.employees }}</p>
            <p><strong>Our Story:</strong> {{ content.our_story }}</p>
            <p><strong>Our Technique:</strong> {{ content.our_technique }}</p>
            <p><strong>vision:</strong> {{ content.vision }}</p>
            <p><strong>Mission:</strong> {{ content.mission }}</p>

        </div>
    </div>
</template>

<style scoped lang="scss">
.add-image {
    background-color: $darkgrey;
    width: 20rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

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
        display: grid;
        gap: 1rem;


    }
}
</style>