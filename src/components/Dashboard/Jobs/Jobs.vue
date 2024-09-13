<script setup lang="ts">
import Http from '@/mixins/Http';
import JobsHeader from './JobsHeader.vue';
import JobCard from './JobCard.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { Job } from '@/interfaces/content';


const jobs:Ref<Job[]> = ref([]);
const getJobs = async () => {
    const res = await Http.get('career/jobs');
    jobs.value = res.data;
    // console.log(res.data);
}

onMounted(() => {
    getJobs();
})
</script>

<template>
<JobsHeader/>
<div class="jobs-container">
    <JobCard v-for="job in jobs" :key="job.id" :job="job"/>
</div>

</template>

<style scoped lang="scss">
.jobs-container{
    display: flex;
    flex-direction: column;
    padding:2rem;
    gap: 1rem;
}

</style>