<template>
  <div class="shop">
    <span class="logo">
      <img :src="shop.logo">
    </span>
    <span class="shop-name">
      <div class="name">{{shop.name}}</div>
      <div class="shop-name-item">粉丝数：{{shop.fans}}</div>
      <div class="shop-name-item">商品数：{{shop.goodsCount}}</div>
      <div class="shop-name-item">总销量：{{shop.sells}}</div>
    </span>
    <span class="shop-score">
      <table>
        <tr v-for="item in shop.score">
          <td>{{item.name}}</td>
          <td class="better-ss" :class="{'better-s': item.isBetter}">{{item.score}}</td>
          <td class="better-tt" :class="{'better-t': item.isBetter}">{{item.isBetter?'高':'低'}}</td>
        </tr>
      </table>
    </span>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
      shop: {
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .shop{
    display: flex;
    height: 100px;
    padding: 12px 4px;
    align-items: center;

    border-width: 2px 0px ;
    border-style: solid;
    border-color: rgba(100,100,100,0.1);
  }
  .logo{
    width: 80px;
    align-items: center;
  }
  .logo img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #999;
    margin-left: 8px;
  }
  .shop-name {
    flex: 1;
  }
  .shop-name .name{
    font-size: 18px;
    padding: 1px 0;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .shop-name-item{
    font-size: 6px;
    color: #999;
    margin-left: 4px;
  }
  .shop-score {
    width: 143px;
  }
  .shop-score table{
    margin-left: 2px;
  }
  .shop-score table td{
    padding: 1px;
  }
  .shop-other {
    display: flex;
    margin: 8px 0;
    text-align: center;
  }
  .shop-other span{
    flex: 1;
  }

  .better-ss{
    color: #5ea732;
  }
  .better-s {
    color:  #f13e3a;
  }

  .better-tt{
    background-color: #5ea732;
    color: #fff;
  }
  .better-t {
    background-color:  #f13e3a;
  }

</style>
