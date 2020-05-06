<template>
  <div class="marticle">
    <template>
      <el-backtop target=".marticle">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;å
        line-height: 40px;
        color: #1989fa;
      }"
        >UP</div>
      </el-backtop>
    </template>
    <header-bar />
    <div class="wp">
      <article-info />
      <copy-right />
    </div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";

import ArticleInfo from "../components/ArticleInfo";

import CopyRight from "../components/CopyRight";
export default {
  name: "marticle",
  components: {
    HeaderBar,
    ArticleInfo,
    CopyRight
  }
};
</script>

<style>
.marticle {
  position: relative;
}
.wp {
  width: 1120px;
  margin: 0 auto;
}
.el-backtop {
  z-index: 999;
}
</style>