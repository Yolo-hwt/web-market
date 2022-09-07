//路由懒加载
export default [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { showFooter: true }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { showFooter: false }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { showFooter: true },
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { showFooter: false }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        meta: { showFooter: true }
    },
    {
        name: 'addcart',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { showFooter: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { showFooter: true }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { showFooter: true },
        //shopcart作为唯一入口
        beforeEnter(to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { showFooter: true },
        //trade作为唯一入口
        beforeEnter(to, from, next) {
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { showFooter: true },
        //trade作为唯一入口
        beforeEnter(to, from, next) {
            if (from.path == "/pay") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { showFooter: true },
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: () => import("@/pages/Center/MyOrder"),
            },
            {
                name: 'group',
                path: 'group',
                component: () => import("@/pages/Center/GroupOrder"),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    // 路由重定向
    {
        path: "*",
        redirect: "/home"
    }
]