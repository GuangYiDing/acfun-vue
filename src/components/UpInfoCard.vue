<template>
  <div class="UpInfoCard">
    <section id="up-info">
      <div class="up-detail">
        <el-avatar class="upcover" icon="el-icon-user-solid"></el-avatar>
        <a href target="_blank" class="upname">
          <p class="name float">{{upInfo.userName}}</p>
          <div class="upCollageVerifiedIcon top-t float">
            <span class="upVerifiedIcon iconSmall"></span>
            <div class="uc-content"></div>
          </div>
          <p class="desc">{{upInfo.signature}}</p>
        </a>
      </div>
      <ul class="up-census">
        <li class="vote">
          <div class="count">{{upInfo.contentCount}}</div>
          <div class="type">投稿</div>
        </li>
        <!-- <li data-status="0" class="focus">
          <div class="count">{{upInfo.following}}</div>
          <div class="type">关注</div>
        </li>
        <li class="follow">
          <div class="count">{{upInfo.followed}}</div>
          <div class="type">粉丝</div>
        </li>-->
      </ul>
      <!-- <div class="up-operate">
        <div class="focus">关注</div>
        <a href target="_blank" class="mail">私信</a>
      </div>-->
    </section>
  </div>
</template>

<script>
export default {
  props: ["up-info"],
  watch: {},
  data() {
    return {};
  }
};
</script>

<style>
.UpInfoCard {
  max-width: 240px;
  position: relative;
  border-radius: 3px;
  transition: 0.2s;
}
.UpInfoCard:hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
}
#user-info {
  color: #666;
  margin: 0;
  font: inherit;
  font-size: 100%;
  display: block;
  width: 240px;
  border: 1px solid #eee;
  padding: 19px;
  background-color: #fafafa;
}
/*! CSS Used from: Embedded */
div,
span,
p,
a,
ul,
li,
section {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}
section {
  display: block;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
  outline: 0;
}
#main .upCollageVerifiedIcon {
  position: relative;
  display: inline-block;
  font-style: normal;
}
#main .upVerifiedIcon {
  display: inline-block;
  background: url(//cdnfile.aixifan.com/static/font/icon_up_a7ab9db.svg)
    no-repeat;
  cursor: pointer;
  width: 18px;
  height: 18px;
  background-size: 18px 18px;
}
#main .iconSmall {
  background: url(//cdnfile.aixifan.com/static/font/icon_up_a7ab9db.svg)
    no-repeat;
  width: 18px;
  background-size: 18px 18px;
}
a:hover {
  color: #fd4c5d;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/content_2056a49.css */
section div span {
  display: inline-block;
  vertical-align: middle;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/upinfo_c5356b2.css */
#up-info {
  width: 240px;
  border: 1px solid #eee;
  padding: 19px;
  background-color: #fafafa;
}
#up-info .up-detail {
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
#up-info .up-detail a {
  display: inline-block;
  text-decoration: none;
  vertical-align: middle;
}
#up-info .up-detail .upcover {
  border-radius: 50%;
  /* width: 50px;
  height: 50px; */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
}
#up-info .up-detail .upname {
  width: 170px;
  margin-top: 7px;
}
#up-info .up-detail .upname .name {
  max-width: 142px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}
#up-info .up-detail .upname .desc {
  padding-top: 8px;
  width: 100%;
  height: 12px;
  font-size: 12px;
  line-height: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
#up-info .up-census {
  padding: 20px 0;
  text-align: center;
}
#up-info .up-census li {
  display: inline-block;
  vertical-align: middle;
  width: 54px;
}
#up-info .up-census li .count {
  height: 18px;
  font-size: 18px;
  line-height: 18px;
  color: #333;
  text-align: center;
  white-space: nowrap;
}
#up-info .up-census li .type {
  height: 12px;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
  margin-top: 6px;
  color: #999;
}
#up-info .up-census .focus {
  margin: 0 20px;
}
#up-info .up-operate {
  width: 100%;
  height: 30px;
  text-align: center;
}
#up-info .up-operate div.focus {
  background-color: #fd4c5d;
  color: #fff;
}
#up-info .up-operate a.mail {
  color: #555;
  border: 1px solid #e2e2e2;
}
#up-info .up-operate div,
#up-info .up-operate a {
  display: inline-block;
  vertical-align: middle;
  width: 110px;
  height: 30px;
  text-align: center;
  border-radius: 100px;
  font-size: 14px;
  line-height: 30px;
  background-color: #fff;
  cursor: pointer;
}
.upCollageVerifiedIcon .upVerifiedIcon {
  margin-left: 2px;
}
.upCollageVerifiedIcon .iconSmall {
  margin-top: -7px;
}
.upCollageVerifiedIcon .uc-content {
  position: absolute;
  top: 20px;
  width: 224px;
  height: 80px;
  left: -98px;
  display: none !important;
}
.upCollageVerifiedIcon .uc-content .upIconTxt {
  position: absolute;
  left: 0;
  width: 224px;
  line-height: 24px;
  box-sizing: border-box;
  padding: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 3px;
  background: #fff;
  color: #333;
  top: 6px;
  z-index: 99;
  font-weight: 400;
  font-size: 12px;
}
.upCollageVerifiedIcon .uc-content .upIconTxt .linkIcon {
  color: #999 !important;
  display: block !important;
}
.upCollageVerifiedIcon .uc-content .upIconTxt:after {
  content: "";
  width: 10px;
  height: 10px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: -6px;
  left: 100px;
  background: #fff;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}
/*! CSS Used from: Embedded */
a {
  color: #333;
}
</style>