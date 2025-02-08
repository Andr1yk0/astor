import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import RequestsService from "@/services/requestsService";
import CustomerService from "@/services/customerService";

Vue.config.productionTip = false
Vue.prototype.$requestsService = new RequestsService();
Vue.prototype.$customerService = new CustomerService();
export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
