import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
