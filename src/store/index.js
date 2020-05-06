import Vue from 'vue'
import Vuex from 'vuex'
import api from '../axios/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: { name: "", token: "" },
    views: [],// { articleId: 0, viewTime: "" }
    channels: [] // { id: 0, channelName:"",channelPath:""}
  },
  getters: {
    userInfo(state) {
      if (sessionStorage.getItem("userInfo") != null) {
        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        state.userInfo = userInfo;
      }
      return state.userInfo
    },
    views(state) {
      if (localStorage.getItem("views") != null) {
        var views = JSON.parse(localStorage.getItem("views"));
        state.views = views;
      }
      return state.views
    },
    channels(state) {
      if (localStorage.getItem("channels") != null) {
        var channels = JSON.parse(localStorage.getItem("channels"));
        state.channels = channels;
      }
      return state.channels
    }
  },
  mutations: {
    mutationsUserInfo(state, userInfo) {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      return (state.userInfo);
    },
    mutationsViews(state, views) {
      state.views.push(views)
      localStorage.setItem("views", JSON.stringify(state.views));
      return (state.views);
    },
    cleanViews(state) {
      state.views.length = 0;
      return state.views
    },
    mutationsChannels(state, channels) {
      state.channels = channels;
      localStorage.setItem("channels", JSON.stringify(state.channels));
      return (state.channels);
    }
  },
  actions: {
    actionsToken({ commit }, token) {
      return commit('mutationsToken', token)
    },
    setChannels({ commit }) {
      api.getChannelList().then(res => {
        commit("mutationsChannels", res.data.data.list);
      });
    }
  },
  modules: {
  }
})
