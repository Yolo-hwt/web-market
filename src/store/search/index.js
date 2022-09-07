import { reqGetSearchList } from '@/api'
//search模块小仓库
const state = {
    searchList: []
}
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value
    }
}
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchList(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
const getters = {
    goodsListGetter: state => {
        return state.searchList.goodsList || [];
    },
    attrsListGetter: state => {
        return state.searchList.attrsList || [];
    },
    trademarkListGetter: state => {
        return state.searchList.trademarkList || [];
    },
    searchList_totalGetter: state => {
        return state.searchList.total
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}