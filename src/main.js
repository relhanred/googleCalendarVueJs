import Vue from "vue/dist/vue.common.js";
import VueRouter from "vue-router";
import App from "./App.vue";
import OAuth from "./components/oauth.vue";
import VModal from "vue-js-modal";
 
Vue.use(VModal, { dialog: true, dynamic: true });
Vue.use(VueRouter);

const routes = [{ path: "/", component: OAuth }];

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
