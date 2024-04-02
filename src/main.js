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
// importamos pinia
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCryptojs from "vue-cryptojs";
import encryptionPlugin from "./utils/EncryptionPlugin";

axios.defaults.baseURL = "http://localhost:8080";
Vue.prototype.$http = axios;

Vue.use(PiniaVuePlugin);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCryptojs);
Vue.use(VueSweetalert2);
Vue.use(encryptionPlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
