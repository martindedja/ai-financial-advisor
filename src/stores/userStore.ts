import { defineStore } from "pinia";
import type { UserData } from "@/interfaces/UserData";
import axios from "axios";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userData: null as UserData | null,
    }),
    actions: {
        setUser(data: UserData) {
            this.userData = data;
        },
        clearUser() {
            this.userData = null;
        },
        getUser() {
            return this.userData;
        },
        async fetchUserData() {
            try {
                const userId = localStorage.getItem("user");
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_DEV}/api/users/${userId}`);
                const data = await response.json();
                this.userData = data;
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        }
    },
    persist: true,
});