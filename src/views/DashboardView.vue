<script setup lang="ts">
import DashboardPage from '@/components/Dashboard/DashboardPage.vue';
import Navbar from '@/components/Dashboard/navbar/Navbar.vue';

</script>

<template>
    <main>
        <Navbar />
        <DashboardPage />
        
    </main>


</template>

<style scoped lang="scss">
main {
    background-color: $grey;
    display:flex;
}
</style>