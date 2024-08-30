<script setup lang="ts">
import type { Clinic, Schedule } from '@/interfaces/content';
import { onMounted, reactive, ref, type Ref } from 'vue';

const props = defineProps({
    clinic: {
        type: Object as () => Clinic,
    },
});

const emit = defineEmits(['cancel']);

let schedule: Ref<Schedule | []> = ref(props.clinic?.schedule || []);
let days: Ref<string[]> = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);


const getStartingHours = (hours: string | { start: string, end: string }) => {
    if (typeof hours === 'string') return hours;
    return hours.start;
}
const getEndingHours = (hours: string | { start: string, end: string }) => {
    if (typeof hours === 'string') return hours;
    return hours.end;
}

const isOff = (hours: string | { start: string, end: string }) => {
    if (typeof hours === 'string') return true;
}
const cancelEdit = () => {
    emit('cancel');
}

const formSchedule = reactive({
    sunday: {
        start: 'smth',
        end: '',
        off: false
    },
    monday: {
        start: '',
        end: '',
        off: false
    },
    tuesday: {
        start: '',
        end: '',
        off: false
    },
    wednesday: {
        start: '',
        end: '',
        off: false
    },
    thursday: {
        start: '',
        end: '',
        off: false
    },
    friday: {
        start: '',
        end: '',
        off: false
    },
    saturday: {
        start: '',
        end: '',
        off: false
    }
});

onMounted(() => {
assignFormSchedule();

});

const assignFormSchedule = () => {
    for (let day in days) {
        if(isOff(schedule.value[day.toLowerCase() as keyof typeof schedule.value])){
            formSchedule[day.toLowerCase() as keyof typeof formSchedule].start = '';
            formSchedule[day.toLowerCase() as keyof typeof formSchedule].end = '';
            formSchedule[day.toLowerCase() as keyof typeof formSchedule].off = true;
        } else {
            formSchedule[day.toLowerCase() as keyof typeof formSchedule].start = getStartingHours(schedule.value[day.toLowerCase() as keyof typeof schedule.value]);
            formSchedule[day.toLowerCase() as keyof typeof formSchedule].end = getEndingHours(schedule.value[day.toLowerCase() as keyof typeof schedule.value]);
            formSchedule[day.toLowerCase() as keyof typeof formSchedule].off = false;
        }

    }
}

const form = reactive({
    name: props.clinic?.name,
    street_address: props.clinic?.street_address,
    state: props.clinic?.state,
    city: props.clinic?.city,
    phone: props.clinic?.phone,
    zip_code: props.clinic?.zip_code,
    lat: props.clinic?.lat,
    long: props.clinic?.long,
    place_id: props.clinic?.place_id,
    summary: props.clinic?.summary,
    // schedule: props.clinic?.schedule
})
</script>

<template>

    <div class="edit-wrapper">
        <table>
            <tr>
                <th>
                </th>
                <th class="buttons-wrapper"><button>confirm</button>
                     <button class="cancel" @click="cancelEdit()">cancel</button></th>
            </tr>
            <tr>
                <th>
                    <h2>Name:</h2>
                </th>
                <th><input class="name" type="text" v-model="form.name" ></th>
            </tr>
            <tr>
                <th><strong>Street Adress: </strong></th>
                <th><input type="text" v-model="form.street_address"></th>
            </tr>
            <tr>
                <th><strong>State: </strong></th>
                <th><input type="text" v-model="form.state"></th>
            </tr>
            <tr>
                <th><strong>City: </strong></th>
                <th><input type="text" v-model="form.city"></th>
            </tr>
            <tr>
                <th><strong>Phone: </strong></th>
                <th><input type="text" v-model="form.phone"></th>
            </tr>
            <tr>
                <th><strong>Zip Code: </strong></th>
                <th><input type="text" v-model="form.zip_code"></th>
            </tr>
            <tr>
                <th><strong>Latitude: </strong></th>
                <th><input type="text" v-model="form.lat"></th>
            </tr>
            <tr>
                <th><strong>Longitude: </strong></th>
                <th><input type="text" v-model="form.long"></th>
            </tr>
            <tr>
                <th><strong>Place ID: </strong></th>
                <th><input type="text" v-model="form.place_id"></th>
            </tr>
            <tr>
                <th><strong>Description: </strong></th>
                <th><textarea type="text" v-model="form.summary"></textarea></th>
            </tr>

        </table>

        <h3>Schedule</h3>
        <table class="schedule">
            <tr class="day" v-for="(day, index) in days" :key="index">
                <th><strong>{{ day }}: </strong></th>
                <th><input type="text" v-model="formSchedule[day.toLowerCase() as keyof typeof formSchedule].start"></th>
                <th><input type="text" :value="getEndingHours(schedule[day.toLowerCase() as keyof typeof schedule])"></th>
                <th class="checkbox"> <span>Is Day Off?: </span> <input type="checkbox" :checked="isOff(schedule[day.toLowerCase() as keyof typeof schedule])"></th>
            </tr>
        </table>

    </div>
</template>

<style scoped lang="scss">
.edit-wrapper {
    .buttons-wrapper {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
}
button {
            padding: 1rem;
            background-color: $navy;

         

            &.cancel {
                background-color: $grey;
                color: black;
            }

            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
table {
    width: 100%;

    th {
        text-align: left;
    }

    tr {
        line-height: 4rem;
    }

    input:not([type="checkbox"]),
    textarea {
        padding: 1rem;
        width: 100%;
    }

    textarea {
        height: 20rem;
        resize: none;
    }

    &.schedule{
  
        th{
            padding:0.1rem;
            &.checkbox{
                display:flex;
                align-items:center;
            }
        }
    }
}
</style>