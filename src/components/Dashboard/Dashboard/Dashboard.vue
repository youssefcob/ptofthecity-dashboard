<script setup lang="ts">
import type { Count } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';

const count: Ref<Count[]> = ref([]);
const getCount = async () => {
    const res = await Http.get('count', {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    count.value = res.data;
    console.log(res.data);
}

const getCountByTitle = (title: string) => {
    return count.value.find((c: Count) => c.title === title)?.count || 0;
}
onMounted(() => {
    getCount();
})
</script>


<template>
    <div class="container">
        <div class="grid-item">
            <div class="box">
                <h2>Reservations</h2>
                <div class="count-wrapper">
                    <div class="count">
                        <span> {{ getCountByTitle('reservations_pending') }} </span>
                        <h3>Pending</h3>

                    </div>
                    <div class="count">
                        <span> {{ getCountByTitle('reservations_confirmed') }} </span>
                        <h3>Confirmed</h3>

                    </div>
                    <div class="count">
                        <span> {{ getCountByTitle('reservations_cancelled') }} </span>
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
                        <span> {{ getCountByTitle('insurance_pending') }} </span>
                        <h3>Pending</h3>

                    </div>
                    <div class="count">
                        <span> {{ getCountByTitle('insurance_accepted') }} </span>
                        <h3>Accepted</h3>

                    </div>
                    <div class="count">
                        <span> {{ getCountByTitle('insurance_cancelled') }} </span>
                        <h3>Cancelled</h3>

                    </div>
                </div>
            </div>
            <div class="grid-item">
                <div class="box">
                    <h2>Careers</h2>
                    <div class="count-wrapper">
                        <div class="count">
                            <span> {{ getCountByTitle('career_applications_0') }} </span>
                            <h3>Not Viewed</h3>

                        </div>
                        <div class="count">
                            <span> {{ getCountByTitle('career_applications_1') }} </span>
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
                            <span> {{ getCountByTitle('messages_0') }} </span>
                            <h3>Not Viewed</h3>

                        </div>
                        <div class="count">
                            <span> {{ getCountByTitle('messages_1') }} </span>
                            <h3>Viewed</h3>

                        </div>



                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 3rem;
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
            padding: 1rem;
            background-color: $blue;
            padding: 3rem;
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