<template>
  <div class="confirmOrder">
    <!-- header -->
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order"></i>
        </p>
        <p>确认订单</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- header end -->

    <!-- main -->
    <div class="content">
      <!-- address -->
      <div class="section-address">
        <p class="title">收货地址</p>
        <div class="address-body">
          <ul>
            <li :class="item.id == confirmAddress ? 'in-section' : ''" v-for="item in address" :key="item.id">
              <h2>{{ item.name }}</h2>
              <p class="phone">{{ item.phone }}</p>
              <p class="address">{{ item.address }}</p>
            </li>
            <li class="add-address">
              <i class="el-icon-circle-plus-outline"></i>
              <p>添加新地址</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- goods end discount-->
      <div class="section-goods">
        <p class="title">商品及优惠券</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.id">
              <img :src="$target + item.producting" />
              <span class="pro-name">{{ item.productName }}</span>
              <span class="pro-price">{{ item.price }}元 X {{ item.num }}</span>
              <span class="pro-status"></span>
              <span class="pro-total">{{ item.price * item.num }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- goods and -->

      <!-- delivery  -->
      <div class="section-shipment">
        <p class="title">配送方式</p>
        <p class="shipment">包邮</p>
      </div>
      <!-- delivery ends  -->

      <!-- receipt -->
      <div class="section-invoice">
        <p class="title">发票</p>
        <p class="invoice">电子发票</p>
        <p class="invoice">个人</p>
        <p class="invoice">商品明细</p>
      </div>
      <!-- receipt ends -->

      <!-- calculate -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{ getCheckNum }}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{ getTotalPrice }}元</span>
            </li>
            <li>
              <span class="title">活动优惠：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">优惠券抵扣：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{ getTotalPrice }}</span>元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- calculate ends -->

      <!-- pay -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/shoppingCart" class="btn-base btn-return">返回购物车</router-link>
          <a href="javascript:void(0);" @click="addOrder" class="btn-base btn-primary">结算</a>
        </div>
      </div>
      <!-- pay ends -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  scoped>
</style>