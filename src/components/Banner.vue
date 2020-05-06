<template>
  <div class="banner" :style="banner"></div>
</template>

<script>
export default {
  data() {
    return {
      banner: {
        background:
          "url(https://imgs.aixifan.com/mjJi6eu39h-mEFbqq-immeym-bUr6Nz-JRFNRf.jpg)"
      }
    };
  }
};
</script>

<style>
.banner {
  position: relative;
  top: 0px;
  width: 100vw;
  height: 180px;
}
</style>