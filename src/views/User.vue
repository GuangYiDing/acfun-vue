<template>
  <div class="user">
    <header-bar @getActiveTab="setActiveTab" />
    <div class="main">
      <el-tabs tab-position="left" :value="activeTab">
        <el-tab-pane label="个人信息" name="profile">
          <span slot="label">
            <i class="el-icon-user"></i>
            编辑资料
          </span>
          <profile :user-id="userId" />
        </el-tab-pane>
        <el-tab-pane label="文章投稿" name="post">
          <span slot="label">
            <i class="el-icon-edit"></i>
            文章投稿
          </span>
          <post :user-id="userId" />
        </el-tab-pane>
        <el-tab-pane label="投稿管理" name="history">
          <span slot="label">
            <i class="el-icon-folder-opened"></i>
            投稿管理
          </span>
          <manage :user-id="userId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import HeaderBar from "../components/HeaderBar.vue";
import Profile from "../components/Profile";
import Manage from "../components/Manage";
import jwtDecode from "jwt-decode";
export default {
  name: "User",
  components: {
    Post,
    HeaderBar,
    Profile,
    Manage,
    jwtDecode
  },
  inject: ["reload"],
  watch: {
    $route: "checkReload"
  },
  mounted() {
    this.check();
  },
  data() {
    return {
      activeTab: "profile"
    };
  },
  computed: {
    userId() {
      let token = jwtDecode(this.$store.getters.userInfo.token);
      return token.userId;
    }
  },
  methods: {
    check() {
      if (this.$store.getters.userInfo.token == "") {
        this.$message.error("未登录!");
        this.$router.push({ path: "/" });
      }
    },
    setActiveTab(activeTab) {
      this.activeTab = activeTab;
      this.$message.success("传值成功!");
    },
    checkReload() {
      if (this.$route.name === "User") {
        this.reload();
      }
    }
  }
};
</script>

<style>
.user {
  position: relative;
  height: 100%;
}
.main {
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 30px;
  border-left: 2px #e4e7ed solid, 2px #e4e7ed solid, 2px #e4e7ed solid,
    2px #e4e7ed solid;
}
</style>