<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import EmailsHeader from './EmailsHeader.vue';
import Http from '@/mixins/Http';
import Btn from '@/components/sharedComponents/btn.vue';
import Modal from '@/components/sharedComponents/Modal.vue';
import AddEmailModal from './AddEmailModal.vue';

const forms = ['reservation', 'insurance', 'career', 'contact']
const emails: Ref<{ [key: string]: { email: string, id: number, title: string }[] }> = ref({});
const getEmails = async () => {
    const res = await Http.get('admin/email', { Authorization: `Bearer ${localStorage.getItem('token')}` });

    // emails.value = res.data;

    const groupedEmails = res.data.reduce((acc: { [key: string]: any[] }, email: any) => {
        if (!acc[email.title]) {
            acc[email.title] = [];
        }
        acc[email.title].push(email);
        return acc;
    }, {});

    emails.value = groupedEmails;

    console.log(emails.value);
}

const loading = ref(false)

const deleteEmail = async (id: number, form: String) => {
    loading.value = true;
    const res = await Http.delete(`admin/email/${id}`, { Authorization: `Bearer ${localStorage.getItem('token')}` });
    loading.value = false;
    if (res.status === 200) {
        emails.value[form as keyof typeof emails.value] = filterEmails(id, form);
    }
}

const filterEmails = (id: number, form: String) => {
    return emails.value[form as keyof typeof emails.value].filter((email: any) => {
        return email.id != id;
    })
}

const addEmail = (email: any) => {
    emails.value[email.title].push(email);
    console.log(emails.value);
    addEmailModal.value?.closeModal();
}
const currentModal = ref('');

const addEmailModal: Ref<InstanceType<typeof Modal> | null> = ref(null);

const openModal = (form: string) => {
    currentModal.value = form;
    addEmailModal.value?.openModal();
}
onMounted(() => {
    getEmails()
})

</script>

<template>

    <EmailsHeader />

    <Modal ref="addEmailModal">
        <AddEmailModal :form="currentModal" @close="addEmailModal?.closeModal" @newEmail="addEmail($event)" />
    </Modal>
    <div class="emails-container">
        <div class="emails-wrapper" v-for="(form, index) in forms" :key="index">
            <div class="header">
                <h2>{{ form.charAt(0).toUpperCase() + form.slice(1) }} Form</h2>
                <Btn class="add" @click="openModal(form)">Add Email</Btn>
            </div>
            <div class="emails">
                <div class="singleEmail" v-for="email in emails[form as keyof typeof emails]">
                    <p>{{ email.email }}</p>
                    <Btn class="delete" @click="deleteEmail(email.id, form)" :loading="loading">Delete</Btn>
                </div>


            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.emails-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    // @include pagePadding();
    padding: 2rem;

    .emails-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .header{
            display:flex;
            justify-content:space-between;
            margin:1rem 0;
        }

        .emails {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .singleEmail {
                padding: 1rem;
                border: 1px solid #000;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>