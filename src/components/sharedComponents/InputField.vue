<script setup lang="ts">
import { ref } from 'vue';
import { vMaska } from "maska/vue"

const props = defineProps({
    required: Boolean,
    optional: Boolean,
    placeHolder: String,
    asteriskPosition: String,
    height: String,
    mask: String,
    disabled: Boolean,
    error: Boolean,
    date: Boolean,
    minYear:String,
    maxYear:String,
    lettersOnly:Boolean,
    numbersOnly:Boolean,
    value: String
});

const clear = () => {
    input.value = '';
}
let input = ref(props.value||'');
const emit = defineEmits([`input`]);

const emitInput = (e: Event) => {
    // emit(`input`, (e.target as HTMLInputElement).value);
    emit(`input`, (input.value));

}
const handleInput = (e:Event) => {

    if(props.date){
        let value = (e.target as HTMLInputElement).value;
        if(value.length === 2){
            if(parseInt(value) > 12){
                input.value = '12-';
            }
            if(parseInt(value) === 0){
                input.value = '01-';
            }
        }
        if(value.length === 5){
            let dayValue = parseInt(value.split('-')[1]);
            if(dayValue > 31){
                input.value = `${value.split('-')[0]}-31-`;
            }
            if(dayValue === 0){
                input.value = `${value.split('-')[0]}-01-`;
            }
        }
        if(value.length === 10){
            if(props.maxYear){
                if(parseInt(value.split('-')[2]) > new Date().getFullYear() + parseInt(props.maxYear)){
                    input.value = `${value.split('-')[0]}-${value.split('-')[1]}-${new Date().getFullYear() + parseInt(props.maxYear)}`;
                }
            }
             if(props.minYear){
                if(parseInt(value.split('-')[2]) < new Date().getFullYear() + parseInt(props.minYear)){
                    input.value = `${value.split('-')[0]}-${value.split('-')[1]}-${new Date().getFullYear() + parseInt(props.minYear)}`;
                }
            }
        }
    }

    if(props.lettersOnly){
        let value = (e.target as HTMLInputElement).value;
        let regex = /^[a-zA-Z\s]*$/;
        if(!regex.test(value)){
            input.value = value.slice(0, -1);
        }
    }
    if(props.numbersOnly){
        let value = (e.target as HTMLInputElement).value;
        let regex = /^[0-9]*$/;
        if(!regex.test(value)){
            input.value = value.slice(0, -1);
        }
    }
    emitInput(e);
}
const CalcHeight = () => {
    if (props.height) {
        return `height:${props.height}`;
    }
    return '';
}

const CalcTop = () => {
    if (props.height) {
        return `top:16px`;
    }
    return '';
}

defineExpose({
    clear,
});
</script>

<template>
    <div class="required">
        <input  :disabled="$props.disabled" class="input-field" v-if="!props.height" :style="`width:100%; ${CalcHeight()};${($props.error)?'border-color:red':''}`" 
        v-maska="mask"
            type="text" v-model="input" @input="handleInput($event)">
        <textarea :disabled="$props.disabled" class="input-field" v-if="$props.height" :style="`width:100%;resize:none; ${CalcHeight()};${($props.error)?'border-color:red':''}`"
            floatlabeltype type="text" v-model="input" @input="handleInput($event)" />
        <label class="asterisk" v-if="!input" :style="`${CalcTop()};`">{{ $props.placeHolder }}<span style="color:red" v-if="props.required">
                *</span> <span class='ps' v-if="$props.optional">(Optional)</span></label>
    </div>
</template>
<style scoped lang="scss">
.required {
    position: relative;

    >.input-field {
    height: 3.75rem;
    transition: all 0.3s ease-in-out;
    &[disabled]{
        background-color: $grey;
    }

        @media screen and (max-width: 800px) {
            height: 6rem;
            // padding: 18px;
        }

    }

    .arrowdown,
    .asterisk {
        position: absolute;
    }

    .asterisk {
        left: 1.25rem;
        top: 35%;
        color: rgba(0, 0, 0, 0.793);
        font-family: $montserrat;
        font-size: 1.125rem;
        pointer-events: none;
        @media screen and (max-width: 800px) {
            left: 18px;
        }
        @media screen and (max-width: 800px) {
            font-size: 13px;
        }
    }

    .arrowdown {
        left: 90%;
        top: 34%;
    }
}
</style>