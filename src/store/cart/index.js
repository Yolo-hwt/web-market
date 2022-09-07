//detail模块小仓库
import { reqCartList, reqDeleteCartById, reqUpdateChecked } from '@/api'
const state = {
    cartListData: [],
}
const mutations = {
    GETCARTLIST(state, cartListData) {
        state.cartListData = cartListData;
    },

}
const actions = {
    //获取三级联动list数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    async deleteCartBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok';
        } else {
            throw Promise.reject(new Error('failed'))
        }
    },
    //修改某一个商品勾选状态
    async changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    allUpdateChecked({ commit, state, dispatch }, checkStatus) {
        const updateArr = [];
        state.cartListData[0].cartInfoList.forEach((cart) => {
            let updateItem = dispatch('changeChecked', { skuId: cart.skuId, isChecked: checkStatus })
            updateArr.push(updateItem);
        })
        return Promise.all(updateArr);
    },
    deleteAllCheckedCart({ commit, state, dispatch }) {
        const deleteArr = [];
        state.cartListData[0].cartInfoList.forEach((cart) => {
            if (cart.isChecked == 1) {
                let deleteItem = dispatch('deleteCartBySkuId', cart.skuId);
                deleteArr.push(deleteItem);
            }
        })
        return Promise.all(deleteArr);
    }
};
const getters = {

    cartListGetter: state => {
        return state.cartListData[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}