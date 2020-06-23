// import routerObj from '../router'
import shortid from 'shortid';

class TabHelper {

  // 改成一个promise，如果需要流程就按流程来执行
  static open(router, target='_blank') {
    return new Promise(function(resolve, reject) {
      let routerObj = require('../router'); 
      let groupRoutes = routerObj.default.options.routes;
      let routerModel = null;
      if (groupRoutes) {
        groupRoutes.forEach((g, i) => {
          if (g.children && !routerModel) {
            routerModel = g.children.find(r => r.path === router.path);
          }
        });
      }
            
      if (routerModel) {
        let tab = {
          label: routerModel.name,
          value: routerModel.meta.uid, 
          actived: true,
          ...router
        };
    
        // if (!tab.query) tab.query = {};
    
        let isExist = false;  
        // 这里还需要加入参数匹配
        globalVue.$store.state.tabs.list.forEach((t, i) => {
          if (t.path === router.path && !isExist) {
            let tempFlag = true;
            isExist = true;
            if (t.query) {
              for (let k in t.query) {
                // if (k == 'uid') continue;
                if (t.query[k] !== router.query[k]) {
                  tempFlag = false; 
                }       
              }
            }
            if (tempFlag === false) {
              isExist = false; 
            }
    
          }
        });
                
        if (target === '_blank') { 
          if (isExist) {
            tab.meta = {
              uid: routerModel.meta.uid
            };
                        
            // if (location.pathname == router.path){
            //     resolve(true);
            //     return;
            // }
                        
            globalVue.$store.dispatch('tabs/chooseActiveTab', tab).then(result => {
              resolve(true);
              globalVue.$router.replace({path: tab.path, query: tab.query, params: tab.params, meta: tab.meta});  
            });
          } else {
            tab.meta = {
              uid: routerModel.meta.uid
            };
                        
            globalVue.$store.dispatch('tabs/addTab', tab).then(result => {
              resolve(true);
              globalVue.$router.push({path: tab.path, query: tab.query, params: tab.params, meta: tab.meta});  
            });
          }
    
        } else if (target === '_self') {
          // 当前页渲染
                    
        }
    
      }

    });
  }

  static setFilter(key, obj) {
    // 注意：这里需要判断当前key还是否存在与store中,
    //   console.log('===>1',globalVue.$store.state.tabs.list.some(t=>t.meta.uid == key))
    $Data.setObj(key, obj);
  }

  static initFilter(key, cb) {
    let obj = $Data.getObj(key);
    if (obj) {
      cb(obj);
    }
  }

  static delFilter(key) {
    $Data.del(key);
  }
}

window.$TabHelper = TabHelper;
