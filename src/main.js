import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "https://v3.tissini.app";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'primeflex/primeflex.css'

import 'primevue/resources/themes/saga-green/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                          //icons


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

import PrimeVue from 'primevue/config';
Vue.use(PrimeVue);

//Components PrimeVue
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import Rating from 'primevue/rating';
import DataView from 'primevue/dataview';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping

import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import ProgressBar from 'primevue/progressbar';

//Use Components
Vue.component("Message", Message);

Vue.component("InputText", InputText);
Vue.component("InputNumber", InputNumber);
Vue.component("Button", Button);
Vue.component("Dialog", Dialog);
Vue.component("Rating", Rating);
Vue.component("Dropdown", Dropdown);
Vue.component("DataView", DataView);
Vue.component("DataTable", DataTable);
Vue.component("Column", Column);
Vue.component("ColumnGroup", ColumnGroup);
Vue.component("ProgressBar", ProgressBar);

Vue.component("DataViewLayoutOptions", DataViewLayoutOptions);
Vue.component("Panel", Panel);

Vue.use(ToastService);
Vue.use(router);
Vue.use(VueAxios, axios);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
