<template>
    <div id="app">
        <div class="container-fluid">
            <div class="p-2">
                <button class="btn btn-primary" @click="editRequest = true">Додати заяву</button>&nbsp;
                <button class="btn btn-secondary" @click="editCustomer = true">Додати замовника</button>
            </div>
            <RequestsList :update-timestamp="listUpdateTimestamp" />
            <EditRequestModal v-if="editRequest" @formSaved="requestFormSavedHandler" @closed="editRequest = false"/>
            <EditCustomerModal v-if="editCustomer" @closed="editCustomer = false"/>
        </div>
    </div>
</template>

<script>

import RequestsList from "@/components/RequestsList.vue";
import EditRequestModal from "@/components/EditRequestModal.vue";
import EditCustomerModal from "@/components/EditCustomerModal.vue";

export default {
    name: 'App',
    components: {
        EditCustomerModal,
        EditRequestModal,
        RequestsList
    },
    data: function () {
        return {
            listUpdateTimestamp: null,
            editRequest: false,
            editCustomer: false
        }
    },
    methods: {
        requestFormSavedHandler: function (){
            this.listUpdateTimestamp = Date.now();
            this.editRequest = false;
        }
    }
}
</script>

<style>
</style>
