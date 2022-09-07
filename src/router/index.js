import store from '@/store';
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由插件
Vue.use(VueRouter)
import routes from './routes'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {//当同时指定resolve,reject回调
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {//当同时指定resolve,reject回调
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    // next();
    let token = store.getters.userTokenGetter;
    let userName = store.getters.userInfoGetter.name;
    if (token) {
        //若用户已经登录
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {
            if (!userName) {
                try {
                    await store.dispatch('getUserInfo');
                } catch (error) {
                    //token失效了
                    alert('登录已过期，请重新登录')
                    console.log(error.message);
                    await store.dispatch('userLoginOut');
                    next('/login')
                }
            }
            next()
        }
    } else {
        //未登录无法进入交易相关页面、个人中心
        let toPath = to.path;
        // console.log(toPath);
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next()
        }

    }
})
export default router