import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import RequestService from "@/services/requestService";
import CustomerService from "@/services/customerService";

Vue.config.productionTip = false
Vue.prototype.$requestsService = new RequestService();
Vue.prototype.$customerService = new CustomerService();

new Vue({
  render: h => h(App),
}).$mount('#app')
