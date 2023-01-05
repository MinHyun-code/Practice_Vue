import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes"; //설정 라우터 호출
import axios from "axios"; //axios 호출
import store from "@/store/store.js";
import "bootstrap/dist/css/bootstrap.min.css"; // [bootstrap]
import "bootstrap"; // [bootstrap]
import BootstrapVue3 from "bootstrap-vue-3";
import Default from "@/components/common/baseLayout.vue";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.use(BootstrapVue3);
app.component(Default);
app.mount("#app");
