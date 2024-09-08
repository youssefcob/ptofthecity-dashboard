<script setup lang="ts">
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const props = defineProps({
    id: String || undefined,
})

let image = ref(new FormData());

const emit = defineEmits(['serviceChanged','cancel']);
const submit = async () => {
    try{
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
    let res = await Http.post(`services/updateImage/${props.id}`, formData, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(res);
    emit('serviceChanged', res.data);
    emit('cancel');
    if (res.status === 200) {
   

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
    <div class="changeImage">
        <FileInputField @input="image = $event" placeHolder="Image" />
        <div class="btn" @click="submit()">Submit</div>
    </div>
</template>

<style scoped lang="scss">

.changeImage{
    // height:30rem;
    width:30rem;
    padding:2rem;

    background-color: $darkgrey;
    .btn{
        width:30%;
        margin-top:1rem;
        margin-left:auto;
    }
}
</style>