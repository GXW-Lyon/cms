import Vue from 'vue';
import store from './store';
import App from '@/App';
import VueRouter from 'vue-router';
import routes from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import axios from 'axios';
import Mixin from './mixins';
import 'babel-polyfill';
import VueCookies from 'vue-cookies';


Vue.mixin(Mixin);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.config.productionTip = false;

const router = new VueRouter({
    // mode: 'history',
    routes
});
// ajax
Vue.$http = Vue.prototype.$http = axios.create({
    baseURL: 'http://api.kyhddsp.com',
    // baseURL: 'http://api.i6bktq.cn:83',
    withCredentials: true,// `withCredentials` 表示跨域请求时是否需要使用凭证
    timeout: 300000
});
Vue.prototype.$http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response.status);
    return response;
}, function (error) {
    if (error.response) {
        if (error.response.status == 403) {
            router.push({path: '/'});
        }
    }
    return Promise.reject(error);
});
// POST传参序列化
// Vue.prototype.$http.interceptors.request.use((config) => {
//     // if (config.method === 'POST' || config.method === 'post') {
//     //     config.headers.Authorization = 'Bearer ' + getNowCookie().token;
//     // }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.meta.noRequestApprove) {
        next();
    } else {
        if (sessionStorage.userId) {
            // console.log(from,to);
            if (to.meta.keepAlive) {
                to.meta.isBack = true;
            }
            next();
        } else {
            next({
                path: '/'
            });
        }
    }

});

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
