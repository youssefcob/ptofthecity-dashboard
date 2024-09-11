<script setup lang="ts">
import DropDownInputField from '@/components/sharedComponents/DropDownInputField.vue';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
});
const activeButton = ref(false);

const jobs = ref([]);
const jobNames:Ref<string[]> = ref([]);
const emit = defineEmits(['statusChanged', 'paginate','jobChanged']);

const handleClick = (buttonName: boolean) => {
    activeButton.value = buttonName;

    emit('statusChanged', buttonName);
};

const page = (direction: number) => {
    emit('paginate', direction);
}

const getJobs = async () => {
    const res = await Http.get('career/jobs');
    jobs.value = res.data;
    jobNames.value = res.data.map((job: any) => job.title);
    jobNames.value.push('All');
}
const handleInput = (input: string) => {
    emit('jobChanged', input);
}
onMounted(() => {
getJobs();
});

</script>


<template>


    <div class="header">
        <h1>Careers</h1>

        <div class="pagination-wrapper">
            <button @click="page(-1)" class="btn ">Prev Page</button>
            <div><span>{{ $props.page }}</span></div>
            <button @click="page(1)" class="btn ">Next Page</button>
        </div>
        <DropDownInputField :list="jobNames" :default="'All'" @input="handleInput($event)" />
        <div class="btn-search-wrapper">
            <button class="btn" :class="{ active: activeButton === false }" @click="handleClick(false)">Not
                Read</button>
            <button class="btn" :class="{ active: activeButton === true }" @click="handleClick(true)">Read</button>

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

    .pagination-wrapper {
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


        input {
            padding: 1rem;
            border-radius: 10px;
            border: none;
            width: 20rem;
        }
    }
}
</style>