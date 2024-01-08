<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/userStore';


const authStore = useAuthStore();
const userStore = useUserStore();

let userName = computed(() => userStore.getUser()?.name);
console.log(userName)

</script>

<template>
    <v-sheet rounded="md" color="lightsecondary" class="px-4 py-3 ExtraBox">
        <div class="d-flex align-center hide-menu">
            <v-avatar size="40">
                <img src="@/assets/images/profile/user-1.jpg" alt="user" height="40" />
            </v-avatar>
            <div class="ml-4">
                <h4 class="mb-n1 text-h6 textPrimary">{{ userName }}</h4>
                <span class="text-subtitle-2 textSecondary">Designer</span>
            </div>
            <div class="ml-auto">
                <v-btn variant="text" icon rounded="md" color="primary" @click="authStore.logout()">
                    <PowerIcon />

                    <v-tooltip activator="parent" location="top">Logout</v-tooltip>
                </v-btn>
            </div>
        </div>
    </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
    position: relative;
    overflow: hidden;
}

.line-height-none {
    line-height: normal;
}
</style>
