import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router"; // 导入路由配置
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);

// app.use(router); // 使用路由
app.use(pinia);
app.mount("#app");
