<template>
  <div class="menu">
    <ul class="cl">
      <li v-for="(item,index) in activeNav" :key="index" class="active">
        <a :href="item.channelPath">{{item.channelName}}</a>
        <ul v-if="item.members">
          <li v-for="value in item.members" :key="value">
            <a :href="value.url">{{value.name}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="cl">
      <li v-for="(item,index) in notActiveNav" :key="index">
        <a :href="item.channelPath">{{item.channelName}}</a>
        <ul v-if="item.members">
          <li v-for="value in item.members" :key="value">
            <a :href="value.url">{{value.name}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../axios/index";
import store from "../store/index";
export default {
  props: ["chanel-list"],
  data() {
    return {
      nav: [
        {
          channelName: "首页",
          chanelPath: "/"
        }
      ]
    };
  },
  // mounted: function() {
  //   this.getChannel();
  // },
  mounted() {
    this.pushNav();
  },
  computed: {
    activeNav: function() {
      var me = this;
      return this.nav.filter(function(item) {
        return item.chanelPath == me.$route.path;
      });
    },
    notActiveNav: function() {
      var me = this;
      return this.nav.filter(function(item) {
        return item.chanelPath != me.$route.path;
      });
    }
  },
  methods: {
    // getChannel() {
    //   if (sessionStorage.getItem("channel_list") != null) {
    //     JSON.parse(sessionStorage.getItem("channel_list")).forEach(element => {
    //       this.nav.push(element);
    //     });
    //   } else {
    //     api.getChannelList().then(res => {
    //       sessionStorage.setItem(
    //         "channel_list",
    //         JSON.stringify(res.data.data.list)
    //       );
    //       res.data.data.list.forEach(element => {
    //         this.nav.push(element);
    //       });
    //     });
    //   }
    pushNav() {
      if (store.getters.channels.legnth == 0) {
        this.$store.dispatch("setChannels").then(
          store.getters.channels.forEach(elem => {
            this.nav.push(elem);
          })
        );
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.menu {
  display: flex;
  position: relative;
  width: 100vw;
  padding: 0 10vw;
  border-bottom: 1px #e5e5e5 solid;
}
.menu li {
  float: left;
  font-size: 14px;
  line-height: 46px;
}
.menu li a {
  padding: 0 16px;
  height: 46px;
  color: #000;
}
.menu li:hover {
  color: red;
  cursor: pointer;
}
.active {
  color: red;
  border-bottom: 3px red solid;
}
</style>