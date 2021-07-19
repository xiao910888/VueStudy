import {debounce} from "./utils";

export const itemListenMixin = {
  data(){
    return{
      refresh:null
    }
  }/*,
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,50)
    //3.监听item中图片加载完成
    this.$bus.$on('detailImageLoad',() =>{
      this.refresh()

    })
  }*/
}
