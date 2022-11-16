import { createApp } from "vue";
import { createPinia } from "pinia";
// import { createI18n } from "vue-i18n";
import router from "./router";
import naive from "naive-ui";
import App from "./App.vue";
import "./style.css";
import i18n from './i18n'

// const i18n = createI18n({});

const pinia = createPinia();

createApp(App).use(i18n).use(pinia).use(naive).use(router).mount("#app");
