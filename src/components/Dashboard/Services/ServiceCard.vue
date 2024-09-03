<script setup lang="ts">
import type { Service } from '@/interfaces/content';
import Http from '@/mixins/Http';
import { ref } from 'vue';

const props = defineProps({
    service: {
        type: Object as () => Service,
    },
});


const showDeleteModal = ref(false);
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}

const emit = defineEmits(['serviceDeleted']);

const deleteService = async (id: string | undefined) => {
    // console.log(id);
    if (!id) return;
    let res = await Http.delete(`services/${id}`, {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // console.log(res);
    if (res.status === 401) window.location.href = '/login';
    if (res.status === 200) emit('serviceDeleted', id);
    toggleDeleteModal();
    // window.location.reload();
}
</script>

<template>
    <div class="card">
        <div class="info">
            <div class="header">
                <h2>{{ props.service?.title }}</h2>

                <div class="btns-wrapper">
                    <button>Edit</button>
                    <button v-if="!showDeleteModal" class="delete" @click="toggleDeleteModal()">Delete</button>
                    <div class="delete-container" v-if="showDeleteModal">
                        <span>Are you sure you want to delete?</span>
                        <div>
                            <button class="cancel" @click="toggleDeleteModal()">Cancel</button>
                            <button class="delete" @click="deleteService(props.service?.id)">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <p><strong>Description: </strong>{{ props.service?.description }}</p>
    <p><strong>list header: </strong> {{ props.service?.listHeader }}</p>
    <p><strong>list: </strong><span v-for="listItem in $props.service?.list"><br>{{ listItem }}</span></p>
    <p><strong>image:</strong><a :href=" props.service?.path">Click Here!</a></p>
</template>

<style scoped lang="scss">
.card {
    display: flex;

    .info {
        width: 100%;


        .header {
            display: flex;

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