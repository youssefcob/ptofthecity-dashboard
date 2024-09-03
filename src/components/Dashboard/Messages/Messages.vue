<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import MessagesHeader from './MessagesHeader.vue';
import MessageCard from './MessageCard.vue';
import type { Message } from '@/interfaces/content';
import Http from '@/mixins/Http';

const MessagesList: Ref<Message[]> = ref([]);

const currentPage: Ref<number> = ref(1);

const lastPage: Ref<number> = ref(0);


const getMessages = async (status: string = 'true') => {
    const res = await Http.get(`admin/message/${status}?page=${currentPage.value}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(res);

    MessagesList.value = res.data.data;
    // currentPage.value = res.data.current_page;
    lastPage.value = res.data.last_page;

    if (res.status === 401) {
        window.location.href = '/login';
        return;
    }
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        return res.data;
        // window.location.reload();
    } else {
        alert(res.data.error);
    }

}

const paginate = (page: number) => {
    if(currentPage.value == 1 && page < 0) return;
    if(currentPage.value == lastPage.value && page > 0) return;
    currentPage.value =  currentPage.value + page;
 
    debouncedGetMessages();    // getMessages();
}

const changeMessages = (status: string) => {
    getMessages(status);
    currentPage.value = 1;

}

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
const debouncedGetMessages = debounce(getMessages, 300);

onMounted(() => {
    getMessages();
    
});




</script>

<template>
    <MessagesHeader :page="currentPage" @paginate="paginate($event)" @statusChanged="changeMessages($event)" />

    <div class="reservations-container">
        <!-- <div class="reservation" v-for="reservation in reservationsList">
            {{ reservation.id }}
        </div> -->
        <MessageCard class="reservation" v-for="message in MessagesList" :message="message"
             />
    </div>

</template>
<style scoped lang="scss">
.reservations-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .reservation-city-wrapper {
        padding: 2rem;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    h2 {
        color: $navy;
    }

    .reservation {
        background-color: $darkgrey;
        width: 100%;
        padding: 2rem;
        border-radius: 10px;

    }
}
</style>