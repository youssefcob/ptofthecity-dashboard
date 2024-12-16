<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const image = ref(new FormData());

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['newClinic']);

const loading = ref(false);

const submitImage = async () => {
    try {
        let formData = new FormData();
        // img.append('image', image);
        let img = image.value as FormData;
        for (let [key, value] of img.entries()) {
            console.log(key, value);
            if (value) {
                formData.append('image', value);
                // console.log(value);
                break;
            }
        }
        loading.value = true;
        let res = await Http.post(`clinic/image/${props.id}`, formData, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        loading.value = false;
        console.log(res);
        // if (res.status === 401) window.location.href = '/login';
        // if (res.status === 200) { emit('newClinic', res.data); 
        if (res.status === 200) {
            console.log(res.data);
            emit('newClinic', res.data);
            return res.data;
            // window.location.reload();
        } else {
            console.log(res);

            alert(res);
        }
    } catch (error) {
        console.log(error)
    }
    // console.log(form)

}


</script>
<template>
    <div class="wrapper">
        <div class="field"><FileInputField placeHolder="Upload Image" @input="image = $event" /></div>
        <div class="ps">LandScape Image aspect ratio of 2:3 or 3:4</div>

        <Btn class="btn" @click="submitImage()" :loading="loading">Submit Image</Btn>
    </div>
</template>

<style scoped lang="scss">

.wrapper{
    background-color: $darkgrey;
    padding:2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    .btn{
        padding:1rem;
    }
    .field{
    }
}

</style>