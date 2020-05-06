<template>
  <div class="manage">
    <el-table :data="data.list" style="width: 100%">
      <el-table-column prop="contributeTime" label="日期" width="100" fixed></el-table-column>
      <el-table-column prop="title" label="标题" fixed>
        <template slot-scope="scope">
          <el-link
            type="primary"
            target="_blank"
            @click="goArticle(scope.row.id)"
          >{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="简介" width="200"></el-table-column>
      <el-table-column prop="viewCount" label="浏览数" width="80"></el-table-column>
      <el-table-column prop="commentCount" label="评论数" width="80"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.total"
      :page-size="data.pageSize"
      :current-page="data.pageNum"
      :page-count="data.totalPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import api from "../axios/index";
export default {
  name: "Manage",
  props: ["userId"],
  data() {
    return {
      data: {
        pageNum: 1,
        pageSize: 5,
        totalPage: 2,
        total: 5,
        list: [
          {
            contributeTime: "2019-11-26",
            id: 1,
            channelId: 1,
            title:
              "浙大女生容留两名男生通宵在女寝室，次日5时才离开，都干了些什么",
            description: "浙大女生容留两男生通宵在女...",
            viewCount: 153,
            commentCount: 3
          }
        ]
      }
    };
  },
  mounted() {
    this.getPosted(1);
  },
  methods: {
    getPosted(pageNum) {
      api
        .getArticleManage$(this.userId, {
          params: { pageNum: pageNum, pageSize: 5 }
        })
        .then(res => {
          this.data = res.data.data;
        });
    },
    goArticle(aid) {
      this.$router.push({
        path: "/ac",
        query: {
          info: this.$Base64.encode(
            JSON.stringify({
              aid: aid,
              uid: this.userId
            })
          )
        }
      });
    },
    handleCurrentChange(pageNum) {
      this.getPosted(pageNum);
    },
    handleEdit(row, item) {},
    handleDelete(row, item) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletePosted(item.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deletePosted(aid) {
      api
        .deleteArticle({ params: { aid: aid, uid: this.userId } })
        .then(res => {
          this.getPosted(this.data.pageNum);
          this.$message.success(res.data.message);
        });
      // .catch(err => {
      //   this.$message.error(err);
      // });
    }
  }
};
</script>

<style>
.manage {
  position: relative;
}
.el-table {
  border-bottom: 1px #eeeeee solid;
  min-height: 442px;
}
.manage .el-pagination {
  margin-top: 30px;
  float: right;
}
</style>