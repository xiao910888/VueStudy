<template>
    <div class="param-info">
      <div class="info-key">{{paramInfo.rulekey}}</div>
      <table class="info-size">
        <tr v-for="(item,index) in paramInfo.sizes" :key="index">
          <td  v-for="(td,indez) in item" :key="indez">{{td}}</td>
        </tr>
      </table>
      <div class="info-dis">{{paramInfo.ruledis}}</div>
    <div>
      <div class="info-key">{{paramInfo.infokey}}</div>
      <table class="info-param">
        <tr v-for="(item,index) in paramInfo.infos">
          <td class="param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="info-img" v-if="paramInfo.image!==''">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>

  export default {
    name: "DetailParamInfo",
    props:{
      paramInfo: {
        type: Object,
        default(){
          return {}
        }
      },
      currentItem:1
    }

  }
</script>

<style scoped>
  .param-info{
    padding: 20px 15px;
    border-bottom: 2px solid rgba(100,100,100,.1);
  }
  .param-info table {
    width: 100%;
    font-size: 15px;
    margin: 8px 0px;
  }
  .param-info table tr {
    height: 37px;
  }
  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-size{
    text-align: center;
  }
  .info-dis {
    font-size: 14px;
    line-height: 16px;
    color: #999;
    margin-bottom: 20px;
  }
  .param-key {
    width: 75px;
    text-align: center;
  }
  .param-value {
    text-align: left;
    line-height: 26px;
    color: var(--color-high-text);
  }
  .info-img img {
    width: 100%
  }
</style>
