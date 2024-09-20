<script setup lang="ts">
import ContentHeader from './ContentHeader.vue';
import LandingPageCarousel from './ContentSections/LandingPageCarousel.vue';


</script>
<template>
    <div class="content">
        <ContentHeader />
        <div class="content-wrapper">

            <div class="section">
                <LandingPageCarousel />
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">

.content-wrapper {
    padding: 2.5rem;
    .landing-carousel {
        .carousel {
            display: flex;
            gap: 1rem;
            .carousel-item {
                img {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>