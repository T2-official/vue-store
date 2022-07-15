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
    getCategory() {
      this.$axios
        .post("/api/product/getCategory", {})
        .then(res => {
          const val = {
            category_id: 0,
            category_name: "全部"
          };
          const cate = res.data.category;
          cate.unshift(val);
          this.categoryList = cate;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getData() {
      const api =
        this.categoryID.length == 0
          ? "/api/product/getAllProduct"
          : "/api/product/getProductByCategory";
      this.$axios
        .post(api, {
          categoryID: this.categoryID,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.product = res.data.Product;
          this.total = res.data.total;
        }).catch(err => {
          return Promise.reject(err);
        });
    },
    getProductBysearch() {
      this.$axios
        .post("/api/product/getProductBy", {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  },
}
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}

/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}

.goods .breadcrumb {
  height: 50px;
  background-color: white;
}

.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}

/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}

.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}

.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}

/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}

.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}

.goods .main .pagination {
  height: 50px;
  text-align: center;
}

.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}

/* 主要内容区CSS END */
</style>