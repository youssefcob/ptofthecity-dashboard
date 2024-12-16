<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import Img from './sections/ImgComponent.vue';

import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import ImgFormModal from './ImgFormModal.vue';



type Image = {
    title: string,
    path: string
}

// const contentImages = ['career']

const images: Ref<Image[]> = ref([]);

const getImages = async () => {
    const res = await Http.get('content/images');
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
    const index = images.value.findIndex(image => image.title === e.title);
    if (index !== -1) {
        images.value[index] = e;
    }
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
        <Img 
        v-for="image in images"
        :image="image" @openModal="openModal($event)" />
    </div>
</template>