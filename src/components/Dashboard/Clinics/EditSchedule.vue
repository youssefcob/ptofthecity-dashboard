<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import CheckBox from '@/components/sharedComponents/CheckBox.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Schedule } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { reactive, ref, type Ref } from 'vue';


const props = defineProps({
    schedule: {
        type: Object as () => Schedule,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

const loading= ref(false);

let days: Ref<string[]> = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

// const getHours = (hours: { start: string, end: string, off: boolean }) => {
//     if (hours.off) return `<span>Off</span>`;
//     return `<span>${hours.start}</span> - <span>${hours.end}</span>`;
// }

const getStart = (day: string) => {
    return props.schedule[day.toLowerCase() as keyof typeof props.schedule].start || '00:00:00';
}

const getEnd = (day: string) => {
    return props.schedule[day.toLowerCase() as keyof typeof props.schedule].end || '00:00:00';
}

const getOff = (day: string) => {
    return props.schedule[day.toLowerCase() as keyof typeof props.schedule].off;
}
const scheduleForm = reactive({
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
    },
    sunday: {
        start: '',
        end: '',
        off: false
    }
});
const emit = defineEmits(['clinicUpdated'])

const submitSchedule = async () => {
    console.log('schedule')
    console.log(props.id)
    try{
        let res = await Http.put(`clinic/schedule/${props.id}`, {schedule: scheduleForm}, {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        console.log(res.data)
        emit('clinicUpdated', res.data);
    } catch (error) {
        console.log(error)
    }
}
</script>


<template>

    <!-- <div class="scheduleHeader">
                <h3>Schedule</h3>

            </div>
            <div class="schedule">
                <div class="day" v-for="(day, index) in days" :key="index">
                    <p><strong>{{ day }}: </strong></p>
                    <p v-html="getHours(schedule[day.toLowerCase() as keyof typeof schedule])"></p>
                </div>
            </div> -->

    <div class="schedule-form">

        <div class="schedule">
            <h2 class="title">Edit Schedule</h2>
            <div class="day" v-for="day in days">
                <h3>{{ day }}</h3>
                <InputField mask="##:##:##" :value="getStart(day)" class="field" placeHolder="start"
                    @input="scheduleForm[day.toLowerCase() as keyof typeof scheduleForm].start = $event" />
                <InputField mask="##:##:##" :value="getEnd(day)" class="field" placeHolder="end"
                    @input="scheduleForm[day.toLowerCase() as keyof typeof scheduleForm].end = $event" />
                <CheckBox :checked="getOff(day)" label="Is Off?"
                    @change="scheduleForm[day.toLowerCase() as keyof typeof scheduleForm].off = $event" />
            </div>
        </div>

        <Btn class="btn" :loading="loading" @click="submitSchedule">Submit</Btn>

    </div>

</template>

<style scoped lang="scss">
.schedule-form {
    padding: 2rem;
    background-color: $darkgrey;

    .btn{
        padding:2rem;
        margin-top:2rem;
        width:30%;
        margin-left:auto
    }

    .day {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;

        h3 {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }


    }
}
</style>