import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import user from './user'
import trade from './trade'
//对外暴露一个Store类的实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        cart,
        user,
        trade
    }
})