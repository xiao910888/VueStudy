<template>
  <div class="cart-list">
    <scroll class="content" ret="scroll">
      <div>
        <cart-list-item
          v-for="(item,index) in cartList"
          :product="item"
          :key="index"/>
      </div>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";

  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'


  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(["cartList"])
    },
    activated() {
      if(this.$refs.scroll)
        this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content {
    height: calc(100vh - 93px - 40px);
    overflow: hidden;
    background-color: #f2f2f2;
  }
  .content>div{
    padding: 5px 14px;
  }
</style>
