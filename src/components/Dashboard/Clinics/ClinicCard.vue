<script setup lang="ts">
import type { Clinic, Schedule } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref, type Ref } from 'vue';
import ClinicEdit from './ClinicEdit.vue';


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
    if(!id) return;
    let res = await Http.delete(`clinic/delete/${id}`,{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // console.log(res);
    if (res.status === 401 ) window.location.href = '/login';
    if (res.status === 200) emit('clinicDeleted', id);
    toggleDeleteModal();
    // window.location.reload();
}
</script>

<template>
    <div v-if="!edit" class="card">
        <div class="info">
            <div class="header">
                <h2>{{ props.clinic?.name }}</h2>

                <div class="btns-wrapper">
                    <button >Edit</button>
                    <button v-if="!showDeleteModal" class="delete"
                        @click="toggleDeleteModal()">Delete</button>
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
        </div>

    </div>
    <!-- <ClinicEdit @cancel="edit = false" v-if="edit" :clinic="props.clinic"/> -->



</template>

<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;


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
            ;
        }

        .day {
            display: flex;
        }
    }

    .btns-wrapper {
        display: flex;
        margin-left: auto;
        // flex-direction: column;
        gap: 1rem;
        // align-items: flex-end;
        // justify-content: flex-end;

        button {
            padding: 1rem;
            background-color: $navy;

            &.delete {
                background-color: red;
            }

            &.cancel {
                background-color: $grey;
                color: black;
            }

            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }



}
</style>