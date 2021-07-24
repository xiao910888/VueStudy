<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>

    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages" ref="goods"/>
      <detail-base-info :goods="goods" @shareClick="shareClick"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <DetailCard v-show="isShare" :shareInfo="shareInfo" @hideCard="hideCard" class="detail-card"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from "components/common/toast/Toast";
  import {debounce} from "../../common/utils";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam,ShareInfo} from "network/detail";
  import {backTopMixin} from "../../common/mixin";

  import {mapActions} from 'vuex'
  import DetailCard from "./childComps/DetailCard";

  export default {
    name: "Detail",
    components: {
      DetailCard,
      DetailBottomBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast,
      debounce,
      getDetail,
      getRecommend,
      Goods,
      Shop,
      GoodsParam,
    },
    mixins: [backTopMixin],

    data(){
      return{
        iid:null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTops: [],
        currentIndex:0,
        isShowBackTop: false,
        refresh:null,
        loadTops:null,
        shareInfo: {},
        isShare:false
        // message:'',
        // show:false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.id

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        const data =res.result
        this.topImages = data.itemInfo.topImages
        console.log(res)

        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        this.shareInfo = new ShareInfo(data.shopInfo,data.itemInfo)
        //有点商品没有评论信息
        if(data.rate.cRate !== 0)
         this.commentInfo = data.rate.list[0]
      })

      //3.请求推荐数据
      getRecommend(this.iid).then(res =>{
        this.recommends = res.data.list
      })




      this.loadTops = debounce(()=>{
        if (this.$refs.param && this.$refs.comment && this.$refs.recommend) {
          this.$nextTick(() => {
            this.themeTops = []
            this.themeTops.push(0)
            this.themeTops.push(this.$refs.param.$el.offsetTop)
            // if(this.$refs.comment.$el.offsetTop == undefined)
            //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
            // else
              this.themeTops.push(this.$refs.comment.$el.offsetTop)
            this.themeTops.push(this.$refs.recommend.$el.offsetTop)
            this.themeTops.push(Number.MAX_VALUE)
          })
        }
      },100)
      this.loadTops()
    },
    methods: {
      ...mapActions(['addCart']),
      titleClick(index){
        switch (index) {
          case 0:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.goods.$el,300);break;
          case 1:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.param.$el,300);break;
          case 2:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.comment.$el,300);break;
          case 3:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.recommend.$el,300);break;
        }
      },
      contentScroll(position){
        this.listenShowBackTop(position)
        for(let i=0 ;i< this.themeTops.length;i++){
          if(this.themeTops[i]<=-position.y+44 && -position.y+44<this.themeTops[i+1])
            this.currentIndex = i
        //  console.log(this.currentIndex)
        }
        this.$refs.nav.currentIndex=this.currentIndex
      },

      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车里
        //this.$store.commit('addCart',product)
        this.addCart(product).then(res =>{
          // this.show = true
          // this.message = res;
          // setTimeout(()=>{
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res,2000)
        })
      },
      shareClick(){
        this.isShare = true
      },
      hideCard(){
        this.isShare = false
      }

    },
    mounted(){
      this.refresh = debounce(this.$refs.scroll.refresh,50)
      //3.监听item中图片加载完成
      this.$bus.$on('detailImageLoad',() =>{
        this.refresh()
        this.loadTops()
      })
    },

    beforeDestroy() {
      window.removeEventListener("scroll", this.Scroll);
    }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  .detail-card{
    z-index: 11;
  }
</style>
