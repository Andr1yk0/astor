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
            <label class="form-label">Потужність приєднання</label>
            <input v-model="formData.power" required type="number" class="form-control">
        </div>
        <div class="col-12 bg-secondary-subtle py-2 mb-3">
            <h4 class="text-center">Замовник</h4>
            <CustomerForm v-model="formData.customer"/>
        </div>
        <EditCustomerModal v-if="editCustomer" @closed="editCustomer = false" />
        <div class="col-12">
            <label class="form-label">Документи</label>
            <input type="file" ref="fileInput" @input="documentsAddHandler" class="form-control" accept=".pdf,.doc" multiple>
            <div class="list-group mt-2">
                <div v-for="(file) in formData.docs" :key="file.name" class="list-group-item d-flex justify-content-between">
                    <span>{{file.name}}</span>
                    <div>
                        <button v-if="file.type === 'application/pdf'" class="btn btn-outline-primary btn-sm" @click="setPreviewFile(file)">
                            <FontAwesomeIcon :icon="['far', 'eye']"/>
                        </button>&nbsp;
                        <button class="btn btn-outline-danger btn-sm" @click="removeDocument(file)">
                            <FontAwesomeIcon :icon="['far', 'trash-can']"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <input ref="submitInput" class="d-none" type="submit">
        <DocumentPreviewModal v-if="previewFile" :file="previewFile" @closed="previewFile = null" />
    </form>
</template>
<script>
import EditCustomerModal from "@/components/EditCustomerModal.vue";
import CustomerForm from "@/components/CustomerForm.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {requestReasons} from "@/dictionaries/requestReasons";
import { library} from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faEye } from "@fortawesome/free-regular-svg-icons";
import DocumentPreviewModal from "@/components/DocumentPreviewModal.vue";

library.add(faTrashCan, faEye);

export default {
    name: "RequestForm",
    components: {DocumentPreviewModal, CustomerForm, EditCustomerModal, FontAwesomeIcon},
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
    methods: {
        store: function () {
            this.$emit('submitting', true);
            this.$requestsService.addRequest(this.formData)
                .then(() => {
                    this.$emit('saved')
                })
                .finally(() => {
                    this.$emit('submitting', false);
                })
        },
        documentsAddHandler: function () {
            Array.from(this.$refs.fileInput.files).forEach(file => {
                console.log(file);
                this.formData.docs.push(file)
            })
            this.$refs.fileInput.value = '';
        },
        removeDocument: function (file) {
            this.formData.docs = this.formData.docs.filter(item => item.name !== file.name)
        },
        setPreviewFile: function (file) {
            this.previewFile = file;
        },
        submit: function () {
            this.$refs.submitInput.click();
        }
    },
}
</script>