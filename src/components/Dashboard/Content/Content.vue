<script setup lang="ts">

import ContentHeader from './ContentHeader.vue';

</script>
<template>
    <div class="content">
        <ContentHeader />

        <div class="content-wrapper">

            <router-view></router-view>

        </div>
        
    </div>
</template>

<style scoped lang="scss">

.content-wrapper {
    padding: 0.75rem;
    display: grid;
    gap:3rem;
   
}
</style>