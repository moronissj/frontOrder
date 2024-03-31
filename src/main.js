import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@asika32764/vue-animate/dist/vue-animate.css";
import "@asika32764/vue-animate/dist/vue-animate.css";
import axios from "axios";
import "./components/styles/main.css";

axios.defaults.baseURL = "http://localhost:8080";
Vue.prototype.$http = axios;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
