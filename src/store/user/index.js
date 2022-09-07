import { reqGetVerifyCode, reqUserLogin, reqUserRegister, reqUserInfo, reqUserLoginOut } from '@/api'
import { setUserToken, getUserToken, removeUserToken } from '@/utils/user_token'
const state = {
    verifyCode: "",
    userToken: getUserToken('USERTOKEN'),
    userInfo: {},
};
const mutations = {
    GETVERIFYCODE(state, code) {
        state.verifyCode = code;
    },
    USERLOGIN(state, token) {
        state.userToken = token;
    },
    GETUSERINFO(state, info) {
        state.userInfo = info;
    },
    CLEARUSER(state) {
        //清除仓库及本地存储的用户相关信息
        //
        state.userToken = '';
        state.userInfo = {};
        removeUserToken();
    }
};
const actions = {
    //获取验证码
    async getVerifyCode({ commit }, phone) {
        let result = await reqGetVerifyCode(phone);
        if (result.code = 200) {
            commit('GETVERIFYCODE', result.data)
        }
    },
    //注册
    async userRegister({ commit }, userData = {}) {
        let result = await reqUserRegister(userData);
        if (result.code == 200) {
            alert(JSON.stringify(userData) + '\n注册成功');
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //用户登录
    async userLogin({ commit }, userInfo = {}) {
        let result = await reqUserLogin(userInfo);
        if (result.code = 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setUserToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log(result);
        if (result.code === 200) {
            commit('GETUSERINFO', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async userLoginOut({ commit }) {
        //向服务器发请求，通知服务器清除token
        let result = await reqUserLoginOut();
        if (result.code === 200) {
            commit('CLEARUSER')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
};
const getters = {
    verifyCodeGetter: (state) => state.verifyCode,
    userInfoGetter: (state) => state.userInfo,
    userTokenGetter: (state) => state.userToken,
};


export default {
    state,
    mutations,
    actions,
    getters
}