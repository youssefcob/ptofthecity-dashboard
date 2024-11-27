<script setup lang="ts">
import Spinner from './Spinner.vue';


const props = defineProps({
    class: {
        type: String,
        default: 'btn'
    },
    loading: {
        type: Boolean,
        default: false
    },
    balls:{
        type: Number,
        default: 4
    }
});

const emit = defineEmits(['click']);

</script>

<template>
    <button :class="'btn ' + props.class" @click="emit('click')" :disabled="props.loading">
        <slot v-if="!props.loading"></slot>
        <Spinner :balls="balls" v-if="props.loading" ></Spinner>
    </button>
</template>

<style lang="scss" scoped>

.btn {
  padding: 1rem;
  background-color: $navy;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  @extend .btnfont;
  overflow: hidden;


  &.login-btn {
            width: 40%;
            padding: 1rem;
            border-radius: 5px;
            border: none;
            background-color: $blue;
            font-size: 1.2rem;
            color: $white;
            text-align: center;
            cursor: pointer;
            align-self: flex-end;
        }

  &.delete {
      background-color: red;
  }

  &.cancel {
      background-color: $grey;
      color: black;
  }

  &.add {
      background-color: $green;
  }

  &[disabled] {
    position:relative;
    cursor:not-allowed;
    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0.4;
        background-color: black;
        // border-radius: ;
    }
    //   background-color: black;
    //   cursor: not-allowed;
  }


}



</style>
