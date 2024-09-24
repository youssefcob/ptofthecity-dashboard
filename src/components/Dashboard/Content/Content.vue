<script setup lang="ts">
import Http from '@/mixins/Http';
import ContentHeader from './ContentHeader.vue';
import LandingPageCarousel from './ContentSections/LandingPageCarousel.vue';
import WhoWeAre from './ContentSections/WhoWeAre.vue';
import { onMounted, reactive, ref, type Ref } from "vue";

type Content = {
    title: string,
    body: any
}

let content:Ref<Content[]> = ref([{title:'aua',body:'auo'}]);


const getContent = async () => {
    let data = await Http.get('content')
    console.log(data.data)
    content.value = data.data;
}
let carousel:Ref<any> = ref([]);
let whoWeAre:Ref<any> = ref([]);
const filterContent = (title:string):any => {
    const result = content.value.filter((item: any) => item.title === title)[0];
    console.log(result);
    return result.body;
    // console.log(carousel.value);
}
onMounted(async() => {
    await getContent();
    carousel.value = filterContent("Carousel");
    console.log(carousel.value);
    whoWeAre.value = filterContent("Who We Are");
    console.log(whoWeAre.value);

})
</script>
<template>
    <div class="content">
        <ContentHeader />
        <div class="content-wrapper">

            <div class="section">
                <LandingPageCarousel  :content="carousel" />
            </div>
            <div class="section">
                <WhoWeAre :content="whoWeAre"/>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">

.content-wrapper {
    padding: 2.5rem;
    display: grid;
    gap:3rem;
   
}
</style>