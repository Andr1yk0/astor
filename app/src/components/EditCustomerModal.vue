<template>
    <Modal @closed="close" :centered="true" :title="'Додати замовника'">
        <div slot="body">
            <CustomerForm />
        </div>
    </Modal>
</template>
<script>
import CustomerForm from "@/components/CustomerForm.vue";
import Modal from "@/components/Modal.vue";

export default {
    name: "EditCustomerModal",
    components: {CustomerForm, Modal},
    methods: {
        close: function (){
            this.$emit("closed");
        }
    }
}
</script>

