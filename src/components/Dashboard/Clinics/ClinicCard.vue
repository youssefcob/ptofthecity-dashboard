<script setup lang="ts">
import type { Clinic, Schedule, Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive, ref, type Ref } from 'vue';
import ClinicEdit from './ClinicEdit.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import AddServiceToClinic from './AddServiceToClinic.vue';
import EditSchedule from './EditSchedule.vue';
import EditClinic from './EditClinic.vue';
import UpdateImageModal from './UpdateImageModal.vue';
import AddMoment from './AddMoment.vue';
import Btn from '@/components/sharedComponents/btn.vue';


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

const loading = reactive({
    deleteClinic: false,
    deleteMoment: false
});

const edit = ref(false);
const emit = defineEmits(['clinicDeleted']);
const deleteClinic = async (id: number | undefined) => {
    // console.log(id);
    if (!id) return;
    loading.deleteClinic = true;
    let res = await Http.delete(`clinic/delete/${id}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.deleteClinic= false;
    // console.log(res);
    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) emit('clinicDeleted', id);
    toggleDeleteModal();
    // window.location.reload();
}

const serviceModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const scheduleModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const editClinicModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const updateImageModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const addMomentToClinicModal: Ref<InstanceType<typeof Modal> | null> = ref(null);
const AddService = (service: Service) => {
    clinicState?.services.push(service);
}

const removeService = (service_id: number) => {
    if (clinicState?.services)
        clinicState.services = clinicState?.services.filter(s => {
            if (s.id) parseInt(s.id) !== service_id
        });
}

const updateClinic = (clinic: Clinic) => {

    clinicState = clinic;
    schedule.value = clinic.schedule;
    scheduleModal.value?.closeModal();
    editClinicModal.value?.closeModal();
    updateImageModal.value?.closeModal();
    addMomentToClinicModal.value?.closeModal();

}

const deleteMoment = async (id: number) => {
    try {
        loading.deleteMoment = true;
        let res = await Http.delete(`clinic/media/${id}`, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        loading.deleteMoment = false;
        console.log(res);
        if (res.status === 200) {
            console.log(res.data);
        clinicState.media = clinicState.media.filter(media => media.id !== id);
        } else {
            console.log(res);

            alert(res);
        }

    } catch (error) {
        loading.deleteMoment = false;
        console.log(error)
    }
    // console.log(form)

}


</script>

<template>
    <Modal ref="serviceModal">
        <AddServiceToClinic @deleteService="removeService($event)" @input="AddService($event)" :id="clinicState?.id"
            :services="clinicState?.services" />
    </Modal>

    <Modal ref="updateImageModal">
        <UpdateImageModal @newClinic="updateClinic($event)" :id="clinicState?.id" />
    </Modal>

    <Modal ref="scheduleModal">
        <EditSchedule :id="clinicState.id" :schedule="schedule" @clinicUpdated="updateClinic($event)" />
    </Modal>

    <Modal ref="editClinicModal">
        <EditClinic :id="clinicState.id" :clinic="clinicState" @close="editClinicModal?.closeModal()"
            @clinicUpdated="updateClinic($event)" />
    </Modal>

    <Modal ref="addMomentToClinicModal">
        <AddMoment :id="clinicState.id" :clinic="clinicState" @close="editClinicModal?.closeModal()"
            @clinicUpdated="updateClinic($event)" />
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
                            <Btn class="delete" :loading="loading.deleteClinic" @click="deleteClinic(clinicState?.id)">Yes</Btn>
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
                <h3>Image: <span><a v-if="clinicState?.image" :href="clinicState?.image">Click Here!</a> </span></h3>
                <div class="btn add" @click="updateImageModal?.openModal()">Edit Image</div>
            </div>
            <br>
            <div class="scheduleHeader">
                <h3>Moments: </h3>
                <div class="btn add" @click="addMomentToClinicModal?.openModal()">Add Moment</div>
            </div>
            <div class="moments">
                <ul>
                    <li v-for="(moment, index) in clinicState?.media" :key="moment.id"><a :href="moment.path">Moment
                            {{ index }}</a>
                        <Btn class="delete" :loading="loading.deleteMoment" @click="deleteMoment(moment.id)">delete</Btn>
                    </li>
                </ul>
                <!-- {{ clinicState?.media }} -->
            </div>
            <br>
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

    .moments {
        ul {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;

            li {
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;

                a {
                    text-decoration: underline;
                    color: black;
                }

                .btn {
                    padding: 0.3rem;
                }
            }
        }
    }

    .info {
        width: 100%;

        .servicesHeader,
        .scheduleHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;

            a:hover {
                color: blue;
                cursor: pointer;
            }



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