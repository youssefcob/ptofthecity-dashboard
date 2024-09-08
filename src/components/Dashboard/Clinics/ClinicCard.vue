<script setup lang="ts">
import type { Clinic, Schedule, Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive, ref, type Ref } from 'vue';
import ClinicEdit from './ClinicEdit.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import AddServiceToClinic from './AddServiceToClinic.vue';
import EditSchedule from './EditSchedule.vue';
import EditClinic from './EditClinic.vue';


const props = defineProps({
    clinic: {
        type: Object as () => Clinic,
        required: true
        
    },
});

let clinicState = reactive({ ...props.clinic });

let schedule: Ref<Schedule> = ref(clinicState.schedule);
let days: Ref<string[]> = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

const getHours = (hours: { start: string, end: string, off: boolean }) => {
    if (hours.off) return `<span>Off</span>`;
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

const serviceModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const scheduleModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const editClinicModal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const AddService = (service: Service) => {
    clinicState?.services.push(service);
}

const removeService = (service_id: number) => {
    if (clinicState?.services)
        clinicState.services = clinicState?.services.filter(s => parseInt(s.id) !== service_id);
}

const updateClinic = (clinic: Clinic) => {

    clinicState = clinic;
    schedule.value = clinic.schedule;
    scheduleModal.value?.closeModal();
    editClinicModal.value?.closeModal();
}
</script>

<template>
    <Modal ref="serviceModal">
        <AddServiceToClinic @deleteService="removeService($event)" @input="AddService($event)" :id="clinicState?.id"
            :services="clinicState?.services" />
    </Modal>

    <Modal ref="scheduleModal">
        <EditSchedule :id="clinicState.id" :schedule="schedule" @clinicUpdated="updateClinic($event)" />
    </Modal>

    <Modal ref="editClinicModal">
        <EditClinic :id="clinicState.id" :clinic="clinicState" @close="editClinicModal?.closeModal()" @clinicUpdated="updateClinic($event)" />
    </Modal>
    <div v-if="!edit" class="card">
        <div class="info">
            <div class="header">
                <h2>{{ clinicState?.name }}</h2>

                <div class="btns-wrapper">
                    <button @click="editClinicModal?.openModal()">Edit</button>
                    <button v-if="!showDeleteModal" class="delete" @click="toggleDeleteModal()">Delete</button>
                    <div class="delete-container" v-if="showDeleteModal">
                        <span>Are you sure you want to delete?</span>
                        <div>
                            <button class="cancel" @click="toggleDeleteModal()">Cancel</button>
                            <button class="delete" @click="deleteClinic(clinicState?.id)">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <p><strong>Street Adress: </strong>{{ clinicState?.street_address }}</p>
            <p><strong>State: </strong>{{ clinicState?.state }}</p>
            <p><strong>City: </strong>{{ clinicState?.city }}</p>
            <p><strong>Capacity: {{ clinicState?.capacity }}</strong></p>
            <p><strong>Phone: </strong>{{ clinicState?.phone }}</p>
            <p><strong>Zip Code: </strong>{{ clinicState?.zip_code }}</p>
            <p><strong>Latitude:</strong> {{ clinicState?.lat }}</p>
            <p><strong>Longitude:</strong> {{ clinicState?.long }}</p>
            <p><strong>Place ID: </strong>{{ clinicState?.place_id }}</p>
            <p><strong>Description:</strong> {{ clinicState?.summary }}</p>

            <div class="scheduleHeader">
                <h3>Schedule</h3>
                <div class="btn add" @click="scheduleModal?.openModal()">Edit Schedule</div>

            </div>
            <div class="schedule">
                <div class="day" v-for="(day, index) in days" :key="index">
                    <p><strong>{{ day }}: </strong></p>
                    <p v-html="getHours(schedule[day.toLowerCase() as keyof typeof schedule])"></p>
                </div>
            </div>

            <div class="servicesHeader">
                <h3>Services</h3>
                <div class="btn add" @click="serviceModal?.openModal()">Edit Services</div>
            </div>
            <div class="services">
                <p v-for="service in clinicState?.services" :key="service.id">{{ service.title }}</p>
            </div>
        </div>

    </div>
    <!-- <ClinicEdit @cancel="edit = false" v-if="edit" :clinic="clinicState"/> -->



</template>

<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;

        .servicesHeader,.scheduleHeader {
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