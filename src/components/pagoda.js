// 页面需要使用到的组件统一写在此处
import Vue from 'vue';
import { Button } from 'pagoda-mobile';
import { Cell, CellGroup } from 'pagoda-mobile';

const components = [
  Button,
  Cell,
  CellGroup
];

components.forEach(c => {
  Vue.use(c);
});
