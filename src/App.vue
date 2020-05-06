<template>
  <div id="app">
    <transition enter-active-class="el-fade-in " leave-active-class="el-fade-out ">
      <keep-alive include="login,User">
        <!-- && !$route.meta.isKeepAlive -->
        <router-view v-if="isRouterAlive "></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",

  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  mounted() {
    if (sessionStorage.getItem("userInfo") != null) {
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  components: {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: inherit;
}
em {
  font-style: normal;
}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4 {
  font: inherit;
}
input,
select,
button {
  font: inherit;
}
html,
body {
  /* height: 100%; */
  /* width: 100%; */
  /* overflow-x: hidden; */
  margin: 0px;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  /* background-image: linear-gradient(45deg, #f4f1ff, #fff5f5); */
}
#app {
  /* height: 100%;
  overflow: hidden;
  margin: 0px; */
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
}
.cl::after {
  display: block;
  content: "";
  clear: both;
}
.fr {
  float: right;
}
</style>
