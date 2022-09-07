import { reqUserAddressInfo, reqOrdersInfo } from "@/api";
const state = {
    userAddress: [],
    ordersInfo: {},
};
const mutations = {
    GETUSERADDRESS(state, address) {
        state.userAddress = address;
    },
    GETORDERSINFO(state, order) {
        state.ordersInfo = order;
    }
};
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqUserAddressInfo();
        if (result.code === 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //获取商品清单
    async getOrdersInfo({ commit }) {
        let result = await reqOrdersInfo();
        if (result.code === 200) {
            commit('GETORDERSINFO', result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    }

};
const getters = {
    userAddressGetter: state => state.userAddress,
    ordersInfoGetter: state => state.ordersInfo,
};
export default {
    state,
    mutations,
    actions,
    getters
}