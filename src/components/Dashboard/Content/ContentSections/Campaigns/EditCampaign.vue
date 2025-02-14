<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import ListInput from '@/components/sharedComponents/ListInput.vue';
import type { Campaign } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive, ref } from 'vue';

const emit = defineEmits(['close', 'submit']);

const loading = ref(false);

type Form = {
    title: string,
    slogans: string[],
    animation_interval: string,
    buttonLink: string,
    buttonText: string
}


const props = defineProps(
    {
        campaign: {
            type: Object as () => Campaign,
            required: true
        }
    }
);

const form: Form = {
    title: props.campaign.title,
    slogans: props.campaign.slogans,
    animation_interval: props.campaign.animation_interval,
    buttonLink: props.campaign.buttonLink,
    buttonText: props.campaign.buttonText,
}



const submitForm = async () => {

    try {
        console.log(form)
        loading.value = true;
        const res = await Http.patch(`content/campaign/${props.campaign.id}`, form, { Authorization: `Bearer ${localStorage.getItem('token')}` });

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
        window.location.reload();
    } catch (error) {
        loading.value = false;

        console.log(error);
    }
}



</script>

<template>

    <div class="form-wrapper">
        <div class="right">
            <ListInput placeHolder="Add Slogans" @input=" form.slogans = $event" :list="campaign.slogans" />

        </div>
        <div class="left">
            <InputField placeHolder="Add Title" @input="form.title = $event" :value="campaign.title" />
            <InputField placeHolder="Interval In ms" @input="form.animation_interval = $event"
                :value="campaign.animation_interval" />
            <InputField placeHolder="Button Link" @input="form.buttonLink = $event" :value="campaign.buttonLink" />
            <InputField placeHolder="Button text" @input="form.buttonText = $event" :value="campaign.buttonText" />

            <div class="btn-wrapper">
                <Btn class="btn add" @click="submitForm()" :loading="loading">submit</Btn>
                <div class="btn cancel" @click="emit('close')">Cancel</div>
            </div>
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