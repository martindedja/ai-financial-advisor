import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { useUserStore } from './userStore';

// Change this to your base url from .env file
const baseUrl = `http://127.0.0.1:3000/api`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null'),
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await fetchWrapper.post(`${baseUrl}/login`, { email, password });
                
                const { user, token } = response;        
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                fetchWrapper.setToken(token);
                const userStore = useUserStore();
                userStore.fetchUserData();
                router.replace('/dashboard');
            } catch (error) {
                console.error(error);
            }
        },
        logout() {
            this.user = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');

            fetchWrapper.clearToken();

            router.push('/auth/login');
        }
    }
});
