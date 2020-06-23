
// import sourceApi from '../../../server/sourceLogic'
import * as types from './types';

export default {
  /**
   * 产品
   */
  loadProduct(context) {
    // return sourceApi.productDict().then(result => { 
    //   if (result.errorCode == 0) {
    //     let dict = [];
    //     result.data.forEach(function(d,i){
    //       dict.push({
    //         code:d.codeCode,// d.codeCode,
    //         codeName:d.codeName,
    //         type: d.type,
    //         validInd: d.validInd
    //       });
    //     });
    //     context.commit(types.LOADING_ALL_PRODUCT,dict);
    //   }

    //   return result;
    // 	});
  },
  loadProductType(context) {
    // return sourceApi.productTypeDict().then(result => {

    //   if (result.errorCode == 0) {
    //     let dict = [];
    //     result.data.forEach(function(d,i){
    //       dict.push({
    //         code:d.codeName,// d.codeCode,
    //         codeName:d.codeName,
    //         validInd: d.validInd
    //       });
    //     });
    //     context.commit(types.LOADING_ALL_PRODUCT_TYPE,dict);
    //   }

    //   return result;
    // 	});
  }

  


};
