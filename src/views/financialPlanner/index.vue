<script setup lang="ts">
    import FormCustom from '../forms/FormCustom.vue';
    import TotalEarning from '@/components/widgets/charts/TotalEarning.vue';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';

    const isModalOpen = ref(false);
    let chartData = ref({});

    const toggleModal = () => {
        isModalOpen.value = !isModalOpen.value;
    };

    const closeModal = () => {
        isModalOpen.value = false;
    };

    const getExpenses = async () => {
        axios
            .get(
                `${
                    import.meta.env
                        .VITE_API_BASE_URL_DEV
                }/api/expenses`
            )
            .then((response) => {
                chartData.value =
                    processDataForChart(
                        response.data
                    );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onMounted(() => {
        getExpenses();
    });

    function processDataForChart(data: any[]) {
        const groupedByDate = data.reduce(
            (
                acc: { [x: string]: number },
                currentValue: {
                    date: string;
                    amount: string;
                }
            ) => {
                const date =
                    currentValue.date.split(
                        'T'
                    )[0];

                if (acc[date]) {
                    acc[date] += parseFloat(
                        currentValue.amount
                    );
                } else {
                    acc[date] = parseFloat(
                        currentValue.amount
                    );
                }

                return acc;
            },
            {}
        );

        const categories = Object.keys(
            groupedByDate
        );
        const series = Object.values(
            groupedByDate
        );

        const total = series.reduce(
            (acc, currentValue) => {
                return (
                    Number(acc) +
                    Number(currentValue)
                );
            },
            0
        );

        return { categories, series, total };
    }
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
        <TotalEarning
            title="Total Expenses"
            :categories="chartData.categories"
            :series="chartData.series"
            :total="chartData.total"
        />
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
