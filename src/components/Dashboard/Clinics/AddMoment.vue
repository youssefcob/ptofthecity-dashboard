<script setup lang="ts">
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

const emit = defineEmits(['clinicUpdated']);

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
        let res = await Http.post(`clinic/upload/${props.id}`, formData, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        console.log(res);
        if (res.status === 200) {
            console.log(res.data);
            emit('clinicUpdated', res.data);
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
        <div class="btn" @click="submitImage()">Submit Image</div>
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