<template>
    <form class="row" ref="form" @submit.prevent="store">
        <div class="col-md-6 mb-3">
            <label class="form-label">Номер заяви</label>
            <input v-model="formData.number" required type="text" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label class="form-label">Дата створення</label>
            <input v-model="formData.date" required type="date" class="form-control">
        </div>
        <div class="col-md-12 mb-3">
            <label class="form-label">Причина звернення</label>
            <select v-model="formData.reason" class="form-select">
                <option v-for="(title, value) in requestReasons" :key="value" :value="value">{{title}}</option>
            </select>
        </div>
        <div class="col-md-12 mb-3">
            <label class="form-label">Коментар</label>
            <textarea v-model="formData.comment" rows="4" class="form-control"></textarea>
        </div>
        <div class="col-md-12 mb-3">
            <label class="form-label">Потужність приєднання, кВт</label>
            <input v-model="formData.power" required type="number" step="any" class="form-control">
        </div>
        <div class="col-12 bg-secondary-subtle py-2 mb-3">
            <h4 class="text-center">Замовник</h4>
            <CustomerFormFields v-model="formData.customer"/>
        </div>
        <EditCustomerModal v-if="editCustomer" @closed="editCustomer = false" />
        <div class="col-12">
            <label class="form-label">Документи</label>
            <input type="file" ref="fileInput" @input="documentsAddHandler" class="form-control" accept=".pdf,.doc" multiple>
            <DocumentsList :files="formData.docs" @removeDocument="removeDocumentHandler" :show-remove-btn="true" />
        </div>
        <input ref="submitInput" class="d-none" type="submit">
    </form>
</template>
<script>
import EditCustomerModal from "@/components/EditCustomerModal.vue";
import {requestReasons} from "@/dictionaries/requestReasons";
import DocumentsList from "@/components/DocumentsList.vue";
import CustomerFormFields from "@/components/CustomerFormFields.vue";

export default {
    name: "RequestForm",
    components: {CustomerFormFields, DocumentsList, EditCustomerModal},
    props: {
        request: {
            type: Object,
            default: null
        }
    },
    data: function () {
        return {
            isSubmitting: false,
            editCustomer: false,
            requestReasons: requestReasons,
            previewFile: null,
            formData: {
                number: null,
                date: null,
                reason: '1',
                power: null,
                comment: null,
                customer: {
                    firstName: null,
                    lastName: null,
                    address: null,
                    phone: null,
                },
                docs: [],
            }
        }
    },
    created() {
        if(this.request){
            for (let field in this.request) {
                if(field === 'docs'){
                    this.formData[field] = [...this.request[field]];
                }else if(field === 'customer'){
                    for (let customerField in this.request.customer){
                        this.formData.customer[customerField] = this.request.customer[customerField];
                    }
                }else {
                    this.formData[field] = this.request[field];
                }
            }
        }
    },
    methods: {
        store: function () {
            this.$emit('submitting', true);
            const responsePromise = this.request
                ? this.$requestsService.updateRequest(this.request.id, this.formData)
                : this.$requestsService.addRequest(this.formData);
            responsePromise
                .then(() => {
                    this.$emit('saved')
                })
                .finally(() => {
                    this.$emit('submitting', false);
                })
        },
        documentsAddHandler: function () {
            Array.from(this.$refs.fileInput.files).forEach(file => {
                this.formData.docs.push(file)
            })
            this.$refs.fileInput.value = '';
        },
        removeDocumentHandler: function (file) {
            this.formData.docs = this.formData.docs.filter(item => item.name !== file.name)
        },
        submit: function () {
            this.$refs.submitInput.click();
        }
    },
}
</script>