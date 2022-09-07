//detail模块小仓库
import { getUUID } from '@/utils/uuid_token'
import { reqGoodsInfo, reqAddOrderUpdateShopCart } from '@/api'
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },

}
const actions = {
    //获取三级联动list数据
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid);
        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    async addOrderUpdateCart({ commit }, { skuid, skunum }) {
        //加入购物车返回的结构
        let result = await reqAddOrderUpdateShopCart(skuid, skunum);
        if (result.code === 200) {
            return Promise.resolve('ok')
        } else {
            return Promise.reject(new Error('failed'))
        }
    }

};
const getters = {
    categoryViewGetter: state => {
        return state.goodInfo.categoryView || {}
    },
    skuInfoGetter: state => {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrListGetter: state => {
        return state.goodInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}