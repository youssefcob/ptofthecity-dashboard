<script setup lang="ts">
import Http from '@/mixins/Http';
import TrustedByHeader from './TrustedByHeader.vue';
import { onMounted, ref, type Ref } from 'vue';
import Btn from '@/components/sharedComponents/btn.vue';

type TrustedBy = {
    id: number,
    path: string,
    name: string
}
const trustedBies: Ref<TrustedBy[]> = ref([])

const loading= ref(false);

const getTrustedBies = async () => {
    const res = await Http.get('trustedBy');
    console.log(res)
    trustedBies.value = res.data;

}

const handleSubmission = (e:TrustedBy) => {
    trustedBies.value.push(e);

}

const deleteTrustedBy = async (id:number) => {
    loading.value = true;
    const res = await Http.delete(`trustedBy/${id}`, { Authorization: `Bearer ${localStorage.getItem('token')}` });
    loading.value = false;
    if (res.status == 200) {
        trustedBies.value = trustedBies.value.filter((t) => t.id !== id);
        return;
    }else {
        console.error(res);
        alert(res);
    }
}
onMounted(() => {
    getTrustedBies()
})
</script>

<template>
    <div class="trustedBy-container">
        <div class="header">
            <TrustedByHeader @submit="handleSubmission($event)" />
        </div>
        <div class="body">

            <div class="trustedBy-card" v-for="t in trustedBies">
                <div class="left">
                <p><strong>Name:</strong> {{ t.name }}</p>
                <p><strong>Image:</strong> <a :href="t.path">Click Here!</a></p>
            </div>
            <div class="right">
                <Btn :loading="loading" class="delete" @click="deleteTrustedBy(t.id)">Delete</Btn>
            </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.trustedBy-container {
    .body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        .trustedBy-card {
            padding: 1rem;
            background-color: $darkgrey;
            border-radius: 10px;
            display:flex;
            justify-content: space-between;


            p{
                font-size: 1.5rem;

                a{
                    color:blue;
                    text-decoration: underline;
                }
            }

            

        }
    }
}
</style>