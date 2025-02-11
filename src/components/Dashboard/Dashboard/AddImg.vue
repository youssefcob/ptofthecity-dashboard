<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const files = ref<File[]>([]);
const errorMessages = ref<string[]>([]);
const loading = ref(false);
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        files.value = [];
        errorMessages.value = [];
        for (const file of Array.from(input.files)) {
            if (file.size > 2 * 1024 * 1024) {
                errorMessages.value.push(`${file.name} is larger than 2MB.`);
            } else if (!file.type.startsWith('image/')) {
                errorMessages.value.push(`${file.name} is not an image.`);
            } else {
                files.value.push(file);
            }
        }
    }
};

const copyRes = () => {
    const res = Object.entries(responses.value).map(([name, link]) => `${name}% ${link}`).join('\n');
    navigator.clipboard.writeText(res);
};

const responses = ref<{ [key: string]: string }>({});

const submit = async () => {

    if (files.value.length === 0) {
        return;
    }
    if (errorMessages.value.length > 0) {
        alert('Please fix the errors before submitting');
        return;
    }
    loading.value = true;
    responses.value = {};
    for (const file of files.value) {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await Http.post('image', formData,  {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            );

    //         let res = await Http.post(`admin/email`, {
    //     email: email.value,
    //     title: props.form
    // },
    //     {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     }

    // );
            responses.value[file.name] = res.data;
            console.log(res)
        } catch (error) {
            errorMessages.value.push(`Failed to upload ${file.name}`);
            loading.value = false;

        }
    }
    loading.value = false;
    files.value = [];
    errorMessages.value = [];
};
</script>
<template>
    <div class="addImgWrapper">
        <input type="file" name="filefield" multiple @change="handleFileChange">
        <span class="ps">Max Size: 2MB</span>
        <div class="filesNamesWrapper" v-if="files.length > 0 || errorMessages.length > 0" >
            <ul>
                <li v-for="file in files" :key="file.name">{{ file.name }}</li>
            </ul>
            <ul>
                <li v-for="error in errorMessages" :key="error" style="color: red;">{{ error }}</li>
            </ul>



        </div>
        <div class="res" v-if="Object.keys(responses).length > 0 && errorMessages.length === 0" @click="copyRes()">
            <h3>Click To Copy</h3>
            <ul>
                <li v-for="(link, name) in responses" :key="name">{{ name }}: {{ link }}</li>
            </ul>
        </div>
        <Btn class="add" :loading="loading" @click="submit()">Submit</Btn>

    </div>
</template>


<style lang="scss" scoped>
.addImgWrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: $grey;
    padding: 1.5rem;

    .filesNamesWrapper {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 1rem;

        ul {
            list-style-type: none;

        }
    }
    .res {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid black;
        cursor: pointer;
        ul {
            list-style-type: none;
        }
    }
}
</style>