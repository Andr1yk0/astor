<template>
    <div id="app">
        <div class="container-fluid">
            <div class="p-2">
                <button class="btn btn-primary" @click="editRequest = true">Додати заяву</button>&nbsp;
                <button class="btn btn-secondary" @click="editCustomer = true">Додати замовника</button>
            </div>
            <RequestsList
                :update-timestamp="listUpdateTimestamp"
                @viewRequest="viewRequestHandler"
                @editRequest="editRequestHandler"
            />
            <EditRequestModal
                v-if="editRequest"
                :request="selectedRequest"
                @formSaved="requestFormSavedHandler"
                @closed="editRequest = false"
            />
            <EditCustomerModal
                v-if="editCustomer"
                @closed="editCustomer = false"
                @formSaved="customerFormSavedHandler"
            />
            <ViewRequestModal
                v-if="viewRequest"
                :request="selectedRequest"
                @closed="viewRequestClosedHandler"
                @editRequest="editRequestHandler"
            />
        </div>
    </div>
</template>

<script>

import RequestsList from "@/components/RequestsList.vue";
import EditRequestModal from "@/components/EditRequestModal.vue";
import EditCustomerModal from "@/components/EditCustomerModal.vue";
import ViewRequestModal from "@/components/ViewRequestModal.vue";

export default {
    name: 'App',
    components: {
        EditCustomerModal,
        EditRequestModal,
        RequestsList,
        ViewRequestModal
    },
    data: function () {
        return {
            listUpdateTimestamp: null,
            editRequest: false,
            editCustomer: false,
            viewRequest: false,
            selectedRequest: null,
        }
    },
    methods: {
        requestFormSavedHandler: function (){
            this.listUpdateTimestamp = Date.now();
            this.editRequest = false;
            this.selectedRequest = null;
        },
        viewRequestHandler: function ($event){
            this.selectedRequest = $event;
            this.viewRequest = true;
        },
        viewRequestClosedHandler: function (){
            this.viewRequest = false
            this.selectedRequest = null;
        },
        editRequestHandler: function (request){
            this.viewRequest = false;
            this.selectedRequest = request;
            this.editRequest = true;
        },
        customerFormSavedHandler: function (){
            this.editCustomer = false;
        }
    }
}
</script>