import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import naive from "naive-ui";
import App from "./App.vue";
import "./style.css";
import i18n from "./locales";

const pinia = createPinia();

createApp(App).use(i18n).use(pinia).use(naive).use(router).mount("#app");
