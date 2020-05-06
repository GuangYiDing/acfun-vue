<template>
  <div class="header-bar">
    <div class="logo">
      <a href="/">
        <img src="https://cdn.aixifan.com/acfun-pc/2.8.36/img/logo.png" alt />
      </a>
    </div>
    <div class="search">
      <!-- <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>-->
    </div>
    <div class="user" v-if="userInfo.token!=''">
      <ul>
        <li @click="goProfile()">
          <el-tooltip effect="dark" content="个人中心" placement="left">
            <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
          </el-tooltip>
        </li>
        <li>{{userInfo.name}}</li>
        <li>
          <el-button type="text" size="small" @click="goPost" v-if="userInfo.token">
            <i class="el-icon-s-promotion"></i>
            投稿
          </el-button>
        </li>
        <li>
          <el-button type="text" size="small" @click="logout">退出</el-button>
        </li>
      </ul>
    </div>
    <div class="logindiv" v-else>
      <el-link type="primary" @click="login">登录/注册</el-link>
      <el-link type="primary" @click="goPost">
        <i class="el-icon-s-promotion"></i>
        投稿
      </el-link>
      <!-- <el-button size="mini" round type="primary" @click="login">登录</el-button>
      <el-button size="mini" round @click="login">注册</el-button>-->
    </div>
  </div>
</template>
<script>
import api from "../axios/index";
import jwtDecode from "jwt-decode";
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  inject: ["reload"],
  watch: {
    $route: "checkReload"
  },
  methods: {
    checkReload() {
      if (this.$route.name === "User") {
        this.reload();
      }
    },
    check() {
      if (this.$store.getters.userInfo.token != "") {
        return true;
      } else {
        this.$message.error("先登录才能投稿哦!");
        return false;
      }
    },

    goProfile() {
      if (this.check()) {
        var decode = jwtDecode(this.$store.getters.userInfo.token);
        this.$emit("getActiveTab", "profile");
        this.$router.push({
          path: "/u",
          query: {
            info: this.$Base64.encode(
              JSON.stringify({
                uid: decode.userId
              })
            )
          }
        });
      }
    },
    goPost() {
      if (this.check()) {
        var decode = jwtDecode(this.$store.getters.userInfo.token);
        this.$emit("getActiveTab", "post");
        this.$router.push({
          path: "/u",
          query: {
            info: this.$Base64.encode(
              JSON.stringify({
                uid: decode.userId
              })
            )
          }
        });
      }
    },
    login() {
      this.$router.push({ name: "login" });
    },
    logout() {
      api.getLogout().then(res => {
        sessionStorage.removeItem("userInfo");
        this.$store.commit("mutationsUserInfo", {
          name: "",
          token: ""
        });
        this.$message.success("退出成功!");
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>
<style >
.header-bar {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100vw;
  height: 2.5vw;
  padding: 5px;
  font-size: 12px;
}
.header-bar > div {
  padding: 5px;
}
.search input {
  height: 32px;
  width: 316px;
}
.logindiv {
  width: 220px;
  text-align: center;
  line-height: 28px;
}
.logindiv > a {
  margin: 0 5px;
}
.user ul::after {
  display: block;
  content: "";
  clear: both;
}
.user li {
  height: inherit;
  line-height: 32px;
  padding: 0 5px;
  float: left;
}
.el-avatar:hover {
  cursor: pointer;
}
</style>