<template>
  <div class="base">
    <div class="price">
      <span class="price-n">{{goods.newPrice}}</span>
      <span class="price-o">{{goods.oldPrice}}</span>
      <span class="price-dis" v-if="goods.discount">{{goods.discount}}</span>
      <span class="share" @click="shareClick">分享</span>
    </div>
    <div class="title"> {{goods.title}}</div>
    <div class="other">
      <span v-for="item in goods.columns">{{item}}</span>
    </div>
    <div class="service">
      <span v-for="item in goods.services">
        <img :src="item.icon">
        <span>{{item.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type: Object
      }
    },
    methods:{
      shareClick(){
        console.log('我按分享了')
        this.$emit('shareClick')
      }
    }
  }
</script>

<style scoped>
  .base {
    margin-top: 6px;
  }
  .price{
    padding: 0 8px;
  }
  .price .price-n{
    font-size: 35px;
    color: var(--color-high-text);
  }
  .price .price-o{
    font-size: 15px;
    margin-left: 6px;
    margin-right: 6px;
    color: #999;
    text-decoration: line-through;
  }
  .price .price-dis{
    background-color: var(--color-high-text);
    color: #fff;
    padding: 3px;
    border-radius: 3px;
    font-size: 13px;
    /*用绝对定位表现上浮*/
    position: relative;
    top: -11px;
  }
  .share{
    float: right;
  }
  .title{
    font-size: 19px;
    font-weight: 600;
    line-height: 25px;
    margin-top: 11px;
    padding: 0 5px;
  }
  .other{
    display: flex;
    justify-content: space-between;
    padding: 9px 8px;
    font-size: 13px;
    color: #999;
    border-bottom: 1px solid rgba(100,100,100,0.1);
  }
  .service{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 8px;
    line-height: 22px;
    font-size: 14px;
    border-bottom: 1px solid rgba(100,100,100,0.1);
  }
  .service span{
    padding: 0 2px;
  }
  .service img{
    height: 12px;
    width: 12px;
  }

</style>
