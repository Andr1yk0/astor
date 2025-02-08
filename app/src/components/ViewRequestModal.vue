<template>
    <Modal @closed="close" :title="'Перегляд заяви'">
        <div slot="body">
            <div class="request-print-wrap">
                <dl class="row">
                    <dt class="col-sm-4">Номер заяви</dt>
                    <dd class="col-sm-8">{{ request.number }}</dd>
                    <hr>
                    <dt class="col-sm-4">Дата</dt>
                    <dd class="col-sm-8">{{ formatDate(request.date) }}</dd>
                    <hr>
                    <dt class="col-sm-4">Причина звернення</dt>
                    <dd class="col-sm-8">{{ requestReasons[request.reason] }}</dd>
                    <hr>
                    <dt class="col-sm-4">Коментар</dt>
                    <dd class="col-sm-8">{{ request.comment }}</dd>
                    <hr>
                    <dt class="col-sm-4">Потужність приєднання</dt>
                    <dd class="col-sm-8">{{ request.power }} кВт</dd>
                </dl>
                <div class="row">
                    <div class="col-12 mb-3">
                        <h4 class="text-center">Замовник</h4>
                    </div>
                    <dt class="col-sm-4">Прізвище</dt>
                    <dd class="col-sm-8">{{ request.customer.lastName }}</dd>
                    <hr>
                    <dt class="col-sm-4">Ім'я</dt>
                    <dd class="col-sm-8">{{ request.customer.firstName }}</dd>
                    <hr>
                    <dt class="col-sm-4">Адреса</dt>
                    <dd class="col-sm-8">{{ request.customer.address }}</dd>
                    <hr>
                    <dt class="col-sm-4">Телефон</dt>
                    <dd class="col-sm-8">{{ request.customer.phone }}</dd>
                </div>
                <div v-if="request.docs && request.docs.length" class="row d-print-none">
                    <div class="col-12 mb-3">
                        <h4 class="text-center">Документи</h4>
                    </div>
                    <div class="col-12 mb-3">
                        <DocumentsList :files="request.docs" />
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            <button @click="printHandler" type="button" class="btn btn-primary">Друкувати</button>&nbsp;
            <button @click="editRequestHandler" type="button" class="btn btn-primary">Редагувати</button>
        </div>
    </Modal>
</template>
<script>
import Modal from "@/components/Modal.vue";
import { requestReasons } from "@/dictionaries/requestReasons";
import dayjs from "dayjs";
import DocumentsList from "@/components/DocumentsList.vue";

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

export default {
    name: "ViewRequestModal",
    props: {
        request: {
            type: Object,
            required: true
        }
    },
    components: {DocumentsList, Modal},
    data: function (){
        return {
            requestReasons: requestReasons
        }
    },
    methods: {
        close: function (){
            this.$emit("closed");
        },
        formatDate: function (date){
            return dayjs(date).format('L')
        },
        editRequestHandler: function (){
            this.$emit("editRequest", this.request);
        },
        printHandler: function (){
            window.print();
        }
    }
}
</script>
<style>
    @media print {
        body * {
            visibility: hidden;
        }
        .request-print-wrap *{
            visibility: visible;
        }
    }

</style>

