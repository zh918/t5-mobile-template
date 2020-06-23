const path = {
  authApi: null,
  busApi: null,
  serverless: null
};

if (process.env.NODE_ENV === 'debugger' || process.env.NODE_ENV === 'dev') {
  // path.authApi = 'http://192.168.1.50:30006/scfManager'
  // path.busApi = 'http://192.168.1.50:30006/scfManager'

  // path.authApi = 'http://192.168.1.50:7001'
  // path.busApi = 'http://192.168.1.50:21512'

  path.authApi = 'http://localhost:3000';
  path.busApi = 'http://localhost:3000';
  path.serverless = 'https://serverless-runtime-api.pagoda.com.cn/test_exc';
} else if (process.env.NODE_ENV === 'dev') {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  // path.authApi = 'http://192.168.1.25:30006/caiHuiCustomer'
  // path.busApi = 'http://192.168.1.25:30006/caiHuiCustomer'
  path.authApi = 'https://wxdev.yitianxian.com/caiHuiCustomer';
  path.busApi = 'https://wxdev.yitianxian.com/caiHuiCustomer';
  path.serverless = 'https://serverless-runtime-api.pagoda.com.cn/test_exc';
} else if (process.env.NODE_ENV === 'test') { 
  path.authApi = 'https://wxtest.yitianxian.com/caiHuiCustomer';
  path.busApi = 'https://wxtest.yitianxian.com/caiHuiCustomer';
  path.serverless = 'https://serverless-runtime-api.pagoda.com.cn/test_exc';
  
} else if (process.env.NODE_ENV === 'uat') { 
  path.authApi = 'http://192.168.1.25:30006/caiHuiCustomer';
  path.busApi = 'http://192.168.1.25:30006/caiHuiCustomer';
} else if (process.env.NODE_ENV === 'prod') { 
  path.authApi = 'https://domain.caihuilife.com/caiHuiCustomer';
  path.busApi = 'https://domain.caihuilife.com/caiHuiCustomer';
}

export default path;
