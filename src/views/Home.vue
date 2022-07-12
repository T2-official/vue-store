<template>
  <div class="home" id="home" name="home">
    <!-- swiper -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <img style="height:460px;" :src="$target + item.imgPath" :alt="item.describes" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-box">
      <div class="main">
        <!-- phone -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">手机</div>
          </div>
          <div class="box-bd">
            <div class="promp-list">
              <router-link to>
                <img :src="$target + 'public/imgs/phone/phone.png'" />
              </router-link>
            </div>
            <div class="list">
              <MyList :list="phoneList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- phone End -->

        <!-- household electric appliance -->
        <div class="appliance" id="promo-menu">
          <div class="box-hd">
            <div class="title">家电</div>
            <div class="more" id="more">
              <MyMenu :val="2" @fromChild="getChildMsg">
                <span slot="1">热门</span>
                <span slot="2">电视影音</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-hd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="$target + 'public/imgs/appliance-promo1.png'" />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="applianceList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- HEA end -->

        <!-- sundries -->
        <div class="accessory" id="promo-menu">
          <div class="box-hd">
            <div class="title">配件</div>
            <div class="more" id="more">
              <MyMenu :val="3" @fromChild="getChildMsg2">
                <span slot="1">热门</span>
                <span slot="2">保护套</span>
                <span slot="3">充电器</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="$target + 'public/imgs/accessory/accessory-promo1.png'" alt />
                </li>
                <li>
                  <img :src="$target + 'public/imgs/accessory/accessory-promo2.png'" alt />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="accessoryList" :isMore="true"></MyList>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: "", // 轮播图数据
      phoneList: "", // 手机商品列表
      miTvList: "", // 小米电视商品列表
      applianceList: "", // 家电商品列表
      applianceHotList: "", //热门家电商品列表
      accessoryList: "", //配件商品列表
      accessoryHotList: "", //热门配件商品列表
      protectingShellList: "", // 保护套商品列表
      chargerList: "", //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      accessoryActive: 1 // 配件当前选中的商品分类
    }
  },
  watch: {
    applianceActive: function (val) {
      if (this.applianceHotList == "") {
        this.applianceHotList = this.applianceList;
      }
      if (val == 1) {
        this.applianceList = this.applianceHotList;
        return;
      }
      if (val == 2) {
        this.applianceList = this.miTvList;
        return;
      }
    },
    accessoryActive: function (val) {
      // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
      // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
      if (this.accessoryHotList == "") {
        this.accessoryHotList = this.accessoryList;
      }
      if (val == 1) {
        // 1为热门商品
        this.accessoryList = this.accessoryHotList;
        return;
      }
      if (val == 2) {
        // 2为保护套商品
        this.accessoryList = this.protectingShellList;
        return;
      }
      if (val == 3) {
        //3 为充电器商品
        this.accessoryList = this.chargerList;
        return;
      }
    }
  },
  created() {
    // swiper
    this.$axios
      .post("/api/resources/carousel", {})
      .then(res => {
        this.carousel = res.data.carousel;
      })
      .catch(err => {
        return Promise.reject(err);
      });
    this.getPromo("手机", "phoneList");
    this.getPromo("电视机", "miTvList");
    this.getPromo("保护套", "protectingShellList");
    this.getPromo("充电器", "chargerList");
    this.getPromo(
      ["电视机", "空调", "洗衣机"],
      "applianceList",
      "/api/product/getHotProduct"
    );
    this.getPromo(
      ["保护套", "保护膜", "充电器", "充电宝"],
      "accessoryList",
      "/api/product/getHotProduct"
    );
  },
  methods: {
    // get data from Child Components
    getChildMsg(val) {
      this.applianceActive = val;
    },
    getChildMsg2(val) {
      this.accessoryActive = val;
    },
    getPromo(categoryName, val, api) {
      api = api != undefined ? api : "/api/product/getPromoProduct";
      this.$axios
        .post(api, {
          categoryName
        })
        .then(res => {
          this[val] = res.data.Product;
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  },
}
</script>
<style scoped>
@import "../assets/css/index.css";
</style>