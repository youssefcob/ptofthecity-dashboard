<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
});
const activeButton = ref('pending');

const emit = defineEmits(['statusChanged', 'paginate']);

const handleClick = (buttonName: string) => {
    activeButton.value = buttonName;

    emit('statusChanged', buttonName);
};

const page = (direction: number) => {
    emit('paginate', direction);
}

</script>


<template>


    <div class="header">
        <h1>Reservations</h1>

        <div class="pagination-wrapper">
            <button @click="page(-1)" class="btn ">Prev Page</button>
            <div><span>{{$props.page}}</span></div>
            <button @click="page(1)" class="btn ">Next Page</button>
        </div>
        <div class="btn-search-wrapper">
            <button class="btn" :class="{ active: activeButton === 'pending' }"
                @click="handleClick('pending')">Pending</button>
            <button class="btn" :class="{ active: activeButton === 'confirmed' }"
                @click="handleClick('confirmed')">Confirmed</button>
            <button class="btn" :class="{ active: activeButton === 'cancelled' }"
                @click="handleClick('cancelled')">Cancelled</button>
        </div>
    </div>
</template>


<style scoped lang="scss">
.header {
    padding: 1rem;
    // height:30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;

    .pagination-wrapper {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .btn-search-wrapper {
        display: flex;
        gap: 2rem;
        align-items: center;

        .btn {
            transition: all 0.3s ease-in-out;

        }

        .btn.active {
            background-color: rgb(5, 178, 5);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

        }


        input {
            padding: 1rem;
            border-radius: 10px;
            border: none;
            width: 20rem;
        }
    }
}
</style>