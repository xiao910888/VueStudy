<template>
  <div class="item">
    <div class="item-selector">
      <check-button :isChecked="product.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-size">型号，暂时还没做</div>
      <div id="item-info-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      product:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checkClick(){
        this.product.checked = ! this.product.checked
      }
    }
  }
</script>

<style scoped>
  .item{
    padding: 5px ;
    display: flex;
    border: 2px solid rgba(100,100,100,.1);
    border-radius: 14px;
    margin: 8px 0;
    background-color: #fff;
  }
  .item-selector{
    justify-content: center;
    align-items: center;
    display: flex;
    width: 20px;
  }

  .item-img{
    width: 80px;
    height: 80px;
    margin: 5px;
  }
  .item-img img{
    height: 80px;
    width: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid rgba(100,100,100,.1);
  }
  .item-info{
    position: relative;
    overflow: hidden;
    margin: 5px
  }
  .item-title{
    font-size: 15px;
    height: 34px;
    line-height: 18px;
    margin-bottom: 2px;
    color: black;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  }
  .item-size{
    font-size: 13px;
    margin-top: 6px;
  }
  #item-info-bottom {
    margin-top: 7px;
  }
  .item-price{
    float: left;
    color: var(--color-high-text);
  }
  .item-count{
    float: right;
  }

</style>
