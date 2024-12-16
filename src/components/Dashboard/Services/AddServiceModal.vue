<script setup lang="ts">
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import ServiceListHelper from './ServiceListHelper.vue';
import { reactive, ref } from 'vue';
import Http from '@/mixins/Http';
import Btn from '@/components/sharedComponents/btn.vue';


const form: { title: string, description: string, listHeader: string, path: string, list: string[] } = reactive({
    title: '',
    description: '',
    listHeader: '',
    path: '',
    list: []
});
const emit = defineEmits(['cancel', 'submit']);
const image = ref(new FormData());

const loading = ref(false);
const submit = async () => {
    let id = await submitImage();
    let res = await submitService(id);

    console.log(res.data);
    if (res.status === 200) {
        window.location.reload();
    }


}

const submitImage = async () => {
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
    loading.value = true;
    let res = await Http.post(`services/image`, formData, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(res);
    if (res.status === 200) {
        loading.value = false;
        return res.data;
        // window.location.reload();
    } else {
    console.log(res);

        alert(res.message);
    }
    } catch (error) {
        console.log(error)
        loading.value = false;
    }
    // console.log(form)
   
}

const submitService = async (id: string) => {
    loading.value = true;
    let res = await Http.post(`services/imageData/${id}`, form, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.value = false;

    console.log(res);
    if (res.status === 200) {
        return res;
    } else {
    console.log(res);

        alert(res.message);
    }
}
const cancel = () => {
    emit('cancel');
}

const addToList = (list: string[]) => {
    form.list = list;

    console.log(list)
}
</script>

<template>

    <form action="" class="addService">
        <h1>Add Service</h1>

        <div class="form-wrapper">
            <div>
                <InputField required class="field" placeHolder="Service Title" id="serviceTitle"
                    @input="form.title = $event" />

                <InputField height="21.3rem" required class="field" placeHolder="Description" id="description"
                    @input="form.description = $event" />
            </div>
            <div>
                <FileInputField @input="image = $event" placeHolder="Image" />

                <div class="ps">LandScape Image aspect ratio of 2:3 or 3:4,
                    also used vertically, point of focus in the middle.</div>

                <InputField class="field" placeHolder="List Header" id="listHeader" @input="form.listHeader = $event" />
                <ServiceListHelper @input="addToList($event)" />
            </div>
        </div>

        <div class="buttons-wrapper">
            <Btn :loading="loading" @click="submit()">Confirm</Btn>
            <div class="btn cancel" @click="cancel()">Cancel</div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.addService {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: $grey;
    padding: 2rem;

    .buttons-wrapper {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;

        .cancel {
            background-color: $darkgrey;
        }
    }

    .form-wrapper {
        display: flex;

        >div {
            display: flex;
            flex-direction: column;

            gap: 0.5rem;
        }

        gap: 1rem;


    }
}
</style>