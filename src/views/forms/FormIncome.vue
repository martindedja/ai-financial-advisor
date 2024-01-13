<script setup lang="ts">
    import { ref } from 'vue';
    // common components
    import UiParentCard from '@/components/shared/UiParentCard.vue';
    import CustomIncomeForm from '@/components/forms/form-custom/CustomIncomeForm.vue';

    // theme breadcrumb
    const page = ref({ title: 'Form Layouts' });
    const breadcrumbs = ref([
        {
            text: 'Dashboard',
            disabled: false,
            href: '#'
        },
        {
            text: 'Form Layouts',
            disabled: true,
            href: '#'
        }
    ]);
    const emitToParent = defineEmits([
        'closeModal'
    ]);

    const handleCloseModal = () => {
        emitToParent('closeModal');
    };
</script>

<template>
    <v-row>
        <v-col
            cols="12"
            class="mb-12 mt-5"
        >
            <UiParentCard
                title="Add Income Form"
                @close-modal="handleCloseModal"
            >
                <CustomIncomeForm />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
