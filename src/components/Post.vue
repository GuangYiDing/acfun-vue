<template>
  <div class="post">
    <el-form
      :model="postForm"
      :rules="rules"
      ref="postForm"
      label-width="100px"
      label-position="right"
    >
      <el-form-item label="稿件标题" prop="title">
        <el-input
          v-model.trim="postForm.title"
          placeholder="据老司机们说,好的标题能提高15%的点击量"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="频道" prop="channelId">
        <el-select v-model="postForm.channelId" placeholder="请选择频道">
          <el-option
            v-for="item in channel"
            :key="item.id"
            :label="item.channelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="稿件简介" prop="description">
        <el-input
          type="textarea"
          v-model.trim="postForm.description"
          placeholder="填写好简介或发表吐槽会让更多人注意到你的文章哦~"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="稿件内容" prop="contents" id="contents">
        <quill-editor
          v-model.trim="postForm.contents"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">发布</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="ql-snow">
      <div class="ql-editor" v-html="this.postForm.contents"></div>
    </div>-->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import api from "../axios/index.js";
import Jwtdecode from "jwt-decode";
export default {
  props: ["userId"],
  data() {
    return {
      postForm: {
        userId: 0,
        title: "",
        channelId: 1,
        description: "",
        contents: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "请选择频道", trigger: "change" }
        ],
        contents: [
          { required: true, message: "请填写稿件正文", trigger: "blur" }
        ]
      },
      editorOption: {
        modules: {
          toolbar: [
            // [{ size: ["small", false, "large", "huge"] }], // custom dropdown

            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            // [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscripts
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }], // text direction

            [{ color: [] }], // dropdown with defaults from theme
            // [{ font: [] }],
            [{ align: [] }],

            ["clean"],
            ["link"],
            ["image"]
          ]
        },
        placeholder: "Say what you want to say...",
        theme: "snow"
      }
    };
  },
  computed: {
    channel() {
      return JSON.parse(sessionStorage.getItem("channel_list"));
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      // alert(this.postForm.contents);
    },
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postArticle();
        } else {
          this.$message.error("请填写完整后提交");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    postArticle() {
      this.postForm.userId = this.userId;
      api.postArticlePost({ data: JSON.stringify(this.postForm) }).then(res => {
        this.$message.success(res.data.message);
        this.$router.push({ path: "/" });
        sessionStorage.removeItem("recommend_list");
      });
    }
  }
};
</script>

<style>
.post {
  position: relative;
  margin: 10px auto;

  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.el-form-item {
  margin: 0 auto;
  padding-bottom: 25px;
}
#contents {
  overflow: hidden;
  /* height: 300px; */
}
.ql-container {
  /* float: right; */
  min-height: 300px;
}
.ql-blank {
  height: 18vw;
}
.ql-formats {
  /* text-align: center; */
  line-height: 1;
}
.ql-toolbar.ql-snow {
  padding: 0 8px;
  border-bottom-style: dashed;
}
</style>