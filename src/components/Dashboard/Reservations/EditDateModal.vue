<script setup lang="ts">
import Btn from '@/components/sharedComponents/btn.vue';
import InputField from '@/components/sharedComponents/InputField.vue';
import type { Reservation } from '@/interfaces/content';
import { onMounted, reactive, ref, watch } from 'vue';


const props = defineProps({
    reservation: {
        type: Object as () => Reservation,
    },
});

const form = reactive({
    date: '',
    time: '',
})

const submit = () => {
    console.log('submit');
}

onMounted(() => {
    if (props.reservation && props.reservation.date_in_unix) {
        const date = new Date(props.reservation.date_in_unix * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        form.date = `${day}-${month}-${year}`;
    }

})

</script>

<template>
    <div class="modal-wrapper">
    <InputField placeHolder="date" mask="##-##-####" date :value="form.date"  ></InputField>
    <InputField placeHolder="Time" mask="##:##"></InputField>
    <Btn @click="submit">Submit</Btn>

    </div>
</template>

<style scoped lang="scss">
.modal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>