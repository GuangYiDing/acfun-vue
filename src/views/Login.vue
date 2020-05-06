<template>
  <div class="login">
    <header-bar />
    <div class="bgcover">
      <el-tabs v-model="activeTab" tab-position="top" class="card">
        <el-tab-pane label="登录" name="login">
          <el-form :model="login" :rules="rules" ref="loginForm" label-width="0px">
            <el-form-item prop="name">
              <el-input
                v-model.trim="login.name"
                placeholder="用户名"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                v-model.trim="login.pwd"
                placeholder="密码"
                type="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item prop="vcode" id="vcode">
              <el-input
                v-model.trim="login.vcode"
                placeholder="验证码"
                prefix-icon="el-icon-s-ticket"
                style="width: 55%;float: left;"
              ></el-input>
              <el-tooltip content="点击刷新" placement="bottom">
                <img
                  @click="getGifCode"
                  :src="gifCode"
                  id="img"
                  style="display: inline-block;float: right;"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item>
              <el-button round type="primary" @click="submitForm('loginForm')">登陆</el-button>
              <el-button round @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="register" :rules="rules" ref="registerFrom" label-width="0px">
            <el-form-item prop="name">
              <el-input
                v-model.trim="register.name"
                placeholder="请输入用户名"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                v-model.trim="register.pwd"
                placeholder="密码"
                type="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item prop="vcode" id="vcode">
              <el-input
                v-model.trim="register.vcode"
                placeholder="验证码"
                prefix-icon="el-icon-s-ticket"
                style="width: 55%;float: left;"
              ></el-input>
              <el-tooltip content="点击刷新" placement="bottom">
                <img
                  @click="getGifCode"
                  :src="gifCode"
                  id="img"
                  style="display: inline-block;float: right;"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item>
              <el-button round type="primary" @click="submitForm('registerFrom')">注册</el-button>
              <el-button round @click="resetForm('registerFrom')">重置</el-button>
              <!-- <el-button round @click="change">重置</el-button> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <copy-right />
  </div>
</template>

<script>
import api from "../axios/index";
import CopyRight from "../components/CopyRight";
import HeaderBar from "../components/HeaderBar";
export default {
  components: {
    CopyRight,
    HeaderBar
  },
  inject: ["reload"],
  data() {
    return {
      activeTab: "login",
      // gifCode: "http://127.0.0.1:8081/acfun-api/gifcode",
      login: {
        name: "",
        pwd: "",
        vcode: ""
      },
      register: {
        name: "",
        email: "",
        pwd: "",
        vcode: ""
      },
      rules: {
        name: [{ required: true, message: "请输用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        vcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  computed: {
    gifCode() {
      var num = Math.ceil(Math.random() * 10);
      return "/api/gifcode?" + num;
    }
  },
  methods: {
    getGifCode() {
      var num = Math.ceil(Math.random() * 10);
      document.getElementById("img").src = this.gifCode + "?" + num;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "loginForm") {
            api
              .postLogin({
                params: {
                  username: this.login.name,
                  password: this.login.pwd,
                  vcode: this.login.vcode
                }
              })
              .then(res => {
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                } else {
                  this.$message.success("登录成功~");
                  this.$store.commit("mutationsUserInfo", {
                    name: this.login.name,
                    token: res.data.data
                  });
                  this.$router.push({ name: "home" });
                }
              });
          } else {
            api
              .postUpRegister({
                params: {
                  username: this.register.name,
                  password: this.register.pwd,
                  vcode: this.register.vcode
                }
              })
              .then(res => {
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                } else {
                  this.$message.success("注册成功,请登录~");
                  this.activeTab = "register";
                  this.reload();
                }
              });
          }
        } else {
          this.$message.error("填写完整才能提交哦~");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change() {
      this.$message.success("注册成功,请登录~");
      this.activeTab = "register";
      this.reload();
    }
  }
};
</script>
<style>
.login {
  height: inherit;
  /* position: relative;
  margin: 45px 0px; */
  /* background: url(https://cdn.aixifan.com/acfun-pc/2.8.41/img/bgcover.jpg)
    no-repeat; */
}
.bgcover {
  background: url(https://cdn.aixifan.com/acfun-pc/2.8.41/img/bgcover.jpg)
    no-repeat;
  background-position: center;
  height: 618px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 450px;
  /* height: 500px; */
  border-radius: 4px;
  background-color: #ffffff;
  /* background-color: hsla(0, 0%, 100%, 0.9); */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.el-form-item {
  margin: 30px auto;
  padding: 0 20px;
}
/* #vcode > .el-input {
  position: relative;
  float: left;
  width: 300px;
}
#vcode > img {
  float: right;
} */
</style>