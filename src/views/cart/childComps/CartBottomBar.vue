<template>
  <div class="bottom-bar">
    <div class="bar-check">
      <check-button :is-checked="isSelectedAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="bar-total">
      <span>合计：</span>
      <span class="text">{{totalPrice}}</span>
    </div>
    <div class="bar-calculate" @click="calcClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed:{
      ...mapGetters(['cartList','checkLength']),
      totalPrice(){
        return '￥'+this.cartList.filter(item =>{
          return item.checked
        }).reduce((preValue,item) =>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      isSelectedAll(){
        if(this.cartList.length===0) return false;
       // return !this.cartList.filter(item => !item.checked).length
       // return !this.cartList.find(item =>!item.checked)
        return this.cartList.every(item =>item.checked)
      }
    },
    methods: {
      checkClick(){
        // if(this.isSelectedAll){
        //   this.cartList.forEach(item => item.checked = false)
        // }else{
        //   this.cartList.forEach(item => item.checked = true)
        // }

        let isC=this.isSelectedAll
        this.cartList.forEach(item => item.checked = !isC)
      },
      calcClick(){
        if(!this.isSelectedAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #f6f6f6;
    position: relative;
    border-top: 1px solid rgba(100,100,100,.2);
    display: flex;
    align-items: center;
  }
  .bar-check {
    display: flex;
    height: 40px;
    align-items: center;
    margin-left: 14px;
  }
  .bar-check span{
    margin-left:5px;
  }
  .bar-total {
    flex: 1;
    margin-right: 10px;
    text-align: right;
  }
  .text{
    color: #ff498b;
  }
  .bar-calculate{
    width: 100px;
    height: 40px;
    background-color: #ff498b;
    color: #fff;
    line-height: 40px;
    text-align: center;
  }
</style>
