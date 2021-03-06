import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFullPage from 'vue-fullpage.js'

import VueFilter from 'vue-filter';
import VueMasonry from 'vue-masonry-css'

import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import vPlayBack from 'v-playback';
import VideoBackground from 'vue-responsive-video-background-player'

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

// install rules
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


Vue.component('video-background', VideoBackground);
import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage);

Vue.use(vPlayBack);
Vue.use(VueMapbox, { mapboxgl: Mapbox });
Vue.use(VueMasonry);
Vue.use(VueFilter);
Vue.use(VueFullPage);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    router,
    data: {
        options: {
          licenseKey: '3E3837AD-D11241BB-BB398B8E-3A4D26B4'
        },
    },
    render: h => h(App)
}).$mount('#app')