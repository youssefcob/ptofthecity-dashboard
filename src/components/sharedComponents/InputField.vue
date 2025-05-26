<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
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
    minYear: String,
    maxYear: String,
    lettersOnly: Boolean,
    numbersOnly: Boolean,
    value: String,
    Password: Boolean,
    background: String,
    default: String,
});

const clear = () => {
    input.value = '';
}
let input = ref(props.value || '');
const emit = defineEmits([`input`, 'update:modelValue']);

const emitInput = () => {
    // emit(`input`, (e.target as HTMLInputElement).value);
    emit(`update:modelValue`, (input.value));
    emit(`input`, (input.value));

}

watch(() => input.value, () => {
    handleInput();
})


onMounted(() => {

    emit(`input`, (input.value));
});
const asterisk: Ref<HTMLElement | null> = ref(null);

const handleInput = () => {

    if (props.date) {
        let value = input.value;
        if (value.length === 2) {
            if (parseInt(value) > 12) {
                input.value = '12-';
            }
            if (parseInt(value) === 0) {
                input.value = '01-';
            }
        }
        if (value.length === 5) {
            let dayValue = parseInt(value.split('-')[1]);
            if (dayValue > 31) {
                input.value = `${value.split('-')[0]}-31-`;
            }
            if (dayValue === 0) {
                input.value = `${value.split('-')[0]}-01-`;
            }
        }
        if (value.length === 10) {
            if (props.maxYear) {
                if (parseInt(value.split('-')[2]) > new Date().getFullYear() + parseInt(props.maxYear)) {
                    input.value = `${value.split('-')[0]}-${value.split('-')[1]}-${new Date().getFullYear() + parseInt(props.maxYear)}`;
                }
            }
            if (props.minYear) {
                if (parseInt(value.split('-')[2]) < new Date().getFullYear() + parseInt(props.minYear)) {
                    input.value = `${value.split('-')[0]}-${value.split('-')[1]}-${new Date().getFullYear() + parseInt(props.minYear)}`;
                }
            }
        }
    }

    if (props.lettersOnly) {
        let value = input.value;
        let regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
            input.value = value.slice(0, -1);
            return;
        }
    }
    if (props.numbersOnly) {
        let value = input.value;
        let regex = /^[0-9]*$/;
        if (!regex.test(value)) {
            input.value = value.slice(0, -1);
            return;

        }
    }

    if (input.value.length > 0) {
        asterisk.value?.classList.add('active');
    } else {
        asterisk.value?.classList.remove('active');
    }

    emitInput();
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

onMounted(() => {

    if (input.value.length > 0) {
        asterisk.value?.classList.add('active');
    } else {
        asterisk.value?.classList.remove('active');
    }
})
</script>

<template>
    <div class="required">
        <input :disabled="$props.disabled" class="input-field" v-if="!$props.height"
            :style="`width:100%; ${CalcHeight()};${($props.error) ? 'border-color:red' : ''};${props.background ? `background-color:${props.background}` : 'white'}`"
            v-maska="mask" type="text" v-model="input">

        <textarea :disabled="$props.disabled" class="input-field" v-if="$props.height"
            :style="`width:100%;resize:none; ${CalcHeight()};${($props.error) ? 'border-color:red' : ''}`" type="text"
            v-model="input"></textarea>

        <label class="asterisk" ref="asterisk" :style="`${CalcTop()};`">{{ $props.placeHolder }}<span style="color:red"
                v-if="props.required">
                &nbsp;*</span> <span class='ps' v-if="$props.optional">(Optional)</span></label>

        <!-- <label class="asterisk" ref="asterisk" 
            :style="`${CalcTop()};${$dir() === 'ltr' ? 'left:1.25rem' : 'right:1.25rem'};`">{{ $props.placeHolder }}<span
                :style="props.required ? `color:red` : `color:transparent`">
                *</span> <span class='ps' v-if="$props.optional">(Optional)</span></label> -->
    </div>
</template>
<style scoped lang="scss">
.required {
    position: relative;

    >.input-field {
        height: 3.75rem;
        transition: all 0.3s ease-in-out;

        &[disabled] {
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
        transition: all 0.3s ease-in-out;


        &.active {
            top: -1.5rem !important;
            left: .7rem;
            // background-color: white;
            transition: all 0.3s ease-in-out;
            font-size: 0.9rem;
        }

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