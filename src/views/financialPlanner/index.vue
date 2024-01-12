<script setup lang="ts">
    import FormCustom from '../forms/FormCustom.vue';
    import TotalEarning from '@/components/widgets/charts/TotalEarning.vue';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';

    const isModalOpen = ref(false);
    let chartData = ref({});

    const formatDate = (date: Date) =>
        date.toISOString().split('T')[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const selectedRange = ref('1W');
    const startDate = ref(formatDate(oneWeekAgo));
    const endDate = ref(formatDate(new Date()));
    const aggregationType = ref('day');

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
                }/api/expenses`,
                {
                    params: {
                        startDate:
                            startDate.value,
                        endDate: endDate.value,
                        aggregationType:
                            aggregationType.value
                    }
                }
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

    const onDateRangeChange = (range) => {
        selectedRange.value = range;
        const now = new Date();

        if (range === '1W') {
            startDate.value = new Date(
                now.setDate(now.getDate() - 7)
            );
            endDate.value = new Date();
            aggregationType.value = 'day';
        } else if (range === '1M') {
            startDate.value = new Date(
                now.setMonth(now.getMonth() - 1)
            );
            endDate.value = new Date();
            aggregationType.value = 'day';
        } else if (range === '6M') {
            startDate.value = new Date(
                now.setMonth(now.getMonth() - 6)
            );
            endDate.value = new Date();
            aggregationType.value = 'week';
        } else if (range === '1Y') {
            startDate.value = new Date(
                now.setFullYear(
                    now.getFullYear() - 1
                )
            );
            endDate.value = new Date();
            aggregationType.value = 'month';
        }

        startDate.value = startDate.value
            .toISOString()
            .split('T')[0];
        endDate.value = endDate.value
            .toISOString()
            .split('T')[0];

        console.log(
            `Start Date: ${startDate.value}`
        );
        console.log(`End Date: ${endDate.value}`);
        console.log(`Selected Range: ${range}`);

        getExpenses();
    };

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
            @onDateRangeChange="onDateRangeChange"
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
