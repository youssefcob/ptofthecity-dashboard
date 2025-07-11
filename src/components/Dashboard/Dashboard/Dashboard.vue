<script setup lang="ts">
import Modal from '@/components/sharedComponents/Modal.vue';
import type { Count } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import AddImg from './AddImg.vue';

const count: Ref<Count> = ref({
    reservations: {
        pending: 0,
        confirmed: 0,
        cancelled: 0
    },
    eligibility: {
        pending: 0,
        accepted: 0,
        cancelled: 0
    },
    careers: {
        unread: 0,
        read: 0
    },
    messages: {
        unread: 0, // Not Viewed
        read: 0 // Viewed
    }
});
const getCount = async () => {
    const res = await Http.get('count', {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    count.value = res.data;
    console.log(res.data);
}

// const getCountByTitle = (title: string) => {
//     return count.value.find((c: Count) => c.title === title)?.count || 0;
// }
const addImgModal = ref<InstanceType<typeof Modal> | null>(null);

onMounted(() => {
    getCount();
})
</script>


<template>
    <Modal ref="addImgModal"><AddImg/></Modal>
    <div class="nav"><div class="btn add" @click="addImgModal?.openModal">Add Image</div></div>
    <div class="grid-container">
        <div class="grid-item">
            <div class="box">
                <h2>Reservations</h2>
                <div class="count-wrapper">
                    <div class="count">
                        <span> {{ count.reservations.pending }} </span>
                        <h3>Pending</h3>

                    </div>
                    <div class="count">
                        <span> {{ count.reservations.confirmed }} </span>
                        <h3>Confirmed</h3>

                    </div>
                    <div class="count">
                        <span> {{ count.reservations.cancelled }} </span>
                        <h3>Cancelled</h3>

                    </div>


                </div>
            </div>
            
        </div>
        <div class="grid-item">
            <div class="box">
                <h2>Eligibility</h2>
                <div class="count-wrapper">
                    <div class="count">
                        <span> {{ count.eligibility.pending }} </span>
                        <h3>Pending</h3>

                    </div>
                    <div class="count">
                        <span> {{ count.eligibility.accepted }} </span>
                        <h3>Accepted</h3>

                    </div>
                    <div class="count">
                        <span> {{ count.eligibility.cancelled }} </span>
                        <h3>Cancelled</h3>

                    </div>
                </div>
            </div>
        </div>
        <div class="grid-item">
            <div class="box">
                <h2>Careers</h2>
                <div class="count-wrapper">
                    <div class="count">
                        <span> {{ count.careers.unread }} </span>
                        <h3>Not Viewed</h3>

                    </div>
                    <div class="count">
                        <span> {{ count.careers.read }} </span>
                        <h3>Viewed</h3>

                    </div>



                </div>
            </div>
        </div>
        <div class="grid-item">
            <div class="box">
                <h2>Messages</h2>
                <div class="count-wrapper">
                    <div class="count">
                        <span> {{ count.messages.unread }} </span>
                        <h3>Not Viewed</h3>

                    </div>
                    <div class="count">
                        <span> {{ count.messages.read }} </span>
                        <h3>Viewed</h3>

                    </div>



                </div>

            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.nav{
    display: flex;
    justify-content: flex-start;
    padding: 0.5rem;
    gap: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
}
.grid-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 1rem;
    // overflow: hidden;

    h2 {
        color: $navy;
    }

    .count-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        .count {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            gap: 1rem;
            background-color: $blue;
            // padding: 3rem;
            flex-grow: 1;
            aspect-ratio: 1 / 0.5;

            span,
            h3 {
                font-size: 2rem;
                font-weight: bold;
            }
        }
    }
}
</style>