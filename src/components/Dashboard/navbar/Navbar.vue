<script setup lang="ts">
import { onMounted, ref } from 'vue';

const activeButton = ref('');

const handleClick = (buttonName: string) => {
    activeButton.value = buttonName;
};

onMounted(() => {
    let windowLocation = window.location.pathname.split('/')[2] || '';
    console.log(windowLocation);
    if(windowLocation)handleClick(windowLocation);
});

const SuperAdmin = () => {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'super_admin';
}
</script>

<template>
    <nav>
        <div class="btns-wrapper">
            <router-link v-if="SuperAdmin()" to="/dashboard/admins" class="nav-btn" :class="{ active: activeButton === 'admins' }" @click="handleClick('admins')">
                Manage Admins
            </router-link>
            <router-link to="/dashboard" class="nav-btn" :class="{ active: activeButton === '' }" @click="handleClick('')">
                Dashboard
            </router-link>
            <router-link to="/dashboard/reservations" class="nav-btn" :class="{ active: activeButton === 'reservations' }" @click="handleClick('reservations')">
                Reservations
            </router-link>
            <router-link to="/dashboard/eligibility" class="nav-btn" :class="{ active: activeButton === 'eligibility' }" @click="handleClick('eligibility')">
                Eligibility
            </router-link>
            <router-link to="/dashboard/careers" class="nav-btn" :class="{ active: activeButton === 'careers' }" @click="handleClick('careers')">
                Careers
            </router-link>
            <router-link to="/dashboard/messages" class="nav-btn" :class="{ active: activeButton === 'messages' }" @click="handleClick('messages')">
                Messages
            </router-link>
            <router-link to="/dashboard/clinics" class="nav-btn" :class="{ active: activeButton === 'clinics' }" @click="handleClick('clinics')">
                Clinics
            </router-link>
            <router-link to="/dashboard/services" class="nav-btn" :class="{ active: activeButton === 'services' }" @click="handleClick('services')">
                Services
            </router-link>
            <router-link to="/dashboard/insurances" class="nav-btn" :class="{ active: activeButton === 'insurances' }" @click="handleClick('insurances')">
                Insurances
            </router-link>
            <router-link to="/dashboard/jobs" class="nav-btn" :class="{ active: activeButton === 'jobs' }" @click="handleClick('jobs')">
                Jobs
            </router-link>
            <router-link to="/dashboard/faqs" class="nav-btn" :class="{ active: activeButton === 'faqs' }" @click="handleClick('faqs')">
                FAQs
            </router-link>
            <button class="nav-btn" :class="{ active: activeButton === 'whoWeAre' }" @click="handleClick('whoWeAre')">
                Who We Are
            </button>
    

        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {

    .btns-wrapper {
        display: flex;
        flex-direction: column;
        height:100vh;
        width:15%;
        min-width: 15rem;
        border: 1px solid black;
        border-top:none;
        // border-radius: 10px;
        overflow: hidden;

        .nav-btn {
            background-color: transparent;
            padding: 1rem 1.5rem;
            border: none;
            //   border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: start;

            color:black;
            font-size: 1.3rem;
            font-family: $montserrat;

            &.active {
                background-color: $blue;
            }

            &:hover:not(.active) {
                background-color: $darkgrey;
            }
        }
    }
}
</style>