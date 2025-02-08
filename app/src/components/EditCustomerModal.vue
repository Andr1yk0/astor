<template>
    <Modal @closed="close" :centered="true" :title="'Додати замовника'">
        <div slot="body">
            <CustomerForm ref="customerForm" @saved="savedHandler" @submitting="submittingHandler" />
        </div>
        <div slot="footer">
            <button type="button" :disabled="formSubmitting" @click="save()" class="btn btn-primary">Зберегти</button>
        </div>
    </Modal>
</template>
<script>
import CustomerForm from "@/components/CustomerForm.vue";
import Modal from "@/components/Modal.vue";

export default {
    name: "EditCustomerModal",
    components: {CustomerForm, Modal},
    data: function (){
        return {
            formSubmitting: false,
        }
    },
    methods: {
        close: function (){
            this.$emit("closed");
        },
        save: function (){
            this.$refs.customerForm.submit()
        },
        submittingHandler: function ($event){
            this.formSubmitting = $event;
        },
        savedHandler: function (){
            this.$emit('formSaved');
        }
    }
}
</script>

