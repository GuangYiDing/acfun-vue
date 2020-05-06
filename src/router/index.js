import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'
import mBase64 from "../assets/js/Base64";
import api from "../axios/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: "Acfun-文章区" }
  },
  {
    // path: '/ac/:aid/:uid',
    path: '/ac',
    name: 'MArticle',
    component: () => import('../views/MArticle.vue')
  },
  {
    path: '/u',
    name: 'User',
    meta: { title: "Acfun-用户中心" },
    component: () => import('../views/User.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: "登录/注册", isKeepAlive: false },
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }

})

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  // 自己录浏览量 每三次提交一次
  if (to.name == "MArticle") {
    let params = JSON.parse(mBase64.decode(to.query.info));
    let view = { id: params.aid, latestActiveTime: new Date() }
    store.commit('mutationsViews', view);
    if (store.getters.views.length % 3 == 0) {
      let list = JSON.stringify((store.getters.views));
      console.log("浏览数已超过阈值提交数据库" + store.getters.views);
      api.postArticleView({ data: list }).then((res) => {
        if (res.data.code == 200) store.commit('cleanViews')
      })
    }

  }
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

router.afterEach(() => {
})

export default router
