<script setup lang="ts">

import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import Http from '@/mixins/Http';
import { ref, onMounted, type Ref } from 'vue';

const images = ref([]);
const modal:Ref<InstanceType<typeof Modal> | null> = ref(null);

const formImage = ref(new FormData());

const getLandingPageImages = async () => {
    let res = await Http.get('content/carousel');
    console.log(res);

    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) {

        if (res.data.body) {
            images.value = res.data.body;
        } else {
            console.log('No images found');
        }
    }
}

const submitImage = async () => {
    let formData = new FormData();
    let img = formImage.value as FormData;
    for (let [key, value] of img.entries()) {
        console.log(key, value);
        if (value) {
            formData.append('image', value);
            // console.log(value);
            break;
        }
    }
    let res = await Http.post('content/carousel', formData,{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    } );

    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) {
        images.value = res.data.body;
    }
}

const deleteImage = async (image:string) => {
    let res = await Http.delete(`content/carousel`,{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },{
        imageId : image
    }
);
    console.log(res);

    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) {
        images.value = res.data.body;
    }
}

onMounted(() => {
    getLandingPageImages();
});
</script>

<template>
    <Modal ref="modal">
        <div class="add-image">
        <FileInputField @input="formImage = $event" placeHolder="Image"/>
        <button class="btn add" @click="submitImage()">submit</button>
        <button class="btn add" @click="modal?.closeModal()">Cancel</button>
    </div>

    </Modal>
    <div class="landing-page">
        <div class="header">
            <h2>Landing Page</h2>
            <div class="btn-wrapper">
                <button class="btn add" @click="modal?.openModal()">Add Image</button>
            </div>
        </div>

        <div class="card">
            <ul>
                <li v-for="(image,index) in images" :key="index">
                   <a :href="image" target="_blank"> Image {{ index + 1 }} </a>
                   <div class="btn delete" @click="deleteImage(image)">Delete</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.add-image{
    background-color: $darkgrey;
    width:20rem;
    padding:3rem;
    display:flex;
    flex-direction: column;
    gap:2rem;
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
        padding:2rem;
        ul{
            list-style:circle;
            list-style-position: inside;
            li{
                text-decoration: none;
                border-bottom:1px solid black;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                display:flex;
                justify-content:space-between;

                .btn{
                    height:1rem;
                }

                a{
                    display:block;
                    color:black;
                    text-decoration: underline;
                    &:hover{
                        color:blue;
                    }
                }
            }
        }
    }
}
</style>