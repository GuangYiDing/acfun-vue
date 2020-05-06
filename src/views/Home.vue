<template>
  <div class="home">
    <header-bar />
    <banner />
    <m-menu />
    <a-section />
    <copy-right />
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from "./Login.vue";
import HeaderBar from "../components/HeaderBar.vue";
import Banner from "../components/Banner.vue";
import MMenu from "../components/Menu.vue";
import ASection from "../components/Section.vue";
import CopyRight from "../components/CopyRight";
export default {
  name: "home",
  components: {
    HeaderBar,
    Banner,
    MMenu,
    ASection,
    CopyRight
  }
};
</script>
<style>
.home {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-shadow: 1px 1px 1px #fff;
}
.layout {
  width: 1160px;
  margin: 0 auto;
}
a {
  color: black;
}
a:hover {
  color: red;
}
.fl {
  float: left;
}
</style>