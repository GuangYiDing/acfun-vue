<template>
  <div class="profile">
    <el-form
      :model="updateUesr"
      :rules="rules"
      ref="postForm"
      label-width="100px"
      label-position="right"
    >
      <el-form-item label="个性签名">
        <el-input v-model="updateUesr.signature" placeholder="..." maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateUesr.email" placeholder="输入你的邮箱" type="email"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="updateUesr.gender" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
          <el-option label="不告诉你" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="updateUesr.password" placeholder="输入你的新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">更新</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "../axios/index";
import jwtDecode from "jwt-decode";
export default {
  inject: ["reload"],
  props: ["userId"],
  data() {
    return {
      updateUesr: {
        id: 0,
        signature: "",
        email: "",
        gender: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        gender: [
          { required: true, message: "请选择你的性别", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.getUser();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postUser();
        } else {
          this.$message.error("填写完整才能提交");
          return false;
        }
      });
    },
    confirm() {
      var _this = this;
      this.$confirm("此操作将更新你的个人信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.postUser();
        })
        .catch(() => {
          this.$message.info("未完成更新");
        });
    },
    postUser() {
      this.updateUesr.id = this.userId;
      if (this.updateUesr.signature == "") {
        this.updateUesr.signature = "这个人很懒..什么都没有写..";
      }
      let user = this.updateUesr;
      api
        .postUpUpdate({
          data: JSON.stringify(user)
        })
        .then(res => {
          this.$message.success(res.data.message);
          this.reload();
        });
    },
    getUser() {
      api.getUpLoad$(this.userId).then(res => {
        var user = res.data.data;
        this.updateUesr.signature = user.signature;
        this.updateUesr.email = user.email;
        switch (user.gender) {
          case 1:
            this.updateUesr.gender = "男";
            break;
          case 0:
            this.updateUesr.gender = "女";
            break;
          case -1:
            this.updateUesr.gender = "未知";
            break;
          default:
            break;
        }
      });
    }
  }
};
</script>

<style>
.profile {
  position: relative;
}
</style>