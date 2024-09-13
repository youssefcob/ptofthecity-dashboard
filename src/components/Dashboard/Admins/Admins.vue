<script setup lang="ts">
import Http from '@/mixins/Http';
import AdminsHeader from './AdminsHeader.vue';
import AdminCard from './AdminCard.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { User } from '@/interfaces/content';

const admins: Ref<User[]> = ref([]);
const searchedAdmins: Ref<User[]> = ref([]);

const getAdmins = async () => {
    let data = await Http.get('admin', { Authorization: `Bearer ${localStorage.getItem('token')}` });
    admins.value = data.data;
    searchedAdmins.value = data.data;
}

const search = (searchTerm: string) => {
    searchedAdmins.value = admins.value.filter((admin: User) => {
        const fullName = `${admin.first_name} ${admin.last_name}`.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return fullName.startsWith(searchTermLower);
    });
}

onMounted(() => {
    getAdmins();
})
</script>

<template>
    <div class="admins-container">
        <div class="adminsHeader">
            <AdminsHeader @search="search($event)"/>
        </div>
        <!-- {{ admin_cities }} -->

        <div class="admin-city-wrapper">
            <div class="admin" v-for="admin in searchedAdmins">
                <AdminCard :key="admin.id" :admin="admin" />

            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.admins-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .admin-city-wrapper {
    padding: 2rem;
    padding-top:1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h2{
        color:$navy;
    }

    .admin {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>