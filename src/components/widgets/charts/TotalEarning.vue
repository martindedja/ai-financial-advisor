<script setup lang="ts">
    import {
        ref,
        defineProps,
        onMounted,
        computed
    } from 'vue';

    const props = defineProps({
        title: {
            type: String,
            default: ''
        },
        categories: {
            type: Array,
            default: () => []
        },
        series: {
            type: Array,
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        }
    });

    const selectedRange = ref('1W');

    const options = computed(() => {
        console.log(props.series);
        return {
            chart: {
                id: 'basic-bar'
            },
            xaxis: {
                categories: props.categories
            }
        };
    });

    const series = computed(() => {
        return [
            {
                name: 'Expenses',
                data: props.series
            }
        ];
    });

    const formattedTotal = computed(() => {
        return props.total.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD'
            }
        );
    });

    const emit = defineEmits([
        'onDateRangeChange'
    ]);

    const setRange = (range: string) => {
        selectedRange.value = range;
        emit('onDateRangeChange', range);
    };
</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            <h6
                class="text-subtitle-1 text-medium-emphasis"
            >
                {{ props.title }}
            </h6>
            <h4 class="text-h4 mt-1">
                {{ formattedTotal }}
            </h4>
            <div class="range-selector">
                <button
                    :class="{
                        'button-selected':
                            selectedRange === '1W'
                    }"
                    @click="setRange('1W')"
                >
                    1W
                </button>
                <button
                    :class="{
                        'button-selected':
                            selectedRange === '1M'
                    }"
                    @click="setRange('1M')"
                >
                    1M
                </button>
                <button
                    :class="{
                        'button-selected':
                            selectedRange === '6M'
                    }"
                    @click="setRange('6M')"
                >
                    6M
                </button>
                <button
                    :class="{
                        'button-selected':
                            selectedRange === '1Y'
                    }"
                    @click="setRange('1Y')"
                >
                    1Y
                </button>
            </div>
            <apexchart
                type="bar"
                width="100%"
                height="400px"
                :options="options"
                :series="series"
            ></apexchart>
        </v-card-item>
    </v-card>
</template>

<style lang="scss" scoped>
    .range-selector {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        button {
            border: none;
            background: none;
            color: var(--v-primary-base);
            font-weight: 600;
            font-size: 1rem;
            margin-left: 0.2rem;
            padding: 0.5rem 0.5rem;
            border-radius: 10px;
            cursor: pointer;
        }
        button:hover {
            background: radial-gradient(
                circle at 18.7% 37.8%,
                rgb(250, 250, 250) 0%,
                rgb(225, 234, 238) 90%
            );
        }
        .button-selected {
            background: radial-gradient(
                circle at 18.7% 37.8%,
                rgb(250, 250, 250) 0%,
                rgb(225, 234, 238) 90%
            );
        }
    }
</style>
