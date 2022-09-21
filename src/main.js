import Vue from 'vue'
import App from './App.vue'
//引入路由
//引入vuex
//引入mockServe.js
//引入swiper.css
//引入所有api
import router from '@/router'
import store from '@/store'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import * as API from '@/api';
//引入vue-lazy插件
//引入表单校验插件
import VueLazyload from 'vue-lazyload'
import ultraman from '@/assets/奥特曼.gif'
Vue.use(VueLazyload, {
  loading: ultraman,
})
import '@/plugins/validate'
//引入messagebox
//三级联动组件注册为全局组件
//轮播图注册为全局组件
//分页器注册为全局组件
import { MessageBox, Message } from 'element-ui';
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//elementui挂载原型
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
//关闭生产提示

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    //全局挂载api
    Vue.prototype.$api = API
  },
  //注册路由
  router,
  //注册store
  store,
}).$mount('#app')
