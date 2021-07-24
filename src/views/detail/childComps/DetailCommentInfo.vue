<template>
  <div  class="comment-info">
    <div class="info-header">
      <span class="header-title">用户评价</span>
      <span class="header-more">更多</span>
    </div>
    <div v-if="Object.keys(commentInfo).length !== 0">
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <div>
          <span>{{commentInfo.user.uname}}</span>
          <p>{{commentInfo.style}}</p>
        </div>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-img">
          <div class="img-item"  v-for="item in commentInfo.images">
            <img :src="item">
          </div>
        </div>
        <div class="info-date">
          {{showDate(commentInfo.created)}}
        </div>
      </div>
    </div>
    <div v-else class="no-comment">
      暂无评价
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../common/utils";

  export default {
    name: "DetailCommentInfo",
    components: {
      formatDate
    },
    props:{
      commentInfo:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    methods: {
      showDate(value){
        //1.将时间戳转成Date对象
        const date = new Date(value*1000)
        //2.将date进行格式化
        return formatDate(date,'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .comment-info{
    border-bottom: 2px solid rgba(100,100,100,.1);
  }
  .info-header{
    margin: 11px 0;
    height: 37px;
    padding: 5px 15px;
    border-bottom: 1px solid rgba(100,100,100,0.1);
  }
  .header-title{
    float: left;
  }
  .header-more{
    float: right;
    padding: 4px 0;
    font-size: 12px;
  }
  .info-user{
    padding: 0 13px;
    display: flex;
  }
  .info-user img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #ccc;
    margin-left: 8px;
  }
  .info-user div{
    padding: 1px 13px;
  }
  .info-user span{

  }
  .info-user p{
    font-size: 7px;
    color: #999;
    margin-top: 6px;
  }
  .info-detail{
    padding-bottom: 10px;
  }
  .info-detail p{
    padding: 6px 26px;
    margin-top: 11px;
    font-size: 16px;
    line-height: 23px;
  }
  .info-img{
    display: flex;
    padding: 3px 22px;
  }
  .img-item{
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin-left: 5px;
  }
  .info-img img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .info-date{
    font-size: 7px;
    color: #999;
    margin-top: 6px;
    padding: 0 28px;
  }
  .no-comment{
    line-height: 60px;
    height: 60px;
    text-align: center;
  }
</style>
