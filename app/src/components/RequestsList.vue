<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">№ заяви</th>
            <th scope="col">Дата</th>
            <th scope="col">Причина звернення</th>
            <th scope="col">Замовник</th>
            <th scope="col">Документи</th>
            <th scope="col">Дії</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="request in requests" :key="request.number">
                <td>{{ request.number }}</td>
                <td>{{ request.date }}</td>
                <td>{{ requestReasons[request.reason] }}</td>
                <td>{{ request.customer.lastName}} {{request.customer.firstName}}</td>
                <td> - </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm">
                        <FontAwesomeIcon :icon="['far', 'edit']" />
                    </button>&nbsp;
                    <button class="btn btn-outline-primary btn-sm">
                        <FontAwesomeIcon :icon="['far', 'eye']" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import {requestReasons} from "@/dictionaries/requestReasons";

library.add(faEdit, faEye);

export default {
    name: "RequestsList",
    components: {FontAwesomeIcon},
    props: {
        updateTimestamp: Number
    },
    data: function (){
        return {
            requests: [],
            requestReasons: requestReasons
        }
    },
    created() {
        this.getRequests();
    },
    methods: {
        getRequests: function (){
            this.$requestsService.getAllRequests().then(requests => {
                this.requests = requests;
            })
        }
    },
    watch: {
        updateTimestamp: function (){
            this.getRequests();
        }
    }
}
</script>
<style scoped>

</style>