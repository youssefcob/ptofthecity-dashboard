<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import ListInput from '@/components/sharedComponents/ListInput.vue';
import MultiFileInputField from '@/components/sharedComponents/MultiFileInputField.vue';
import Http from '@/mixins/Http';
import { reactive, ref } from 'vue';

const emit = defineEmits(['close', 'submit']);

const loading = ref(false);

type Form = {
    title: string,
    slogans: string[],
    images: FormData,
    animation_interval: string,
    buttonLink: string,
    buttonText: string
}

const form: Form = reactive({
    title: '',
    slogans: [],
    images: new FormData(),
    animation_interval: '',
    buttonLink: '',
    buttonText: ''
})

const submitForm = async () => {

    let modifiedForm = modifyForm();
    try {
        loading.value = true;
        const res = await Http.post('content/campaign', modifiedForm, { Authorization: `Bearer ${localStorage.getItem('token')}` , 'Content-Type': 'multipart/form-data' });

        console.log(res.data);
        loading.value = false;
        if (res.status != 200) {
            if (res.status === 422) {
                alert(res.data.message);
            }
            if (res.status === 401) {
                alert('Unauthorized');
                window.location.href = '/login';
            }
            console.log(res);
            return;
        }

        emit('submit', res.data);
    } catch (error) {
        loading.value = false;

        console.log(error);
    }
}

const modifyForm = () => {
    let frm = new FormData();
    form.slogans.forEach((slogan) => {
        frm.append('slogans[]', slogan);
    });
    form.images.forEach((value, key) => {
        frm.append('images[]', value);
    });
    frm.append('title', form.title);
    frm.append('animation_interval', form.animation_interval);
    frm.append('buttonLink', form.buttonLink);
    frm.append('buttonText', form.buttonText);

    return frm;
    
}




const modifyImages = (images: FormData) => {
    form.images = images;
}


</script>

<template>

    <div class="form-wrapper">

        <div class="left">
            <InputField placeHolder="Add Title" @input="form.title = $event" />
            <InputField placeHolder="Interval In ms" @input="form.animation_interval = $event" />
            <InputField placeHolder="Button Link" @input="form.buttonLink = $event" />
            <InputField placeHolder="Button text" @input="form.buttonText = $event" />
            <div class="btn-wrapper">
                <Btn class="btn add" @click="submitForm()" :loading="loading">submit</Btn>
                <div class="btn cancel" @click="emit('close')">Cancel</div>
            </div>
        </div>
        <div class="right">
            <div>
            <MultiFileInputField @input="modifyImages($event)" />
            <div class="ps">landscape aspect ratio 2:3 / 3:4 </div>
        </div>
            <ListInput placeHolder="Add Slogans" @input=" form.slogans = $event" />
        </div>

    </div>
</template>


<style scoped lang="scss">
.form-wrapper {
    background-color: $darkgrey;
    // width: 20rem;
    padding: 3rem;
    display: flex;
    flex-direction: row-reverse;
    // flex-direction: column;
    gap: 2rem;

    .left {
        display: flex;
        flex-direction: column;
        gap: 2.24rem;

        .btn-wrapper {
            display: flex;
            flex-direction: column;
            gap: 2.24rem;
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>