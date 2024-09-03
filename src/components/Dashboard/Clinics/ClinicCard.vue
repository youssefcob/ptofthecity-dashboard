<script setup lang="ts">
import type { Clinic, Schedule, Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref, type Ref } from 'vue';
import ClinicEdit from './ClinicEdit.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import AddServiceToClinic from './AddServiceToClinic.vue';


const props = defineProps({
    clinic: {
        type: Object as () => Clinic,
    },
});


let schedule: Ref<Schedule | []> = ref(props.clinic?.schedule || []);
let days: Ref<string[]> = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

const getHours = (hours: { start: string, end: string, isOff: boolean }) => {
    if (hours.isOff) return `<span>Off</span>`;
    return `<span>${hours.start}</span> - <span>${hours.end}</span>`;
}

const showDeleteModal = ref(false);
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}

const edit = ref(false);
const emit = defineEmits(['clinicDeleted']);
const deleteClinic = async (id: number | undefined) => {
    // console.log(id);
    if (!id) return;
    let res = await Http.delete(`clinic/delete/${id}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // console.log(res);
    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) emit('clinicDeleted', id);
    toggleDeleteModal();
    // window.location.reload();
}

const modal:Ref<InstanceType<typeof Modal> | null> = ref(null);

const AddService = (service:Service) => {
    props.clinic?.services.push(service);
}

const removeService = (service_id:number) => {
    if(props.clinic?.services)
        props.clinic.services = props.clinic?.services.filter(s => parseInt(s.id) !== service_id);
}
</script>

<template>
    <Modal ref="modal">
        <AddServiceToClinic @deleteService="removeService($event)" @input="AddService($event)" :id="$props.clinic?.id" :services="$props.clinic?.services"/>
    </Modal>
    <div v-if="!edit" class="card">
        <div class="info">
            <div class="header">
                <h2>{{ props.clinic?.name }}</h2>

                <div class="btns-wrapper">
                    <button>Edit</button>
                    <button v-if="!showDeleteModal" class="delete" @click="toggleDeleteModal()">Delete</button>
                    <div class="delete-container" v-if="showDeleteModal">
                        <span>Are you sure you want to delete?</span>
                        <div>
                            <button class="cancel" @click="toggleDeleteModal()">Cancel</button>
                            <button class="delete" @click="deleteClinic(props.clinic?.id)">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <p><strong>Street Adress: </strong>{{ props.clinic?.street_address }}</p>
            <p><strong>State: </strong>{{ props.clinic?.state }}</p>
            <p><strong>City: </strong>{{ props.clinic?.city }}</p>
            <p><strong>Capacity: {{ $props.clinic?.capacity }}</strong></p>
            <p><strong>Phone: </strong>{{ props.clinic?.phone }}</p>
            <p><strong>Zip Code: </strong>{{ props.clinic?.zip_code }}</p>
            <p><strong>Latitude:</strong> {{ props.clinic?.lat }}</p>
            <p><strong>Longitude:</strong> {{ props.clinic?.long }}</p>
            <p><strong>Place ID: </strong>{{ props.clinic?.place_id }}</p>
            <p><strong>Description:</strong> {{ props.clinic?.summary }}</p>

            <h3>Schedule</h3>
            <div class="schedule">
                <div class="day" v-for="(day, index) in days" :key="index">
                    <p><strong>{{ day }}: </strong></p>
                    <p v-html="getHours(schedule[day.toLowerCase() as keyof typeof schedule])"></p>
                </div>
            </div>

            <div class="servicesHeader">
                <h3>Services</h3>
                <div class="btn add" @click="modal?.openModal()">Edit Services</div>
            </div>
            <div class="services">
                <p v-for="service in props.clinic?.services" :key="service.id">{{ service.title }}</p>
            </div>
        </div>

    </div>
    <!-- <ClinicEdit @cancel="edit = false" v-if="edit" :clinic="props.clinic"/> -->



</template>

<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;

        .servicesHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;


        }

        .header {
            display: flex;

            .delete-container {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-left: auto;

                div {
                    display: flex;
                    gap: 1rem;
                }
            }
        }

        h3 {
            font-weight: bold;
            margin-top: 1rem;

        }

        .day {
            display: flex;
        }
    }

    .btns-wrapper {
        display: flex;
        margin-left: auto;
        gap: 1rem;

        button {
            padding: 1rem;
            background-color: $navy;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;

            &.delete {
                background-color: red;
            }

            &.cancel {
                background-color: $grey;
                color: black;
            }

        }
    }



}
</style>