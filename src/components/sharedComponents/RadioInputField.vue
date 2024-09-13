<script setup lang="ts">
import { onMounted, ref } from 'vue';


const props = defineProps<{
    title: string,
    options: string[],
    error: boolean,
    checked: string
}>();
const emit = defineEmits(['change']);
onMounted(() => {
    const radioInputs = document.querySelectorAll('.radio-input');
    radioInputs.forEach((input) => {
        input.addEventListener('click', (e) => {
            activate(e);
            checkRadio(e);
        });

    });

    const activate = (e: Event) => {
        const target = e.target as HTMLInputElement;

        radioInputs.forEach((input) => {
            input.classList.remove('active');
        });
        target.classList.add('active');
    }

    const checkRadio = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const radio = target.previousElementSibling as HTMLInputElement;
        radio.checked = true;
        emit('change', radio.value);
    }
});

const checkIfChecked = (option:string) => {
    if(props.checked == option){
        emit('change', option);
        return true;
    } else {
        return false;
    }
}



</script>

<template>
    <div class="radio-input-field" >
        <span class="text" :style="props.error? `color:red;`:``">{{ props.title }}:</span>
        <div class="options">
            <div class="option" v-for="option in props.options" :key="option">
                <input type="radio" @change="" :checked="checkIfChecked(option)" :name="props.title" :value="option" />
                <div class="radio-input" :class="`${(props.checked == option)? 'active':''}`"  :for="option"></div>
                <label class="text" :style="props.error? `color:red;`:``">{{ option }}</label>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.radio-input-field {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    width: 100%;
    height:100%;
    border-radius: $border-radius;

    .text {
        color: $black;
        transition: all 0.3s ease-in-out;
    }

    .options {
        display: flex;
        gap: 3rem;
        // justify-content: space-around;
        width: 100%;

        input {
            display: none;
        }

        .option {
            display: flex;
            gap: 1rem;
            align-items: center;



            .radio-input {
                background-color: $white;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                box-shadow: 0px 0px 6.7px 0px rgba(44, 50, 51, 0.50) inset;
                transition: all 0.3s ease-in-out;

                &.active {
                    background-color: $blue;
                    transition: all 0.3s ease-in-out;
                }
            }
        }

    }
}
</style>