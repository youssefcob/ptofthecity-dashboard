<script setup lang="ts">
import { onMounted, ref } from 'vue';

const activeButton = ref('');

const handleClick = (buttonName: string) => {
    activeButton.value = buttonName;
};

onMounted(() => {
    let windowLocation = window.location.pathname.split('/').pop();
    if(windowLocation)handleClick(windowLocation);
});
</script>

<template>
    <nav>
        <div class="btns-wrapper">
            <button class="nav-btn" :class="{ active: activeButton === '' }" @click="handleClick('')">
                Dashboard
            </button>
            <router-link to="/dashboard/reservations" class="nav-btn" :class="{ active: activeButton === 'reservations' }" @click="handleClick('reservations')">
                Reservations
            </router-link>
            <button class="nav-btn" :class="{ active: activeButton === 'eligibility' }" @click="handleClick('eligibility')">
                Eligibility
            </button>
            <button class="nav-btn" :class="{ active: activeButton === 'careers' }" @click="handleClick('careers')">
                Careers
            </button>
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