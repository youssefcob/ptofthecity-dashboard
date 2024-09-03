<script setup lang="ts">
import type { Message } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref } from 'vue';


const props = defineProps({
    message: {
        type: Object as () => Message,
    },
});

const activeButton = ref(props.message?.status);

const changeMessageStatus = async (st: "read" | "unread") => {
    activeButton.value = st;
    let booleanSt = st === 'read' ? 'true' : 'false';

    const res = await Http.put(`admin/message/${props.message?.id}/${booleanSt}`, {
        status: st
    }, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    console.log(res);
    if (res.status === 401) window.location.href = '/login';
    // if (res.status === 200) { emit('newClinic', res.data); 
    if (res.status === 200) {
        return res.data;
        // window.location.reload();
    } else {
        alert(res.data.error);
    }

};
</script>


<template>
    <div class="card">
        <div class="info">
            <div class="header">
                <h2>{{props.message?.subject}}</h2>

                <div class="btns-wrapper">
                    <button :class="{ active: activeButton === 'read' }" class="btn" @click="changeMessageStatus('read')">Read</button>
                    <button :class="{ active: activeButton === 'unread' }" class="btn" @click="changeMessageStatus('unread')">UnRead</button>

                </div>
            </div>
            <h3>Personal Info:</h3>

            <p><strong>Name: </strong>{{ props.message?.name }} </p>
            <p><strong>Phone: </strong>{{ props.message?.phone }}</p>
            <p><strong>Email: </strong>{{ props.message?.email }}</p>

            <h3>Message Info:</h3>

            <p><strong>Subject: </strong> {{ props.message?.subject }}</p>
            <p><strong>Message: </strong> {{ props.message?.message }}</p>

            
        </div>
    </div>

</template>

<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;


        .header {
            display: flex;

            .delete-container {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-left: auto;

                div {
                    display: flex;
                    gap: 1rem;
                }
            }
        }

        h3 {
            font-weight: bold;
            font-size: 1.9rem;
            margin: 1rem 0 0.3rem 0;
            ;
        }

        .day {
            display: flex;
        }
    }

    .btns-wrapper {
        display: flex;
        margin-left: auto;
        // flex-direction: column;
        gap: 1rem;
        // align-items: flex-end;
        // justify-content: flex-end;

        button {
            padding: 1rem;
            background-color: $navy;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            &.delete {
                background-color: red;
            }&.active{
                background-color: $green;
            }

        }
    }



}
</style>