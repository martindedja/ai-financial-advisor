<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import type { FormType } from '@/interfaces/FormType';
    import axios from 'axios';

    const user = localStorage.getItem('user');
    const userDataObject = user
        ? JSON.parse(user)
        : null;
    const userId = userDataObject.userData.id;

    const categoryOptions = ref([
        'Food',
        'Car',
        'Education',
        'Hobbies',
        'Miscellaneous'
    ]);

    const paymentMethodOptions = ref([
        'Credit Card',
        'Debit Card',
        'Cash',
        'Online Platforms'
    ]);

    const frequencyOptions = ref([
        'One-Time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ]);

    const initialState = {
        amount: '1234',
        description: '1234',
        category: 'Car',
        paymentMethod: 'Credit Card',
        frequency: 'One-Time',
        date: '2021-09-01'
    };

    const form = reactive<FormType>({
        ...initialState
    });

    const rules = {
        amount: { required },
        description: { required },
        category: { required },
        paymentMethod: { required },
        frequency: { required },
        date: { required }
    };

    const v$ = useVuelidate(rules, form);

    const clear = () => {
        Object.keys(initialState).forEach(
            (key) => {
                const formKey =
                    key as keyof FormType;
                form[formKey] =
                    initialState[formKey];
            }
        );

        v$.value.$reset();
    };
    const emitcloseModal = defineEmits([
        'closeModal'
    ]);
    const handleSubmit = () => {
        v$.value.$touch();

        if (!v$.value.$invalid) {
            const response = fetch(
                `${
                    import.meta.env
                        .VITE_API_BASE_URL_DEV
                }/api/expenses`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`
                    },
                    body: JSON.stringify({
                        amount: form.amount,
                        description:
                            form.description,
                        category_id: 1,
                        payment_method:
                            form.paymentMethod,
                        frequency: form.frequency,
                        date: form.date,
                        user_id: userId
                    })
                }
            );
            clear();
            emitcloseModal('closeModal');
        } else {
            console.error(
                'Form is invalid:',
                v$.value.$errors
            );
        }
    };
</script>
<template>
    <v-form>
        <v-row>
            <v-col
                cols="12"
                sm="6"
            >
                <v-label
                    class="mb-2 font-weight-medium"
                    >Amount</v-label
                >
                <v-text-field
                    v-model="form.amount"
                    variant="outlined"
                    placeholder="Enter amount"
                    color="primary"
                    :error-messages="
                        v$.amount.$error
                            ? v$.amount.$errors.map(
                                  (e) => ''
                              )
                            : []
                    "
                    @blur="v$.amount.$touch()"
                    required
                ></v-text-field>
                <v-label
                    class="mb-2 font-weight-medium"
                    >Description</v-label
                >
                <v-text-field
                    v-model="form.description"
                    variant="outlined"
                    placeholder="Enter Text"
                    color="primary"
                    :error-messages="
                        v$.description.$error
                            ? v$.description.$errors.map(
                                  (e) => ''
                              )
                            : []
                    "
                    @blur="
                        v$.description.$touch()
                    "
                    required
                ></v-text-field>
                <v-label
                    class="mb-2 font-weight-medium"
                    >Category</v-label
                >
                <v-select
                    :items="categoryOptions"
                    placeholder="Select Category"
                    item-text="text"
                    item-value="value"
                    v-model="form.category"
                    :error-messages="
                        v$.category.$error
                            ? v$.category.$errors.map(
                                  (e) => ''
                              )
                            : []
                    "
                    @blur="v$.category.$touch()"
                    required
                ></v-select>
            </v-col>

            <v-col>
                <v-label
                    class="mb-2 font-weight-medium"
                    >Payment Method</v-label
                >
                <v-select
                    :items="paymentMethodOptions"
                    placeholder="Select Payment Method"
                    item-title="items"
                    item-value="abbr"
                    return-object
                    single-line
                    variant="outlined"
                    v-model="form.paymentMethod"
                    :error-messages="
                        v$.paymentMethod.$error
                            ? v$.paymentMethod.$errors.map(
                                  (e) => ''
                              )
                            : []
                    "
                    @blur="
                        v$.paymentMethod.$touch()
                    "
                    required
                ></v-select>
                <v-label
                    class="mb-2 font-weight-medium"
                    >Frequency</v-label
                >
                <v-select
                    :items="frequencyOptions"
                    placeholder="Select Frequency"
                    item-title="items"
                    item-value="abbr"
                    return-object
                    single-line
                    variant="outlined"
                    v-model="form.frequency"
                    :error-messages="
                        v$.frequency.$error
                            ? v$.frequency.$errors.map(
                                  (e) => ''
                              )
                            : []
                    "
                    @blur="v$.frequency.$touch()"
                    required
                ></v-select>
                <v-label
                    class="mb-2 font-weight-medium"
                    >Date</v-label
                >
                <v-text-field
                    v-model="form.date"
                    variant="outlined"
                    type="date"
                    color="primary"
                    :error-messages="
                        v$.date.$error
                            ? v$.date.$errors.map(
                                  (e) => ''
                              )
                            : []
                    "
                    @blur="v$.date.$touch()"
                    required
                >
                </v-text-field>
            </v-col>
        </v-row>
        <v-btn
            color="primary"
            @click="handleSubmit"
            >Submit</v-btn
        >
    </v-form>
</template>
