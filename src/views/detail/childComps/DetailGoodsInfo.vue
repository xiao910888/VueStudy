<template>
  <div v-if="Object.keys(detailInfo).length !== 0"  class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0,
      }
    },
    methods: {
      imgLoad(){
        this.$bus.$emit('detailImageLoad')
      },
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .goods-info{
    pointer-events: auto;
    padding: 20px 0;
    border-width: 1px 0;
    border-style: solid;
    border-color: rgba(100,100,100,.1);
  }
  .info-desc{
    padding: 13px 11px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 15px;
    line-height: 22px;
  }


  .info-list img{
    width: 100%
  }

</style>
