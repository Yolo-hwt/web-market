//home模块小仓库
import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
}
const actions = {
    //获取三级联动list数据
    async getCategoryList({ commit }) {
        let result = await reqGetCategoryList();
        if (result.code === 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        // console.log(result);
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
const getters = {
    categoryListGetter: state => {
        return state.categoryList
    },
    bannerListGetter: state => {
        return state.bannerList
    },
    floorListGetter: state => {
        return state.floorList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}