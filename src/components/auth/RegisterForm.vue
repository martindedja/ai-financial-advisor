<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { useRouter } from 'vue-router';

const checkbox = ref(false);
const valid = ref(true);
const show1 = ref(false);
const password = ref('');
const email = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const fname = ref('');
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
]);

const router = useRouter();
const register = async () => {
    if (valid.value) {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: fname.value,
                    email: email.value,
                    password: '1234',
                    password_confirmation: '1234',
                    risk_tolerance: 20,
                    financial_goals: 'test'
                }),
            });

            if (!response.ok) throw new Error('Error registering user');

            router.push('/auth/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }
};

</script>
<template>
    <v-row class="d-flex mb-6">
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="20" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">or sign in with</span>
        </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Name</v-label>
        <VTextField v-model="fname" :rules="fnameRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Adddress</v-label>
        <VTextField v-model="email" :rules="emailRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
        <VTextField v-model="password" :counter="10" :rules="passwordRules" required variant="outlined" type="password"
            color="primary"></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block @click="register" flat>Sign Up</v-btn>

    </v-form>
</template>
