<template>
  <div class="quill">
    <quill-editor
      v-model="qlContent"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      qlContent: this.content,
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
  watch: {
    qlContent() {
      this.emitContent();
    },
    content() {
      this.qlContent = this.content;
      this.onEditorFocus();
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }

    // qlContent() {
    //   return this.content;
    // }
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
    emitContent() {
      this.$emit("loadContent", this.qlContent);
    }
  }
};
</script>

<style>
.quill {
  position: relative;
  margin-top: 30px;
}
.ql-container {
  /* float: right; */
  min-height: 200px;
}
.ql-blank,
.ql-editor {
  height: 12vw;
}
</style>