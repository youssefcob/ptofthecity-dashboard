<script setup lang="ts">
import Http from '@/mixins/Http';
import { onMounted, reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import Btn from '../sharedComponents/btn.vue';
// const password:Ref<HTMLInputElement | null> = ref(null);
const show = ref(true);
const loginform = reactive({
    username: '',
    password: ''
})

const error: Ref<string[]> = ref([]);

const router = useRouter();

const checkIfLoggedIn = () => {
    if (localStorage.getItem('token')) {
        router.push('/dashboard');
    }
}

const Loading = ref(false);

const login = async () => {
    console.log(loginform);
    try {
        Loading.value = true;
        let res = await Http.post('admin/login', loginform);
        // console.log(res);
        // console.log("________________________");
        Loading.value = false;
        
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            console.log(res.data);
            localStorage.setItem('token', res.data.tokens.token);
            router.push('/dashboard');

        } else {
            error.value.push(res.data.message);
            alert(res.data.message);
            console.error(res.data.message);
            setTimeout(() => {
                error.value = [];
            }, 3000);
        }

        // Redirect to /dashboard
    } catch (e: any) {
        Loading.value = false;
        console.error(e);
        error.value.push(e);
        alert(e);
        setTimeout(() => {
            error.value = [];
        }, 3000);
    }
}

// onMounted(() => {
//     checkIfLoggedIn();
// })

</script>

<template>

    <div class="container">
        <form class="login-wrapper">
            <h2>login</h2>


            <input class="inputField" type="text" placeholder="username" v-model="loginform.username"
                autocomplete="username">
            <div class="password">
                <input class="inputField" :type="show ? 'password' : 'text'" placeholder="password"
                    autocomplete="current-password" v-model="loginform.password">
                <div class="visibility" @click="show = !show">{{ show ? 'Show' : 'Hide' }}</div>
                <span class="error" v-for="e in error">{{ e }}<br></span>

            </div>

            <Btn class="login-btn" @click="login" :loading="Loading">Login</Btn>
        </form>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: $grey;

    .login-wrapper {
        height: 70%;
        width: 70%;
        background-color: $darkgrey;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 5rem;
        align-items: center;



        .password {
            width: 100%;
            position: relative;

            .visibility {
                position: absolute;
                right: 1rem;
                top: 20%;
                cursor: pointer;
                padding: 0.5rem;
                background-color: $darkgrey;
                border-radius: 10px;
            }

            .error {
                color: red;
                align-self: flex-start;
                position: absolute;
                left: 1rem;
                bottom: -2rem;

            }
        }

        .inputField {
            width: 100%;
            padding: 1rem;
            border-radius: 5px;
            border: none;
            background-color: $white;
            font-size: 1.2rem;

            &:focus {
                outline: none;
            }
        }

        .login-btn {
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
    }
}
</style>