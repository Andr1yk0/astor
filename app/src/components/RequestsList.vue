<template>
    <div>
        <div class="d-flex justify-content-end align-self-end bg-secondary-subtle p-2 gap-2 align-items-end">
            <div>
                <label>Дата від</label>
                <input type="date" v-model="filter.minDate" class="form-control">
            </div>
            <div>
                <label>Дата до</label>
                <input type="date" v-model="filter.maxDate" class="form-control">
            </div>
            <button @click="clearFilter" class="btn btn-primary">Очистити фільтр</button>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">№ заяви</th>
                <th scope="col">Дата</th>
                <th scope="col">Причина звернення</th>
                <th scope="col">Потужність приєднання</th>
                <th scope="col">Замовник</th>
                <th scope="col">Дії</th>
            </tr>
            </thead>
            <tbody v-if="requests.length">
            <tr v-for="request in requests" :key="request.number">
                <td>{{ request.number }}</td>
                <td><FormattedDate :date="request.date"/></td>
                <td>{{ requestReasons[request.reason] }}</td>
                <td>{{ request.power }} кВт</td>
                <td>{{ request.customer.lastName}} {{request.customer.firstName}}</td>

                <td>
                    <button class="btn btn-outline-primary btn-sm" @click="editRequestHandler(request)">
                        <FontAwesomeIcon :icon="['far', 'edit']" />
                    </button>&nbsp;
                    <button class="btn btn-outline-primary btn-sm" @click="viewRequestHandler(request)">
                        <FontAwesomeIcon :icon="['far', 'eye']" />
                    </button>
                </td>
            </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6" class="text-center">Даних не знайдено</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import { requestReasons } from "@/dictionaries/requestReasons";
import FormattedDate from "@/components/FormattedDate.vue";


library.add(faEdit, faEye);

export default {
    name: "RequestsList",
    components: {FormattedDate, FontAwesomeIcon},
    props: {
        updateTimestamp: Number
    },
    data: function (){
        return {
            requests: [],
            requestReasons: requestReasons,
            filter: {
                minDate: null,
                maxDate: null,
            }
        }
    },
    created() {
        this.getRequests();
    },
    methods: {
        getRequests: function (){
            this.$requestsService.search(this.filter).then(requests => {
                this.requests = requests;
            })
        },
        clearFilter: function (){
            for (let field in this.filter){
                this.filter[field] = null;
            }
        },
        viewRequestHandler: function (request){
            this.$emit('viewRequest', request)
        },
        editRequestHandler: function (request){
            this.$emit('editRequest', request)
        }
    },
    watch: {
        updateTimestamp: function (){
            this.getRequests();
        },
        filter: {
            handler: function (){
                this.getRequests();
            },
            deep: true
        }
    },
}
</script>
<style scoped>

</style>