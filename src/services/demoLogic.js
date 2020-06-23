import urls from './url';

class DemoLogic {
  constructor() {}

  getData(parms) {
    return $http.post(urls.apiGetData, parms);
  }

  getDemoList() {
    return $http.post(urls.getDemoList);
  }

  getDemoList1() {
    return $http.post(urls.getDemoList1);
  }
}

export default new DemoLogic();
