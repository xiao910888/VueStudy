<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item" class="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods:{
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    /*padding: 5px;*/
  }
  .goods .item{
    width: 48%;
    /*flex: 1 0 auto;*/
  }

</style>
