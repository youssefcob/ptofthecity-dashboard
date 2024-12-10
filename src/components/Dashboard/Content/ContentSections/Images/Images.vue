<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import Careers from './sections/Careers.vue';

import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import ImgFormModal from './ImgFormModal.vue';

type Body = {
career:string,
}

type Image = {
    title: string,
    body: Body
}
const images: Ref<Image[]> = ref([]);

const getImages = async () => {
    const res = await Http.get('content/images');
    console.log(res)
    images.value = res.data;
}

const modal = ref<InstanceType<typeof Modal> | null>(null);

const imgFormModal = ref<InstanceType<typeof ImgFormModal> | null>(null);
const openModal = (type: string) => {
    if (imgFormModal.value) {
        imgFormModal.value.type = type;
    }
    modal.value?.openModal();
}

const handleNewImage = (e: any) => {
    images.value = (e);
    console.log(e);
}

onMounted(() => {
    getImages()
})

</script>

<template>
    <Modal ref="modal">
        <ImgFormModal ref="imgFormModal"  @newImage="handleNewImage($event)" />
    </Modal>
    <!-- {{ images }} -->
    <div class="sections-wrapper">
        <Careers :images="images" @openModal="openModal('career')" />
    </div>
</template>