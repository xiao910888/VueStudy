<template>
  <div class="bottom-bar">
    <div class="left">
      <div class="shop">
        <i></i>
        <div class="text">店铺</div>
      </div>
      <div class="service">
        <i></i>
        <div class="text">客服</div>
      </div>
      <div class="select">
        <i></i>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      addToCart(){
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background: #fff;
    position: relative;
    z-index: 11;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid rgba(100,100,100,.1);
  }
  .left{
    display: flex;
    width: 147px;
  }
  .left>div{
    flex: 1;
  }
  .left i{
    display: block;
    width: 20px;
    height: 20px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .text{
    font-size: 11px;
    text-align: center;
    color: #999;
  }
  .shop i{
    background-position:0 -90px;
  }
  .service i{
    background-position:0 -48px;
  }
  .select i{

  }
  .right{
    display: flex;
    flex: 1;
  }
  .right .cart{
    flex: 1;
    background-color: #ffecef;
    color: #ff498b;
  }
  .right .buy{
    flex: 1;
    background-color: #ff498b;
    color: #ffecef;
  }
  .right div{
    text-align: center;
    line-height: 49px;
    font-size: 15px;
  }
</style>
