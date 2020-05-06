<template>
  <div class="ACsection layout">
    <div class="articleBlockLeft">
      <div class="articleLeftTitle">
        <a href="#" class="activeTab">综合推荐</a>
        <a @click="latestRecommend()">最新动态</a>
      </div>
      <div v-for="(citem,cindex) in  recommend.channel_list" :key="cindex">
        <div class="generateRecommand">
          <div class="dynamicsUpdateTitle">
            <span>{{citem.channelName}}</span>
            <a class="dynamicsUpdateChange fr" @click="changeRecommend(citem)">
              <img
                src="https://cdn.aixifan.com/acfun-pc/2.8.41/img/article-change.png"
                class="Rotation"
              />
              <span>换一换</span>
            </a>
          </div>
          <div class="article-list" v-for="(aitem,aindex) in citem.article_list" :key="aindex">
            <div class="article-item">
              <div class="atc-left fl">
                <div class="comm-count">{{aitem.commentCount}}</div>
                <div class="comm-tt">评论数</div>
              </div>
              <div class="atc-right fl">
                <div class="atc-cont-top">
                  <a @click="goTo(aitem.id,aitem.userId)" class="atc-title">{{aitem.title}}</a>
                </div>
                <div class="atc-content">
                  <span>{{aitem.description}}</span>
                </div>
                <div class="atc-info">
                  <div class="atc-up fl act-info-mg">
                    <a href>UP:{{aitem.userName}}</a>
                  </div>
                  <div class="atc-time fl act-info-mg">
                    <p>{{aitem.contributeTime}}</p>
                  </div>
                  <div class="atc-view fl act-info-mg">
                    <span>
                      <i class="el-icon-view"></i>
                    </span>
                    <span>{{aitem.viewCount}}</span>
                  </div>
                  <a class="fr">{{aitem.channelName}}</a>
                  <span class="fr">来自:</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import api from "../axios/index.js";
import store from "../store";
export default {
  data() {
    return {
      recommend: {
        channel_list: [
          {
            id: 1,
            channelName: "",
            channelPath: "",
            currentPage: 0,
            totalPage: 0,
            article_list: [
              {
                id: 1,
                userId: 1,
                channelName: "综合",
                commentCount: 0,
                description: "子标题",
                contributeTime: "发表时间",
                userName: "zhou",
                viewCount: 153,
                title: "标题"
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    // this.getChannel();
    this.getRecommend();
  },
  computed: {},
  methods: {
    latestRecommend() {
      api
        .getArticleRecommendLatest$(item.id, {
          params: { pageNum: 1, pageSize: 5 }
        })
        .then(res => {
          item.currentPage = res.data.data.pageNum;
          item.totalPage = res.data.data.totalPage;
          item.article_list = res.data.data.list;
        });
    },
    // getRecommend() {
    //   // let getArticleRecommend = "getArticleRecommend";
    //   // let RecommendLatest = "getArticleRecommendLatest";
    //   // let list = JSON.parse(sessionStorage.getItem("channelList"));
    //   // console.log(list);
    //   let list = this.recommend.channel_list;
    //   list.map(item => {
    //     api
    //       .getArticleRecommend$(item.id, {
    //         params: { pageNum: 1, pageSize: 5 }
    //       })
    //       .then(res => {
    //         item.currentPage = res.data.data.pageNum;
    //         item.totalPage = res.data.data.totalPage;
    //         item.article_list = res.data.data.list;
    //       });
    //   });
    //   this.recommend.channel_list = list;
    // },
    getRecommend() {
      let channel_list = store.getters.channels;
      // debugger;
      channel_list.map(item => {
        item.currentPage = 0;
        item.totalPage = 0;
        item.article_list = [];
        item.article_list.map(item => {
          // debugger;
          api
            .getArticleRecommend$(item.id, {
              params: { pageNum: 1, pageSize: 5 }
            })
            .then(res => {
              item.currentPage = res.data.data.pageNum;
              item.totalPage = res.data.data.totalPage;
              item.article_list = res.data.data.list;
            });
        });
      });
      this.recommend.channel_list = channel_list;
    },
    changeRecommend(item) {
      if (item.currentPage == item.totalPage) {
        Notification({
          title: "阿哦",
          message: "没有更多内容了哦,快去投稿吧!",
          type: "info"
        });
      }
      item.currentPage = (item.currentPage % item.totalPage) + 1;
      // debugger;
      api
        .getArticleRecommend$(item.id, {
          params: { pageNum: item.currentPage, pageSize: 5 }
        })
        .then(res => {
          item.article_list = res.data.data.list;
        });
    },
    // getChannel() {
    //   if (sessionStorage.getItem("channelList") != null) {
    //     return;
    //   } else {
    //     api.getChannelList().then(res => {
    //       var list = res.data.data.list;
    //       list.map(item => {
    //         item.currentPage = 0;
    //         item.totalPage = 0;
    //         item.article_list = [];
    //         // this.getRecommend(item);
    //       });
    //       this.recommend.channel_list = list;
    //     });
    //   }
    // },
    goTo(aid, uid) {
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
    }
  }
};
</script>

<style>
.ACsection {
  display: flex;
  position: relative;
}
.articleBlockLeft {
  padding-top: 40px;
  width: 800px;
  overflow: hidden;
  margin-right: auto;
}
.articleLeftTitle {
  font-size: 20px;
  color: red;
  line-height: 22px;
  padding-bottom: 16px;
  border-bottom: 1px #e5e5e5 solid;
}
.articleLeftTitle a {
  text-decoration: none;
  outline: none;
  color: black;
  padding: 0 10px;
  padding-bottom: 14px;
}
.activeTab {
  border-bottom: 3px red solid;
}
.dynamicsUpdateTitle {
  margin: 30px 0;
}
.dynamicsUpdateTitle span {
  font-size: 20px;
  line-height: 24px;
  padding-left: 10px;
  border-left: 3px red solid;
}
.dynamicsUpdateChange {
  margin-left: 20px;
}
.dynamicsUpdateTitle .dynamicsUpdateChange span {
  font-size: 14px;
  color: #555;
  margin-left: 8px;
  border: none;
}
.Rotation {
  transform: rotate(270deg);
}
.article-list {
  width: 800px;
  margin-bottom: 50px;
}
.article-list .article-item {
  position: relative;
  height: 80px;
}
.article-list .article-item .atc-left {
  width: 70px;
  text-align: right;
}
.article-list .article-item .atc-left .comm-count {
  margin: 0 0 4px 4px;
  font-weight: bold;
  font-size: 20px;
  color: #fd4c5b;
  letter-spacing: 0;
  line-height: 20px;
}
.article-list .article-item .atc-left .comm-tt {
  font-size: 12px;
  color: #999;
  letter-spacing: 0;
  line-height: 12px;
}
.article-item .atc-right {
  width: 705px;
  margin-left: 20px;
}
.article-list hr {
  background-color: #e6e6e6;
  height: 1px;
  border: none;
  margin: 20px 0;
}
.article-list .article-item .atc-right .act-cont-top {
  width: 705px;
}
.article-list .article-item .atc-right .act-cont-top .atc-title {
  max-width: 630px;
  font-weight: bold;
  font-size: 14px;
}
.article-list .article-item .atc-right .atc-content span {
  width: 685px;
  overflow: hidden;
  color: #999;
  font-size: 12px;
}
.atc-info {
  font-size: 12px;
  color: #999;
  letter-spacing: 0;
  margin-top: 21px;
  line-height: 14px;
}
.atc-info .act-info-mg {
  font-size: 12px;
  margin-right: 20px;
  color: #999;
}
.atc-info .atc-up {
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dynamicsUpdateChange:hover {
  cursor: pointer;
}
</style>