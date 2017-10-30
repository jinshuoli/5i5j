import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404.vue';

import login from '@/views/login.vue'
import main from '@/views/main.vue'

import overview from '@/views/tpl/overview.vue'
import IncomingAnalysis from '@/views/tpl/IncomingAnalysis.vue'
import IncomingCall from '@/views/tpl/IncomingCall.vue'
import CallRecord from '@/views/tpl/CallRecord.vue'
import NotificationRecord from '@/views/tpl/NotificationRecord.vue'
import custAdmin from '@/views/tpl/custAdmin.vue'
import StaffAdmin from '@/views/tpl/StaffAdmin.vue'
import InboundSetup from '@/views/tpl/InboundSetup.vue'
import CallSetup from '@/views/tpl/CallSetup.vue'
import custSetup from '@/views/tpl/custSetup.vue'
import rbac from '@/views/tpl/rbac.vue'
import SystemConf from '@/views/tpl/SystemConf.vue'
import resetPwd from '@/views/tpl/resetPwd.vue'

import test from '@/components/test.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 去掉hash
  routes: [{
      path: '/5i5j/login',
      name: 'login',
      component: login
    }, {
      path: '/5i5j',
      component: main,
      name: '主体页',
      redirect: '/5i5j/overview', // 直接访问main的时，跳到/main/overview页面

      children: [
        { path: 'overview', component: overview, name: '概览' },
        { path: 'IncomingAnalysis', component: IncomingAnalysis, name: '呼入分析' },
        { path: 'IncomingCall', component: IncomingCall, name: '呼入记录' },
        { path: 'CallRecord', component: CallRecord, name: '外呼记录' },
        { path: 'NotificationRecord', component: NotificationRecord, name: '通知记录' },
        { path: 'custAdmin', component: custAdmin, name: '客户管理' },
        { path: 'StaffAdmin', component: StaffAdmin, name: '员工管理' },
        { path: 'rbac', component: rbac, name: '权限管理' },
        { path: 'InboundSetup', component: InboundSetup, name: '呼入设置' },
        { path: 'CallSetup', component: CallSetup, name: '外呼设置' },
        { path: 'custSetup', component: custSetup, name: '客户设置' },
        { path: 'SystemConf', component: SystemConf, name: '系统设置' },
        { path: 'resetPwd', component: resetPwd, name: '重置密码' },
        { path: 'test', component: test, name: '测试' },
      ],
    },
    {
      path: '/404',
      component: NotFound,
      name: '出错啦',
      hidden: true,
    },
    // {
    //   path: '*',
    //   hidden: true,
    //   redirect: { path: '/404' }
    // }
      {
      path: '*',
      hidden: true,
      redirect: { path: '/5i5j/overview' }
    }
  ]
})
