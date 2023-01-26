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

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.use(Markdown);
app.use(BootstrapVue3);
app.component("default-layout", Default);
app.mount("#app");
