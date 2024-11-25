<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const title = ref('');

const image = ref(new FormData());

const emit = defineEmits(['submit', 'cancel']);

const cancel = () =>{
    emit('cancel')
}

const createForm = () => {
    let form = new FormData();
    form.append('title', title.value);
    for (let [key, value] of image.value.entries()) {
        console.log(key, value);
        if (value) {
            form.append('image', value);
            break;
        }
    }
    return form;
}
const loading = ref(false);
const submit = async () => {
    let form = createForm();
    loading.value = true;
    let res = await Http.post(`images/insurance`,form, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.value = false;

    console.log(res);
    if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 201) {
        // return res;
        window.location.reload();
    } else {
        alert(res.data.error);
    }
}
</script>

<template>

    <form action="" class="addInsurance">
        <h1>Add Insurance</h1>

        <div class="form-wrapper">
            <InputField placeHolder="title" @input="title = $event" />
            <FileInputField placeHolder="image" @input="image = $event" />
        </div>

        <div class="buttons-wrapper">
            <Btn class="btn" @click="submit()" :loading="loading">Confirm</Btn>
            <div class="btn cancel" @click="cancel()">Cancel</div>
        </div>
    </form>


</template>

<style scoped lang="scss">
.addInsurance {

    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color: $grey;
    padding: 2rem;

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .title {
            grid-column: 1/3;
        }
    }

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
        flex-direction: column;
        gap: 2rem;


    }
}
</style>