<template>
    <Modal @closed="close" :title="`${request ? 'Редагування' : 'Створення'} заяви`">
        <div slot="body">
            <RequestForm :request="request" ref="requestForm" @saved="savedHandler" @submitting="submittingHandler" />
        </div>
        <div slot="footer">
            <button type="button" @click="save()" class="btn btn-primary">Зберегти</button>
        </div>
    </Modal>
</template>
<script>
import RequestForm from "@/components/RequestForm.vue";
import Modal from "@/components/Modal.vue";

export default {
    name: "EditRequestModal",
    components: {Modal, RequestForm},
    props: {
        request: {
            type: Object,
            default: null
        }
    },
    data: function (){
        return {
            modal: null,
            submitForm: false,
            formSubmitting: false,
        }
    },

    methods: {
        close: function (){
            this.$emit('closed');
        },
        save: function (){
            this.$refs.requestForm.submit();
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