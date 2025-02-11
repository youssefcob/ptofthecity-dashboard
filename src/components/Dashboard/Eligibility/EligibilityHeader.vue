<script setup lang="ts">
import DropDownInputField from '@/components/sharedComponents/DropDownInputField.vue';
import type { Clinic, Schedule, Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, reactive, ref, type Ref } from 'vue';
import Insurances from '../Insurances/Insurances.vue';
import Btn from '@/components/sharedComponents/btn.vue';

const props = defineProps({
    page: {
        type: Number,
        required: true
    },
    lastPage: {
        type: Number,
        required: true
    },
    downloading: {
        type: Boolean,
        required: true
    }
});
const currentPage: Ref<number> = ref(props.page);
const status: Ref<string> = ref('all');
const insurance: Ref<string | null> = ref(null);
const startDate: Ref<string> = ref('');
const endDate: Ref<string> = ref(`${new Date().toISOString().split('T')[0]}`);
const query: Ref<string> = ref('');
const activeButton = ref('all');

const emit = defineEmits(['statusChanged', 'paginate', 'exportCsv']);


const page = (direction: number) => {
    // emit('paginate', direction);
    if (currentPage.value == 1 && direction < 0) return;
    if (currentPage.value == props.lastPage && direction > 0) return;
    currentPage.value = currentPage.value + direction;
        emit('statusChanged', constructQuery());


}

const changeStatus = (buttonName: string) => {
    activeButton.value = buttonName;

    status.value = buttonName;
    currentPage.value = 1;
        emit('statusChanged', constructQuery());

    // emit('statusChanged', buttonName);
};


const insurances:Ref<string[]> = ref([]);

const changeInsurance = (event: string) => {
    if (event === 'All') {
        insurance.value = null;
        return;
    }
    if (insurances.value.includes(event)) {
        insurance.value = event;
        currentPage.value = 1;
            emit('statusChanged', constructQuery());

    }

}

const setStartDate = (event: Event) => {
    startDate.value = (event.target as HTMLInputElement).value;
    // console.log(startDate.value);
    currentPage.value = 1;
        emit('statusChanged', constructQuery());

}
const setEndDate = (event: Event) => {
    endDate.value = (event.target as HTMLInputElement).value;
    // console.log(endDate.value);
    currentPage.value = 1;
        emit('statusChanged', constructQuery());

}
const exportCsv = () => {
    emit('exportCsv', constructQuery());
}

const constructQuery = () => {
    let q: string[] = [];
    if (currentPage) {
        q.push(`page=${currentPage.value}`);
    }
    if (status.value) {
        q.push(`status=${status.value}`);
    }
    if (insurance.value) {
        q.push(`insurance=${insurance.value}`);
    }

    if (startDate.value) {
        q.push(`start_date=${startDate.value}`);
    }
    if (endDate.value) {
        q.push(`end_date=${endDate.value}`);
    }
    query.value = q.join('&');
    console.log(query.value);

    emit('statusChanged', query.value);
}






// Getting the clinics and their names

const getInsurances = async () => {
    let data = await Http.get('images/insurance');
    data = data.data;
    let i = data.reduce((acc: any, curr: any) => {
        acc.push(curr.title);
        return acc;
    }, []);
    insurances.value = i;
}



onMounted(async () => {
    await getInsurances();
});

</script>


<template>


    <div class="header">
        <h1>Eligibility</h1>
        <Btn :loading="downloading" class="btn export" @click="exportCsv()">+ Export</Btn :loading="downloading">

        <div class="pagination-wrapper">
            <button @click="page(-1)" class="btn "><</button>
            <div><span>{{ props.page }}</span></div>
            <button @click="page(1)" class="btn ">></button>
        </div>
        <div class="clinic-wrapper">
            <DropDownInputField :list="insurances" placeHolder="Insurances" @input="changeInsurance($event)" />
        </div>
        <div class="btn-search-wrapper">

            <select v-model="activeButton" @change="changeStatus(activeButton)">
                <option class="btn" :class="{ active: activeButton === 'all' }" value="all">All</option>

                <option class="btn" :class="{ active: activeButton === 'pending' }" value="pending">Pending</option>
                <option class="btn" :class="{ active: activeButton === 'confirmed' }" value="confirmed">Confirmed
                </option>
                <option class="btn" :class="{ active: activeButton === 'cancelled' }" value="cancelled">Cancelled
                </option>
            </select>
        </div>
        <div class="date-wrapper">
            <div class="date">
                <label for="start">Start date:</label>
                <input type="date" name="start" @change="setStartDate($event)" />
            </div>
            <div class="date">
                <label for="end">End date:</label>
                <input type="date" name="end" @change="setEndDate($event)"
                    :value="new Date().toISOString().split('T')[0]" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.header {
    padding: 1rem;
    // height:30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;

    align-items: center;

    .pagination-wrapper {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .clinic-wrapper {
        width: 10rem;
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .btn-search-wrapper {
        display: flex;
        gap: 2rem;
        align-items: center;

        .btn {
            transition: all 0.3s ease-in-out;

        }

        .btn.active {
            background-color: rgb(5, 178, 5);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

        }

        select {
            @extend .btn;
            background-color: $green;

            option {
                &:hover {
                    opacity: 0.7;
                }
            }
        }


        input {
            padding: 1rem;
            border-radius: 10px;
            border: none;
            width: 20rem;
        }
    }

    .date-wrapper {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .date {
            display: flex;
            gap: 1rem;
            align-items: center;

            input {
                padding: 1rem;
                border-radius: 10px;
                border: none;
                background-color: $navy;
                color: white;
                // width: 20rem;
            }
        }
    }
}
</style>