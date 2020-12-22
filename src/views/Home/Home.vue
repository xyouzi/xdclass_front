<template>
  <div>
    <!-- 首页轮播图 -->
    <home-banner :banners="banners"></home-banner>
    <!-- 视频列表 -->
    <video-list 
      :videoDataList="videoDataList" 
      :currentNum="currentNum"
      :total="total"
      :pageSize="pageSize"
      ></video-list>
    
    <common-footer></common-footer>
  </div>
</template>

<script>
import HomeBanner from './Component/Banner'
import VideoList from './Component/VideoList'
import CommonFooter from '@/components/CommonFooter'
import {getBanner,getVideoData} from "@/api/getData.js"

export default {
  // 注册组件
  components:{
    HomeBanner,
    VideoList,
    CommonFooter
  },
  data(){
    return {
      banners:[],
      // 分页数据
      videoDataList:[],
      // 当前页
      currentNum:1,
      // 每页条数
      pageSize:0,
      // 总页数
      total:0
    }
  },
  methods:{
    // 获取轮播图数据
    async getBannerData(){
      try{
        const result = await getBanner(); 
        if(result.data.code == 0){
          this.banners = result.data.data;
        }
      }catch(e){
          console.log(e);
      }
    },

    // 视频分页数据
    async getVideoDataList(pageNo,pageSize){
      try{
        const result = await getVideoData(pageNo,pageSize);
        if(result.data.code == 0){
          this.videoDataList = result.data.data.list;
          this.currentNum = result.data.data.currentNum;
          this.total = result.data.data.total;
          this.pageSize = result.data.data.pageSize;
        }
      }catch(e){
          console.log(e);
      }
    }
  },
  mounted(){
    this.getBannerData();
    this.getVideoDataList(1,6);
  }
}
</script>

<style lang="scss" scope>

</style>
