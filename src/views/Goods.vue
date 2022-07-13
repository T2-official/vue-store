<template>
  <div class="goods" id="goods" name="goods">
    <!-- bread -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{ search }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane v-for="item in categoryList" :key="item.category_id" :label="item.category_name"
            :name="'' + item.category_id" />
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: "",// paging list
      categoryID: [],
      product: "",
      productList: "",
      total: 0,
      pageSize: 15,// paging item size
      currentPage: 1,
      activeName: "-1",// item id current selected 
      search: ""// keywords
    }
  },
  created() {
    this.getCategory();
  },
  activated() {
    this.activeName = "-1";
    this.total = 0;
    this.currentPage = 1;
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.categoryID;
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
  },
  watch: {
    activeName: function (val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        this.categoryID = [Number(val)];
      }
      this.total = 0;
      this.currentPage = 1;
      // update router
      this.$router.push({
        path: "/goods",
        query: { categoryID: this.categoryID }
      });
    },
    search: function (val) {
      if (val != "") {
        this.getProductBysearch(val);
      }
    },
    categoryID: function () {
      this.getData();
      this.search = "";
    },
    $route: function (val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
      }
    }
  },
  methods: {
    backtop() {
      const timer = setInterval(function () {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;
        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBysearch();
      } else {
        this.getData();
      }
      this.backtop();
    },
    
  },
}
</script>

<style lang="scss" scoped>
</style>