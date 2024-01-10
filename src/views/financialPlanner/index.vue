<script setup lang="ts">
    import FormCustom from '../forms/FormCustom.vue';
    import { ref } from 'vue';

    const isModalOpen = ref(false);

    const toggleModal = () => {
        isModalOpen.value = !isModalOpen.value;
    };

    const closeModal = () => {
        isModalOpen.value = false;
    };
</script>

<template>
    <div>
        <div class="financialPlannerHeader">
            <h1>Financial Planner</h1>
            <div>
                <v-btn
                    color="primary"
                    @click="toggleModal"
                >
                    + Add Expense
                </v-btn>
            </div>
        </div>
        <v-dialog
            v-model="isModalOpen"
            class="formCustomModal"
        >
            <FormCustom
                @close-modal="closeModal"
            />
        </v-dialog>
    </div>
</template>

<style scoped>
    .financialPlannerHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .formCustomModal {
        width: 100%;
        max-width: 700px;
    }
</style>
