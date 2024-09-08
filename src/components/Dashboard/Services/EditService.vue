<script setup lang="ts">
import FileInputField from '@/components/sharedComponents/FileInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Service } from '@/interfaces/content';
import { reactive, ref } from 'vue';
import ServiceListHelper from './ServiceListHelper.vue';
import Http from '@/mixins/Http';


const props = defineProps({
    service: {
        type: Object as () => Service,
        required: true
    }
});

const editForm: Service= reactive({
    title: '',
    description: '',
    listHeader: '',
    path: '',
    list: []
});


const emit = defineEmits(['cancel', 'serviceChanged']);

const submit = async () => {
    console.log(editForm);
    let res = await Http.put(`services/${props.service.id}`, editForm, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(res);
    emit('serviceChanged', res.data);
    emit('cancel');

  


}

const cancel = () => {
    emit('cancel');
}

const addToList = (list: string[]) => {
    // event?.stopPropagation();
    editForm.list = list;

    console.log(list)
}

</script>


<template>

    <form action="" class="addService">
        <h1>Edit Service</h1>

        <div class="form-wrapper">
            <div>
                <InputField required class="field" :value="props.service.title"  placeHolder="Service Title" id="serviceTitle"
                    @input="editForm.title = $event" />

                <InputField height="18.5rem" :value="props.service.description" required class="field" placeHolder="Description" id="description"
                    @input="editForm.description = $event" />
            </div>
            <div>
                <!-- <FileInputField @input="image = $event" placeHolder="Image" /> -->

                <InputField class="field" :value="props.service.listHeader" placeHolder="List Header" id="listHeader" @input="editForm.listHeader = $event" />
                <ServiceListHelper :list="props.service.list" @input="addToList($event)" />
            </div>
        </div>

        <div class="buttons-wrapper">
            <div class="btn" @click="submit()">Confirm</div>
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