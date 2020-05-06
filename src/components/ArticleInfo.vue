<template>
  <div class="article-info" v-wechat-title="articleInfo.title">
    <div class="wp clearfix">
      <div class="fl" style="800px">
        <section class="art-title">
          <div class="art-title-head">
            <div class="caption">{{articleInfo.title}}</div>
            <div class="art-title-census">
              <div class="article-parent">
                <a href="/" class="art-channel">首页</a>
                <span>&nbsp;&gt;&nbsp;</span>
                <a href class="sort-channel">{{articleInfo.channelName}}</a>
              </div>
              <div class="census-left">
                <div class="viewcount">
                  <span>阅读量:</span>
                  <span class="quanity">{{articleInfo.viewCount}}</span>
                </div>
                <div class="comcount">
                  <span>评论:</span>
                  <span class="quanity">{{articleInfo.commentCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="art-contents" v-html="articleInfo.contents"></section>
      </div>

      <div class="fr" style="width:280px">
        <up-card :up-info="upInfo"></up-card>
        <section class="up-contributions">
          <div class="ctb-head">
            <h1 class="ctb-title">最新投稿</h1>
            <!-- <a href target="_blank" class="showall">全部</a> -->
          </div>
          <div class="contribution weblog-item" v-for="(item,index) in latestInfo" :key="index">
            <p class="contb-title tit">
              <a @click="goTo(item.id,upInfo.id)">{{item.title}}</a>
            </p>
            <div class="contb-count">
              <div class="view-count">
                <i class="view"></i>
                <span class="count num">{{item.viewCount}}</span>
              </div>
              <div class="comm-count">
                <i class="comm"></i>
                <span class="count num">{{item.commentCount}}</span>
              </div>
            </div>
          </div>
        </section>
        <el-backtop target=".fl"></el-backtop>
      </div>
    </div>
    <comments :data="data" />
  </div>
</template>

<script>
import api from "../axios/index";
import UpCard from "../components/UpInfoCard";
import Comments from "../components/Comments";
import "quill/dist/quill.snow.css";

export default {
  name: "articleInfo",
  components: {
    UpCard,
    Comments
  },
  data() {
    return {
      articleInfo: {
        commentCount: 0,
        contents: "null",
        contributeTime: "2019-11-26 13:42:21",
        viewCount: 153,
        title: "标题",
        channelName: "综合",
        userName: "周小狄"
      },
      upInfo: {
        id: 1,
        userName: "周小狄",
        signature: "无",
        contentCount: "0",
        followed: 0,
        following: 0
      },
      latestInfo: [
        {
          id: 3,
          title: "法国男子施舍给乞丐0.7欧元 反而被罚款100欧元",
          viewCount: 15,
          commentCount: 0
        }
      ],
      data: {
        pageNum: 1,
        pageSize: 1,
        totalPage: 3,
        total: 3,
        list: [
          {
            id: 3,
            content: "回复第一条评论",
            floor: 3,
            timestamp: "2019-11-29 18:00:11",
            articleId: 1,
            userId: 1,
            pid: 1,
            userName: "周小狄"
          }
        ]
      }
    };
  },
  mounted() {
    this.ready();
  },
  methods: {
    goTo(aid, uid) {
      let reqParams = this.$Base64.encode(
        JSON.stringify({
          aid: aid,
          uid: uid
        })
      );
      if (this.$route.query.info != reqParams) {
        this.$router.push({
          path: "/ac",
          query: {
            info: this.$Base64.encode(
              JSON.stringify({
                aid: aid,
                uid: uid
              })
            )
          }
        });
        this.ready();
      } else {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    clean(obj) {
      Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
    },
    getArticleInfo(id) {
      var _this = this;
      api
        .getArticleInfo$(id)
        .then(res => {
          _this.clean(res.data.data);
          this.articleInfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUpInfo(id) {
      api
        .getUp$(id)
        .then(res => {
          this.clean(res.data.data);
          this.upInfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlatestInfo(id) {
      api
        .getUp$Latest(id)
        .then(res => {
          this.latestInfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getComments(aid) {
      api
        .getComm$(aid, {
          params: { pageNum: 1, pageSize: 15 }
        })
        .then(res => {
          this.data = res.data.data;
        });
    },
    ready() {
      let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
      this.getUpInfo(params.uid);
      this.getlatestInfo(params.uid);
      this.getArticleInfo(params.aid);
      this.getComments(params.aid);
    }
  }
};
</script>

<style>
.article-info {
  position: relative;
  margin-top: 30px;
  width: 1120px;
  margin: 30px auto;
}
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  font-size: 0;
}
.fl {
  float: left;
}
a:hover {
  color: #fd4c5d;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/header_f2d11a6.css */
.icon {
  font-family: iconfont;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/banner_c0bc9e3.css */
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/content_2056a49.css */
.art-title-head {
  width: 800px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.art-title-head .caption {
  margin-bottom: 9px;
  width: 100%;
  font-size: 26px;
  line-height: 40px;
  color: #333;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.art-title-head .art-title-census {
  width: 100%;
  margin-bottom: 20px;
}
.art-title-head .art-title-census div {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  line-height: 12px;
  color: #999;
}
.art-title-head .art-title-census span {
  vertical-align: middle;
  font-size: 12px;
  line-height: 12px;
}
.art-title-head .art-title-census i {
  vertical-align: middle;
  font-size: 12px;
  line-height: 12px;
  color: #999;
  cursor: pointer;
}
.art-title-head .art-title-census .article-parent {
  margin-right: 20px;
}
.art-title-head .art-title-census .article-parent a,
.art-title-head .art-title-census .article-parent span {
  vertical-align: middle;
  color: #999;
}
.art-title-head .art-title-census .census-left {
  border-right: 1px solid #eee;
}
.art-title-head .art-title-census .census-left .viewcount {
  min-width: 80px;
  width: auto;
  height: 20px;
  line-height: 20px;
}
.art-title-head .art-title-census .census-left .comcount {
  min-width: 58px;
  width: auto;
  height: 20px;
  line-height: 20px;
  margin: 0 20px;
  cursor: pointer;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/listTitle_0cdf961.css */
.up-contributions {
  padding-top: 40px;
  max-width: 280px;
}
.up-contributions .ctb-title {
  font-size: 20px;
  line-height: 20px;
  text-align: left;
  color: #333;
}
.up-contributions .ctb-head {
  padding-bottom: 14px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}
.up-contributions .ctb-head .showall {
  position: absolute;
  width: 40px;
  height: 14px;
  right: 0;
  top: 2px;
  font-size: 14px;
  line-height: 14px;
  bottom: 0;
}
.up-contributions .ctb-head .showall:after {
  content: "";
  width: 6px;
  height: 10px;
  display: inline-block;
  background: url(//cdnfile.aixifan.com/static/img/right_9dc9ce8.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 5px;
}
/*! CSS Used from: Embedded */
a {
  color: #333;
}
a:hover {
  color: #fd4c5d;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/list_84d250f.css */
.contribution {
  margin-top: 20px;
  overflow: hidden;
}
.contribution .tit {
  font-size: 14px;
  line-height: 22px;
  color: #555;
  word-wrap: break-word;
}
.contribution .view {
  width: 14px;
  height: 12px;
  margin-right: 5px;
  background: url(//cdnfile.aixifan.com/static/img/view_51d31be.png) no-repeat;
  background-size: 100% 100%;
}
.contribution .num {
  font-size: 12px;
  line-height: 12px;
  color: #999;
  text-align: left;
}
.contribution .comm {
  width: 14px;
  height: 12px;
  margin-right: 6px;
  background: url(//cdnfile.aixifan.com/static/img/comm_fc1dba9.png) no-repeat;
  background-size: 100% 100%;
}
.contribution .contb-count {
  margin-top: 6px;
  margin-right: 20px;
}
.contribution .contb-count div {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  height: 12px;
}
.contribution .comm-count {
  margin-left: 20px;
}
.contribution .comm-count .count {
  width: auto;
  min-width: 24px;
  height: 12px;
}
.contribution div,
.contribution span,
.contribution i {
  vertical-align: top;
}
.contribution i {
  display: inline-block;
}
.art-contents {
  max-width: 800px;
  min-height: 600px;
  margin-top: 30px;
  border-bottom: 1px #eeeeee solid;
}
.art-contents img {
  display: inline;
  margin: 10px 0px;
  max-width: 740px !important;
}
</style>