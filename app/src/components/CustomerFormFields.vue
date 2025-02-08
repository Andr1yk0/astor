<template>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label class="form-label">Прізвище</label>
            <input v-model="formData.lastName" required @input="getAutocompleteCustomers" type="text" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label class="form-label">Ім'я</label>
            <input v-model="formData.firstName" required type="text" class="form-control">
        </div>
        <div class="col-12">
            <div v-if="autocompleteCustomers.length" class="col-12 position-absolute autocomplete-customers-wrap">
                <div class="list-group">
                    <a href="#"
                       v-for="customer in autocompleteCustomers"
                       :key="customer.id"
                       @click="autofillCustomer(customer)"
                       class="list-group-item list-group-item-action"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ customer.firstName }} {{ customer.lastName }}</h5>
                        </div>
                        <p class="mb-1">{{ customer.address }}</p>
                        <small>{{ customer.phone }}</small>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 mb-3">
            <label class="form-label">Адреса</label>
            <input v-model="formData.address" required type="text" class="form-control">
        </div>
        <div class="col-12 mb-3">
            <label class="form-label">Телефон</label>
            <input v-model="formData.phone" required type="text" class="form-control">
        </div>
    </div>
</template>
<script>
export default {
    name: "CustomerFormFields",
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
    methods: {
        autofillCustomer: function(customer) {
            for(let field in customer){
                if(field in this.formData){
                    this.formData[field] = customer[field];
                }
            }
            this.$nextTick(() => {
                this.autocompleteCustomers = []
            })
        },
        getAutocompleteCustomers: function(){
            if(!this.formData.lastName){
                this.autocompleteCustomers = [];
                return;
            }
            this.$customerService.search({lastName: this.formData.lastName})
                .then((data) => {
                    this.autocompleteCustomers = data;
                })
        },
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
}
</script>
<style scoped>
.autocomplete-customers-wrap {
    max-width: 94%;
    position: absolute;
    max-height: 400px;
    overflow-y: auto;
}
</style>