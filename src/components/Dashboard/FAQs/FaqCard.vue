<script setup lang="ts">
import type { FAQ } from '@/interfaces/content';
import Http from '@/mixins/Http';


// const props = defineProps({
//     faq: Object
// })


const props = defineProps({
    faq: {
        type: Object as () => FAQ,
        required: true

    },
});
const emit = defineEmits(['faqDeleted']);
const deleteFaq = async () => {
    const res = await Http.delete(`content/faqs/${props.faq.id}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    );

    if(res.status === 401) window.location.href = '/login';
    if(res.status === 200) emit('faqDeleted', props.faq.id);
    // console.log(res);
}
</script>


<template>

    <div class="faq-card">
        <div class="info">
            <p><strong>Question: </strong>{{ props.faq.question }}</p>
            <p><strong>Answer: </strong>{{ props.faq.answer }}</p>
            <p><strong>Is On Main Page: </strong>{{ (props.faq.is_main) ? 'Yes' : 'No' }}</p>
            <p><strong>Category: </strong>{{ props.faq.category }}</p>
        </div>
        <div class="btn-wrapper"><button class="btn delete" @click="deleteFaq">Delete</button></div>

    </div>
</template>

<style scoped lang="scss">
.faq-card {
    padding: 1.5rem;
    background-color: $darkgrey;
    border-radius: 10px;
    display: flex;
    // flex-direction: row-reverse;
    justify-content: space-between;
    .btn-wrapper {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }
}
</style>