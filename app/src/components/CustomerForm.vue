<template>
    <form ref="form" @submit.prevent="store">
        <CustomerFormFields v-model="formData" />
        <input ref="submitInput" class="d-none" type="submit">
    </form>
</template>
<script>
import CustomerFormFields from "@/components/CustomerFormFields.vue";

export default {
    name: "CustomerForm",
    components: {CustomerFormFields},
    props: {
        value: Object,
    },
    data: function () {
        return {
            autocompleteCustomers: [],
            formData: {
                firstName: null,
                lastName: null,
                address: null,
                phone: null,
            }
        }
    },
    watch: {
        'formData': {
            handler: function (val) {
                this.$emit('input', val);
            },
            deep: true
        },
        'value': {
            handler: function () {
                for (let field in this.value){
                    if(field in this.formData){
                        this.formData[field] = this.value[field];
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        submit: function () {
            this.$refs.submitInput.click();
        },
        store: function () {
            this.$emit('submitting', true);
            this.$customerService.addCustomer(this.formData)
                .then(() => {
                    this.$emit('saved');
                })
                .finally(() => {
                    this.$emit('submitting', false);
                })
        }
    }
}
</script>