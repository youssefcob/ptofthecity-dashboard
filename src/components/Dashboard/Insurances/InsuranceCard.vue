<script setup lang="ts">

import { ref } from 'vue';

import {type Insurance} from '@/interfaces/content';
import Http from '@/mixins/Http';
import Btn from '@/components/sharedComponents/btn.vue';
const props = defineProps({
    insurance: {
        type: Object as () => Insurance,
    },
});

const showDeleteModal = ref(false);
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}

const emit = defineEmits(['insuranceDeleted']);

const loading = ref(false);
const deleteInsurance = async (id: number | undefined) => {
    // console.log(id);
    if (!id) return;
    loading.value = true;
    let res = await Http.delete(`images/insurance/${id}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    loading.value = false;
    // console.log(res);
    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) emit('insuranceDeleted', id);
    toggleDeleteModal();
    // window.location.reload();
}


</script>

<template>
    <div  class="card">
        <div class="info">
            <div class="header">
                <h2>{{ props.insurance?.title }}</h2>

                <div class="btns-wrapper">
                    <!-- <button >Edit</button> -->
                    <button v-if="!showDeleteModal" class="delete"
                        @click="toggleDeleteModal()">Delete</button>
                    <div class="delete-container" v-if="showDeleteModal">
                        <span>Are you sure you want to delete?</span>
                        <div>
                            <button class="cancel" @click="toggleDeleteModal()">Cancel</button>
                            <Btn :loading="loading" class="delete" @click="deleteInsurance(props.insurance?.id)">Yes</Btn>
                        </div>
                    </div>
                </div>
            </div>
            <p><strong>image:</strong><a :href=" props.insurance?.path">Click Here!</a></p>


          
        </div>

    </div>

</template>


<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;


        .header {
            display: flex;
            justify-content: space-between;

            .delete-container {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-left: auto;

                div {
                    display: flex;
                    gap: 1rem;
                }
            }
        }

        h3 {
            font-weight: bold;
            margin-top: 1rem;
            ;
        }

        .day {
            display: flex;
        }
    }

    .btns-wrapper {
        display: flex;
        margin-left: auto;
        gap: 1rem;

        button {
            padding: 1rem;
            background-color: $navy;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            
            &.delete {
                background-color: red;
            }

            &.cancel {
                background-color: $grey;
                color: black;
            }

       
        }
    }



}
</style>