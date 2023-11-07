import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import Mock from 'mockjs'
import Pic2 from "@/components/pic2.vue";
import Pic from "@/components/pic.vue";

import store from './store';
axios.defaults.withCredentials = true;
const app = createApp(App)
app.use(store);
app.use(router)
app.use(ElementPlus)
app.component('pic2', Pic2)
app.component('pic', Pic)
app.mount('#app')


