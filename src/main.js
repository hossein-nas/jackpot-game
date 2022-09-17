import { createApp } from "vue";
import App from "./App.vue";
import { createHead } from "@vueuse/head";

import "./assets/main.css";

createApp(App).use(createHead()).mount("#app");
