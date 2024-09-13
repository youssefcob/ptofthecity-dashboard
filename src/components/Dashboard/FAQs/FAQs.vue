<script setup lang="ts">
import Http from '@/mixins/Http';
import { onMounted, ref, type Ref } from 'vue';
import FAQsHeader from './FAQsHeader.vue';
import FaqCard from './FaqCard.vue';
import type { FaqsCateogorized } from '@/interfaces/content';

const faqs:Ref<FaqsCateogorized> = ref({});
const faqsHeaders: Ref<string[]> = ref([]);
const getFaqs = async () => {
    let data = await Http.get('content/faqs');
    faqs.value = data.data;
    faqsHeaders.value = (Object.keys(data.data));
    // console.log(faqsHeaders.value);
    // console.log(faqs.value);

}
onMounted(() => {
    getFaqs();
})

const deleteFaq = (id: number) => {
    // console.log(id);
    for (let header of faqsHeaders.value) {
        // console.log(faqsHeaders.value);
        // console.log(header)
        // console.log(faqs.value[header]);
        faqs.value[header] = faqs.value[header].filter((faq: any) => faq.id !== id);
    }
}

const addFaq = (faq: any) => {
    // faqs.value[faq.category].push(faq);
    // console.log(faqs.value);
    if(faqsHeaders.value.includes(faq.category)) {
        faqs.value[faq.category].push(faq);
    } else {
        faqsHeaders.value.push(faq.category);
        faqs.value[faq.category] = [faq];
    }
    // console.log(faqs.value);
}

</script>

<template>
    <FAQsHeader @faqAdded="addFaq($event)" />
    <div class="faqs-container">
        <template v-for="(header, index) in faqsHeaders">
            <div class="wrapper">
                <h1 class="sectionHeader">
                    {{ header }}
                </h1>
                <div class="questionsContainer">
                    <FaqCard @faqDeleted="deleteFaq($event)" v-for="(faq, index) in faqs[header as keyof typeof faqs]" :faq="faq" :key="index" />
                </div>
            </div>
        </template>
    </div>






</template>

<style lang="scss" scoped>

.faqs-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;

    .questionsContainer{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}


</style>