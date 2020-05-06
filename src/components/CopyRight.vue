<template>
  <div id="copy">
    <div class="copyright" style="color:#409eff;">Copyright © 2019 GuangYi. All Rights Reserved</div>
  </div>
</template>

<script>
export default {
  name: "copy",
  data() {
    return {};
  }
};
</script>
<style>
#copy {
  color: #409eff;
  position: relative;
  bottom: -18%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.copyright {
  width: 360px;
  height: 28px;
  padding: 8px 0;
  font-size: 12px;
  line-height: 28px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>