<script setup lang="ts">
    import {
        ref,
        defineProps,
        onMounted
    } from 'vue';
    import { computed } from 'vue';

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
                name: 'series-1',
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
            <apexchart
                type="bar"
                width="75%"
                :options="options"
                :series="series"
            ></apexchart>
        </v-card-item>
    </v-card>
</template>
