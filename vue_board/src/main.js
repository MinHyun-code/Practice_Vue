import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes"; //설정 라우터 호출
import axios from "axios"; //axios 호출
import store from "@/store/store.js";
import "bootstrap"; // [bootstrap]
import BootstrapVue3 from "bootstrap-vue-3";
import Markdown from "vue3-markdown-it";
import "highlight.js/styles/monokai.css";
import "../public/vendor/fontawesome-free/css/all.min.css";
import "../public/css/sb-admin-2.min.css";
import Default from "@/components/Wrappers/baseLayout.vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.use(Markdown);
app.use(BootstrapVue3);
app.use(Vue3Toastify, {
  autoClose: 1000,
});
app.component("default-layout", Default);
app.component("Datepicker", Datepicker);
// 페이지 이동 시 실행
router.beforeEach(async (to, from, next) => {
  store.commit("readStateFromStorage");
  if (to.path != "/" && to.path != "/join") {
    if (store.state.login_tf == false) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

app.mount("#app");
