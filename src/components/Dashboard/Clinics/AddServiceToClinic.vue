<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import DropDownInputField from '@/components/sharedComponents/DropDownInputField.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';


const props = defineProps({
    id: {
        type: Number,
    },
    services: {
        type: Array<Service>,
        // required: true,
    }
});

const input = ref('');

const list = ref<string[]>([]);

const httpServices: Ref<Service[]> = ref([]);
const servicesList: Ref<string[]> = ref([]);
const getServices = async () => {
    let data = await Http.get('services');
    const filteredData = data.data.filter((service: Service) => {
        return !props.services?.some((propService: Service) => propService.id === service.id);
    });
    httpServices.value = filteredData;
    servicesList.value = filteredData.map((service: Service) => service.title);

}
onMounted(() => {
    if (props.services)
        list.value = props.services?.map(service => service.title);
    getServices();
});

const emit = defineEmits(['input','deleteService']);

const listInput: Ref<InstanceType<typeof DropDownInputField> | null> = ref(null);

const addServiceToClinic = async () => {
    loading.value = true;
    const res = await Http.post(`clinic/addService/${props.id}`, {
        service_id: getServiceFromInput()?.id
    },
        {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

    );
    loading.value = false;

    return res.data;

}
const addToList = async () => {

    if(input.value === '') return;
    let service = await addServiceToClinic();
    list.value.push(input.value);
    listInput.value?.clear();
    // Remove the added service from httpServices and servicesList
    const serviceId = getServiceFromInput()?.id;
    httpServices.value = httpServices.value.filter(s => s.id !== serviceId);
    servicesList.value = servicesList.value.filter(title => title !== input.value);

    emit('input', service);
    input.value = '';
}

const getServiceFromInput = () => {
    let service = httpServices.value.find(service => service.title === input.value);
    return service;
}
const loading = ref(false);
const RemoveServiceFromClinic = async (item:string)=>{
    let service_id = props.services?.find(service => service.title === item)?.id;
    let clinic_id = props.id;

    console.log(service_id, clinic_id);

    loading.value = true;
    const res = await Http.delete(`clinic/removeService/${clinic_id}/${service_id}`,
        {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

    );
    loading.value = false;

    if(res.status === 401) window.location.href = '/login';
    else 

    return service_id

}
const deleteItem = async (item: string, event: any) => {
    // event.stopPropagation(); // Stop event propagation

    console.log(item)
    let service_id = await RemoveServiceFromClinic(item);
    const index = list.value.indexOf(item);
    if (index > -1) {
        list.value.splice(index, 1);
    }

    emit('deleteService', service_id);

}

const assignInput = (event: any) => {
    input.value = event;
    // event.stopPropagation();
}

</script>

<template>
    <div class="seudo-container">
        <div class="addToList-wrapper">
            <DropDownInputField ref="listInput" placeHolder="Add To Services" :list="servicesList"
                @input="assignInput($event)" />
            <Btn class="add" :loading="loading" @click="addToList()">Add</Btn>

        </div>

        <div class="list input-field">
            <div class="item" v-for="item in list"><span>{{ item }}</span>
                <div class="btn delete" @click="deleteItem(item, $event)">-</div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.seudo-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: $darkgrey;
}

.addToList-wrapper {
    display: flex;
    gap: 2rem;
}

.list {
    width: 100%;
    max-width: 24rem;
    height: fit-content;
    min-height: 10rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;

    .item {
        display: flex;
        // justify-content:center;
        gap: 0.2rem;
        align-items: center;
        background-color: $darkgrey;
        border-radius: 10px;
        padding: 0.5rem;

        .btn {
            padding: 0.1rem 0.5rem;
            border-radius: 100vh;
        }
    }
}
</style>