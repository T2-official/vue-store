<template>
  <div id="app" name="app">
    <el-container>
      <div class="topbar">
        <div class="nav">
          <ul>
            <li v-if="!this.$store.getters.getUser">
              <el-button type="text" @click="login">登录</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register = true">注册</el-button>
            </li>
            <li v-else>
              欢迎
              <el-popover placement="top">
                <p>确定退出登录吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button size="mini" type="primary" @click="logout">确定</el-button>
                </div>
                <el-button type="text" slot="reference">{{ this.$store.getters.getUser.userName }}</el-button>
              </el-popover>
            </li>
            <li>
              <router-link to="/order">我的订单</router-link>
            </li>
            <li>
              <router-link to="/collect">我的收藏</router-link>
            </li>
            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{ getNum }})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- topnav -->

      <!-- topmenu -->
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409eff"
          router>
          <!-- navigation router -->
          <div class="logo">
            <router-link to="/">
              <img src="./assets/imgs/logo.png" alt="" />
            </router-link>
          </div>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>

          <div class="so">
            <el-input placeholder="请输入搜索内容" v-model="search">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
        </el-menu>
      </el-header>
      <!-- topmenu over -->

      <!-- loggin -->
      <MyLogin></MyLogin>
      <!-- register -->
      <MyRegister :register="register" @fromChild="isRegister"></MyRegister>

      <!-- main -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>

      <el-footer>
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon1" href="javascript:;">7天无理由退换货</a>
                <a class="icon1" href="javascript:;">满99元全场免邮</a>
                <a class="icon1" href="javascript:;" style="margin-right: 0">100%品质保证</a>
              </p>
            </div>
          </div>
          <div class="github">
            <a href="https://github.com/T2-official" target="_blank">
              <div class="github-but"></div>
            </a>
          </div>
          <div class="mod_help">
            <p>
              <router-link to="/">首页</router-link>
              <span>|</span>
              <router-link to="/goods">全部商品</router-link>
              <span>|</span>
              <router-link to="/about">关于我们</router-link>
            </p>
            <p class="coty">商城版权所有 &copy; 2012-2021</p>
          </div>
        </div>
      </el-footer>
      <!-- footer over -->
    </el-container>
  </div>
</template>

<script>

</script>

<style>
</style>
