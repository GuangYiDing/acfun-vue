<template>
  <div class="comments">
    <div v-if="this.data.totalPage == 0">
      <div class="no-comments" style="margin:5px 0px;">目前尚未有评论</div>
    </div>
    <div v-if="this.$store.getters.userInfo.token == ''" class="area-comment-login">
      <el-button @click="goLogin" size="mini" type="primary" style="margin-right:8px;">登录</el-button>后才能评论哦~
    </div>
    <div v-else>
      <Quill @loadContent="setContent" :content="this.newComm.content" />
      <div class="comm-button">
        <el-button type="primary" @click="postComment" size="mini">发布</el-button>
        <el-button @click="resetComment" size="mini">重置</el-button>
      </div>
    </div>
    <div style="margin:10px 0px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="data.total"
        :hide-on-single-page="data.totalPage <= 1"
        :page-size.sync="data.pageSize"
        :page-count="data.totalPage"
        :current-page="data.pageNum"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="area-comment" v-for="k in noParentComm" :key="k.id">
      <div class="area-comment-top clearfix">
        <div class="area-comment-first clearfix">
          <div class="area-comment-left">
            <a target="_blank" href class="thumb">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </a>
          </div>
          <div class="area-comment-right" style="margin-left: 88px;">
            <div class="area-comment-title">
              <a target="_blank" href class="name">{{k.userName}}</a>
              <img class="area-up-college" style="display: none;" />
              <span class="time_day">发表于</span>
              <span class="time_times">{{k.timestamp.substr(5,11)}}</span>
              <span class="area-comment-floor fr index-comment">#{{k.floor}}</span>
            </div>
            <div class="ql-editor ql-snow">
              <div class="area-comment-des" v-html="k.content"></div>
            </div>
            <div class="area-comment-tool">
              <!-- <a class="area-comment-up">赞</a> -->
              <a class="area-comment-reply" @click="reply(k.id,k.pid,k.userName)">回复</a>
              <span class="area-comment-more"></span>
            </div>
          </div>
        </div>
        <div
          class="area-sec-close clearfix"
          v-for="k2 in hasParentComm"
          :key="k2.id"
          v-show="k.id==k2.pid"
        >
          <div class="area-comment-sec clearfix">
            <div class="area-comment-left" style="max-width: 5%; height: 30px;">
              <a target="_blank" class="thumb">
                <el-avatar
                  icon="el-icon-user-solid"
                  style="width: 30px; height: 30px;line-height:30px;"
                ></el-avatar>
              </a>
            </div>
            <div class="area-comment-right" style="margin: 0px 10px 0px 40px;">
              <div class="area-comment-title" style="line-height: 20px;">
                <a class="name" style="font-weight: bold; color: rgb(51, 51, 51);">{{k2.userName}}</a>
                <img class="area-up-college" style="display: none;" />
                <span class="time_day">发表于</span>
                <span class="time_times">{{k2.timestamp.substr(5,11)}}</span>
                <span class="area-comment-floor fr index-comment">#{{k2.floor}}</span>
              </div>
              <div class="ql-editor ql-snow">
                <div class="area-comment-des" style="margin: 10px 0px 12px;" v-html="k2.content"></div>
              </div>
              <div class="area-comment-tool">
                <!-- <a class="area-comment-up">赞</a> -->
                <a class="area-comment-reply" @click="reply(k2.id,k2.pid,k2.userName)">回复</a>
              </div>
            </div>
          </div>
          <!-- <div class="area-sec-more" style="display: none;">
            <span>共 1 条回复,</span>
            <span class="area-sec-seemore">点击查看</span>
          </div>-->
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios/index";
import Jwtdecode from "jwt-decode";
import Quill from "./Quill";
export default {
  name: "Comments",
  props: ["data"],
  inject: ["reload"],
  components: {
    Quill
  },
  data() {
    return {
      // noParentComm: [],
      // hasParentComm: []
      newComm: {
        id: null,
        content: "",
        floor: 1,
        timestamp: "",
        articleId: 0,
        userId: 0,
        pid: 0
      },
      replyComm: {
        isReply: false,
        pid: 0
      }
    };
  },
  created() {
    // this.getComments();
  },
  computed: {
    noParentComm: function() {
      var me = this;
      return this.data.list.filter(function(item) {
        return item.pid == 0;
      });
    },
    hasParentComm: function() {
      var me = this;
      return this.data.list
        .filter(function(item) {
          return item.pid != 0;
        })
        .reverse();
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ path: "/login" });
    },
    handleCurrentChange() {},
    postComment() {
      let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
      this.newComm.articleId = params.aid;
      if (this.data.list.length != 0) {
        this.newComm.floor = this.data.list.length + 1;
      }
      this.newComm.userId = Jwtdecode(
        this.$store.getters.userInfo.token
      ).userId;

      if (this.replyComm.isReply && this.newComm.content.substr(3, 1) == "@") {
        this.newComm.pid = this.replyComm.pid;
      } else {
        this.replyComm.isReply = false;
      }
      this.newComm.timestamp = new Date();

      api.postComm({ data: JSON.stringify(this.newComm) }).then(res => {
        this.$message.success(res.data.message);
        this.reload();
      });
    },
    resetComment() {
      this.newComm.content = "";
    },
    setContent(val) {
      this.newComm.content = val;
    },
    reply(id, pid, userName) {
      this.newComm.content = "@" + userName + ": ";
      this.replyComm.isReply = true;
      if (pid != 0) {
        this.replyComm.pid = pid;
      } else {
        this.replyComm.pid = id;
      }
    }
  }
};
</script>

<style>
.comments {
  margin-top: 30px;
  width: 800px;
  position: relative;
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
a:hover {
  color: #fd4c5d;
}
.vhcenter {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/banner_c0bc9e3.css */
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
/*! CSS Used from: https://cdnfile.aixifan.com/static/css/content_2056a49.css */
section div span {
  display: inline-block;
  vertical-align: middle;
}
/*! CSS Used from: Embedded */
.area-comment-top {
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 18px;
}
.area-comment-top hr {
  border: 1px solid #e6e6e6;
  border-bottom: 0;
  width: 100%;
  margin: 3px 0;
}
.area-comment-left {
  width: 7%;
  height: 50px;
  float: left;
  left: 10px;
  bottom: -5px;
  margin-top: -5px;
  position: relative;
}
.area-comment-left .thumb {
  position: relative;
  border: none;
  background: 0;
  margin: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  display: block;
}
.area-comment-left .avatar {
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
  border: 1px solid #fff;
  box-shadow: 0 0 0 transparent;
  border-radius: 50%;
}
.area-comment-right {
  margin-left: auto;
}
.area-comment-title {
  height: 20px;
  line-height: 25px;
}
.area-comment-title .name {
  color: #333;
  font-size: 12px;
}
.area-comment-title .name:hover {
  color: #fd4c5c;
}
.area-comment-title .time_day,
.area-comment-title .time_times {
  font-size: 12px;
  color: #999;
  margin-left: 5px;
}
.area-comment-des {
  color: #333;
  font-size: 14px;
  margin: 8px 0 13px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  line-height: 1.38;
}
.area-comment-tool {
  clear: both;
  font-size: 12px;
  color: #999;
  margin-bottom: 18px;
}
.area-comment-more {
  display: block;
  width: 13px;
  height: 13px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAAXNSR0IArs4c6QAAAatJREFUaAXtWrttw0AMzSVTBKpSZ4sgY7hzBHXZR1DcZQO1gUdQ5xGMjHF5BHSdcnqESMgwqIaA+I7keyffh3B6cHpyzmkYhg/YI1K8zmkuKaVT27ZfsNkjdfII2vf9Mwr+Bpm3pfjwneE7dF33u+Tf8u5xy+ClsTIzNTIyRojOGHNBn5aK2vKuaZoWBX8SMV6mabqO4zgRWBriMUPym6EeEKexVECAzAkhZlkAmBo0WCaeCyEqsRfIY4YuimI1WCqsOSGsXicqM0AaLB2TBbI4Wbaxof7I0lwbAzJnbLDvsKYbrMcMgUs+SMH/ERLfjDElI/nMN7ZCAgXvcvQp+cOGAqFAKBAKhAJ7KHB3G6sLoegpGH6b0VNYExOHUrpPoMGu5S1+8+sDAmv6BBpsqblqPQhVE3o7PQhp+gQaLKWFOSHcRqOnQElPgjxmCItX9BRI/QMWCoQCoUAoEArctgIuV3ChjNPCLs16F0LRUzD8iqOnsCampk+gwa7lLX7z6wMCa/oEGmypuWo9CFUTejs9CGn6BBospYU5oegpxP8U6l+ey0lBUu519PkDYZMbtw2vhgIAAAAASUVORK5CYII=);
  background-size: 13px 13px;
  cursor: pointer;
  float: right;
}
.area-comment-more:hover {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAAXNSR0IArs4c6QAAAZdJREFUaAXtWEFug0AM7PKLvCFHEA9AeUZu6bPaW55R5QEIjnlDfwG1q10pl03G6VhIqZEiEpi1PWPAZNKb07aua+r7/n1ZlpOk2Oc016ZpPsdx/EgprR6pk0fQtm13Evcsn6ES/yLHj/M8f1fOP324eXplZaF2Rk7dI6Mrleg5Y/U3baMT0stMqqt15rbwIWNvj/35O51QvmegwixYKKCA6IQkZnkAIDVYsEg8F0JQYi+QR4euhmItWCgsnZDOGSizgCxYNCZ9DumjuOu6LylgeFDEZZqmA3vA0juUCzwKGR2ete13sLLJaDJ6hwqDrV59Sv7YhwKhQCgQCoQCWyjwcoPVhVB4CsRrk/5yGp4CsTsait4hiWnxCSxYiLoHISixF8iDkMUnsGAhDeiELD6BBQuxERB9DoWngEoP4ugdKnnDUyhKxD4UCAVCgVDgPynwcoPVhVB4CsR7gv73ITwFYnc0FL1DEtPiE1iwEHUPQlBiL5AHIYtPYMFCGtAJWXwCCxZiIyD6HApPAZUexNE7VPJu5Sn8AEkzxO0Vf8bKAAAAAElFTkSuQmCC);
  background-size: 13px 13px;
}
.area-comment-reply,
.area-comment-up {
  text-align: center;
  margin-right: 13px;
}
.area-comment-reply {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY29uX2NvbW1lbnRfcGw8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iaWNvbl9jb21tZW50X3BsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iaWNvbl/mlofnq6Dor4TorrotY29weS0yIiBmaWxsPSIjOTk5OTk5IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNNC4wNzAwMjc0NywxMiBMMC42MzczNjA1NjQsMTIuOTgwNzYyIEMwLjMxNzk1MjQ2MSwxMy4wNzIwMjE0IDAsMTIuODMyMTg5NCAwLDEyLjUgTDAsNCBDMCwyLjcyMzg1NzYzIDAuNzIzODU3NjI1LDIgMiwyIEwxMSwyIEMxMi4yNzYxNDI0LDIgMTMsMi43MjM4NTc2MyAxMyw0IEwxMywxMCBDMTMsMTEuMjc2MTQyNCAxMi4yNzYxNDI0LDEyIDExLDEyIEw0LjA3MDAyNzQ3LDEyIFogTTksNSBDOC40NDc3MTUyNSw1IDgsNS40NDc3MTUyNSA4LDYgTDgsNyBDOCw3LjU1MjI4NDc1IDguNDQ3NzE1MjUsOCA5LDggQzkuNTUyMjg0NzUsOCAxMCw3LjU1MjI4NDc1IDEwLDcgTDEwLDYgQzEwLDUuNDQ3NzE1MjUgOS41NTIyODQ3NSw1IDksNSBaIE00LDUgQzMuNDQ3NzE1MjUsNSAzLDUuNDQ3NzE1MjUgMyw2IEwzLDcgQzMsNy41NTIyODQ3NSAzLjQ0NzcxNTI1LDggNCw4IEM0LjU1MjI4NDc1LDggNSw3LjU1MjI4NDc1IDUsNyBMNSw2IEM1LDUuNDQ3NzE1MjUgNC41NTIyODQ3NSw1IDQsNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
    no-repeat;
  background-size: 13px 13px;
  background-position: 0 1px;
  padding-left: 17px;
  color: #999;
}
.area-comment-up {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY29uX2NvbW1lbnRfejwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJpY29uX2NvbW1lbnRfeiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9InphbjEiIGZpbGw9IiM5OTk5OTkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjUsMyBDMi4zMjg0MjcxMiwzIDMsMy42NzE1NzI4OCAzLDQuNSBMMywxMC41IEMzLDExLjMyODQyNzEgMi4zMjg0MjcxMiwxMiAxLjUsMTIgQzAuNjcxNTcyODc1LDEyIDEuNTU0MzEyMjNlLTE1LDExLjMyODQyNzEgLTEuMTEwMjIzMDJlLTE2LDEwLjUgTC0xLjExMDIyMzAyZS0xNiw0LjUgQy0xLjExMDIyMzAyZS0xNiwzLjY3MTU3Mjg4IDAuNjcxNTcyODc1LDMgMS41LDMgWiIgaWQ9IlJlY3RhbmdsZS0xNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTAuNzI0Njg3NSwzLjg5NjQzNDI0IEMxMi4xNzUyNzM5LDMuODk2NDM0MjQgMTMuMjkwNjc2Nyw1LjI4MTY0OTIgMTIuOTM3NTY1Miw2LjQ3MTUxNTkgTDExLjg1NDEwMjcsMTAuMTIyNDE4MyBDMTEuNDE0OTkyNSwxMS42MDIwNzEzIDEwLjkxODg0OTgsMTIgOS40MjQ1MzI1OCwxMiBMNC41LDEyIEM0LjIyMzg1NzYzLDEyIDQsMTEuNzc2MTQyNCA0LDExLjUgTDQsNC4zNSBDNCw0LjE4MDExMDQzIDQuMDg2MjY1NDEsNC4wMjE4NDQzMSA0LjIyOTA0NzMzLDMuOTI5NzgwMjQgTDUuMjM4MDAzODIsMy4yODA5MTY0NSBDNS41NjY5MDY4NiwzLjAzMTc2Mjg3IDUuNzkzNTMxMDIsMi43NDE0OTM3MyA1Ljk1MzY0MjQ5LDIuMzk1MDE4OTggQzYuMDkyOTI0MTksMi4wOTM2MTkwMiA2LjEyMjA3MDY5LDEuOTgxNjQyMjYgNi4yNzc0ODI4OCwxLjI1OTk1OTU2IEM2LjQ4OTkzNzgsMC4yNzMzODkzNDcgNi44NjM3MzY2OSwtMC4xNjExNDk5NjggNy43OTc0MTA0NiwwLjA0MjIyODg2MTYgQzkuMjg0MjE3OTgsMC4zNjYwOTQ4NDUgOS41NzE5NDQ1MSwxLjczNDE4MTczIDguODQzMDE1OTksMy44OTY0MzQyNCBMMTAuNzI0Njg3NSwzLjg5NjQzNDI0IFoiIGlkPSJQYXRoLTQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
    no-repeat;
  background-size: 13px 13px;
  background-position: 1px 1px;
  padding-left: 20px;
  color: #999;
}
.area-comment-up:hover {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY29uX2NvbW1lbnRfel9ob3ZlcjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJpY29uX2NvbW1lbnRfel9ob3ZlciIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9InphbjMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAtMS4wMDAwMDApIiBmaWxsPSIjRkQ0QzVDIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMS41LDQgQzIuMzI4NDI3MTIsNCAzLDQuNjcxNTcyODggMyw1LjUgTDMsMTEuNSBDMywxMi4zMjg0MjcxIDIuMzI4NDI3MTIsMTMgMS41LDEzIEMwLjY3MTU3Mjg3NSwxMyAxLjY2NTMzNDU0ZS0xNSwxMi4zMjg0MjcxIDAsMTEuNSBMMCw1LjUgQzAsNC42NzE1NzI4OCAwLjY3MTU3Mjg3NSw0IDEuNSw0IFoiIGlkPSJSZWN0YW5nbGUtMTUiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTEwLjcyNDY4NzUsNC44OTY0MzQyNCBDMTIuMTc1MjczOSw0Ljg5NjQzNDI0IDEzLjI5MDY3NjcsNi4yODE2NDkyIDEyLjkzNzU2NTIsNy40NzE1MTU5IEwxMS44NTQxMDI3LDExLjEyMjQxODMgQzExLjQxNDk5MjUsMTIuNjAyMDcxMyAxMC45MTg4NDk4LDEzIDkuNDI0NTMyNTgsMTMgTDQuNSwxMyBDNC4yMjM4NTc2MywxMyA0LDEyLjc3NjE0MjQgNCwxMi41IEw0LDUuMzUgQzQsNS4xODAxMTA0MyA0LjA4NjI2NTQxLDUuMDIxODQ0MzEgNC4yMjkwNDczMyw0LjkyOTc4MDI0IEw1LjIzODAwMzgyLDQuMjgwOTE2NDUgQzUuNTY2OTA2ODYsNC4wMzE3NjI4NyA1Ljc5MzUzMTAyLDMuNzQxNDkzNzMgNS45NTM2NDI0OSwzLjM5NTAxODk4IEM2LjA5MjkyNDE5LDMuMDkzNjE5MDIgNi4xMjIwNzA2OSwyLjk4MTY0MjI2IDYuMjc3NDgyODgsMi4yNTk5NTk1NiBDNi40ODk5Mzc4LDEuMjczMzg5MzUgNi44NjM3MzY2OSwwLjgzODg1MDAzMiA3Ljc5NzQxMDQ2LDEuMDQyMjI4ODYgQzkuMjg0MjE3OTgsMS4zNjYwOTQ4NSA5LjU3MTk0NDUxLDIuNzM0MTgxNzMgOC44NDMwMTU5OSw0Ljg5NjQzNDI0IEwxMC43MjQ2ODc1LDQuODk2NDM0MjQgWiIgaWQ9IlBhdGgtNCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)
    no-repeat;
  background-size: 13px 13px;
  background-position: 1px 1px;
  color: #fd4c5c;
}
.area-comment-reply:hover {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY29uX2NvbW1lbnRfcGxfaG92ZXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iaWNvbl9jb21tZW50X3BsX2hvdmVyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iaWNvbl/mlofnq6Dor4TorrotY29weS0iIGZpbGw9IiNGRDRDNUMiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00LjA3MDAyNzQ3LDEyIEwwLjYzNzM2MDU2NCwxMi45ODA3NjIgQzAuMzE3OTUyNDYxLDEzLjA3MjAyMTQgMCwxMi44MzIxODk0IDAsMTIuNSBMMCw0IEMwLDIuNzIzODU3NjMgMC43MjM4NTc2MjUsMiAyLDIgTDExLDIgQzEyLjI3NjE0MjQsMiAxMywyLjcyMzg1NzYzIDEzLDQgTDEzLDEwIEMxMywxMS4yNzYxNDI0IDEyLjI3NjE0MjQsMTIgMTEsMTIgTDQuMDcwMDI3NDcsMTIgWiBNOSw1IEM4LjQ0NzcxNTI1LDUgOCw1LjQ0NzcxNTI1IDgsNiBMOCw3IEM4LDcuNTUyMjg0NzUgOC40NDc3MTUyNSw4IDksOCBDOS41NTIyODQ3NSw4IDEwLDcuNTUyMjg0NzUgMTAsNyBMMTAsNiBDMTAsNS40NDc3MTUyNSA5LjU1MjI4NDc1LDUgOSw1IFogTTQsNSBDMy40NDc3MTUyNSw1IDMsNS40NDc3MTUyNSAzLDYgTDMsNyBDMyw3LjU1MjI4NDc1IDMuNDQ3NzE1MjUsOCA0LDggQzQuNTUyMjg0NzUsOCA1LDcuNTUyMjg0NzUgNSw3IEw1LDYgQzUsNS40NDc3MTUyNSA0LjU1MjI4NDc1LDUgNCw1IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)
    no-repeat;
  background-size: 13px 13px;
  background-position: 0 1px;
  color: #fd4c5c;
}
.area-comment-floor {
  color: #999;
  font-size: 12px;
  position: relative;
  top: 0;
  right: 10px;
}
.area-sec-close {
  padding-top: 20px;
  clear: both;
  padding: 20px 0 0;
  background: #f7f7f7;
  margin-left: 73px;
  height: auto;
}
.area-comment-login {
  height: 100px;
  background: #f7f7f7;
  border-radius: 0 0 3px 3px;
  text-align: center;
  line-height: 100px;
  margin: 20px 0;
  position: relative;
  color: #666;
  font-size: 12px;
}
.no-comments {
  font-size: 12px;
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
  border: 1px solid #bce8f1;
}
.comm-button {
  text-align: right;
  margin: 10px 0px;
}
.area-comment .ql-editor {
  height: 100%;
}
</style>