<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

const activeButton = ref('landingPage');

const handleClick = (button: string) => {
    activeButton.value = button;
}

onMounted(() => {
    let windowLocation = window.location.pathname.split('/')[3] || '';
    if(windowLocation)handleClick(windowLocation);
});

</script>

<template>
  

    <div class="header">

        <h1>Content</h1>

        <div class="btns-wrapper">

            <router-link to="/dashboard/content/staff" class="btn nav-btn" :class="{ active: activeButton === 'staff' }" @click="handleClick('staff')">
                Staff
            </router-link>

            <router-link to="/dashboard/content/landingPage" class="btn nav-btn" :class="{ active: activeButton === 'landingPage' }" @click="handleClick('landingPage')">
                landing Page
            </router-link>

            <router-link to="/dashboard/content/trusted" class="btn nav-btn" :class="{ active: activeButton === 'trusted' }" @click="handleClick('trusted')">
                Trusted By
            </router-link>

        </div>
    </div>

</template>

<style scoped lang="scss">

.header {
    padding:1rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display:flex;
    justify-content:space-between;

    .btns-wrapper {
        display:flex;
        gap:1rem;
        
        .nav-btn.active{
            background-color: $green;
        }
    }

}

</style>