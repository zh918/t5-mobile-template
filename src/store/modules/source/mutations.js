import * as types from './types';
import actions from './actions';


const state = {
  ProductDict: [],
  productTypeDict: [],
  FoundProviderDict: [],
  PlantManagerDict: [],
  ProvinceDict: []
  // CityDict:[],
};

const mutations = {

  [types.LOADING_ALL_PRODUCT](state, data) {
    state.ProductDict.length = 0;
    Object.assign(state.ProductDict, data);
  },
  [types.LOADING_ALL_PRODUCT_TYPE](state, data) {
    state.productTypeDict.length = 0;
    Object.assign(state.productTypeDict, data);
  },
  /**
   * 省份
   */
  [types.LOADING_ALL_PROVINCE](state, data) {
    Object.assign(state.ProvinceDict, data);
  },
  /**
   * 城市
   */
  [types.LOADING_ALL_CITY](state, data) {
    Object.assign(state.CityDict, data);
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
