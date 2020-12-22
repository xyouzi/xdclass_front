<template>
  <div class="list-content">
    <div class="list">
      <!-- 遍历视频 -->
      <router-link
        :key="item.id"
        :to="{ path: '/coursedetail', query: { video_id: item.id } }"
        class="course"
        v-for="item in videoDataList"
      >
        <div class="item_img">
          <img style="width:170px;height:100px" v-lazy="item.cover_img" />
        </div>
        <div class="video_info">
          <div class="c_title">{{ item.title }}</div>
          <div class="price">￥ {{ item.price / 100 }}</div>
        </div>
      </router-link>
    </div>
    <!-- 加载更多 -->
    <div class="btn-more" style="margin-bottom:80px" @click="more(++currentNum,total)">加载更多</div>
  </div>
</template>

<script>
import {getVideoData} from "@/api/getData.js"

export default {
  data(){
    return {
      // 加载更多的数据
      newVideoDataList:[],
    }
  },
  props: {
    videoDataList:{
      type: Array,
      required: true,
    },
    currentNum:{
      type: Number
    },
    total:{
      type: Number
    },
    pageSize:{
      type: Number
    }
  },
  methods:{
    more(pageNo,total){
      let num = Math.ceil(total/this.pageSize);
      if(pageNo>num){
        const toast = this.$createToast({
              txt: "到底啦",
              type: "error",
            });
        toast.show();
      }else{
        this.getVideoDataList(pageNo);
      }
    },
    // 视频分页数据
    async getVideoDataList(pageNo,pageSize){
      try{
        const result = await getVideoData(pageNo,pageSize);
        if(result.data.code == 0){
          this.newVideoDataList = result.data.data.list;
        }
        this.videoDataList = [...this.videoDataList,...this.newVideoDataList];   
      }catch(e){
          console.log(e);
      }
    }
  },
  mounted(){
      // console.log(this.videoDataList);
  }
}
</script>

<style lang="scss" scoped>
//列表包裹层边距
.list-content {
  margin-top: 20px;
  padding: 0 13px;
}
//视频包括层
.list {
  display: flex; //设置flex布局
  flex-wrap: wrap; //换行排列
  justify-content: space-between; //两端对齐
  padding-bottom: 25px;
}
//视频个体层
.course {
  width: 48%;
  margin-bottom: 17px;
}
//视频图片
.item_img {
  font-size: 0; //消除图片元素产生的间隙
  box-shadow: 0 4px 11px 0 rgba(43, 51, 59, 0.6); //设置图片阴影，rgba前三个参数是颜色编码，最后一个是透明度
  border-radius: 8px; //设置图片圆角
  img {
    width: 100%;
    border-radius: 8px;
  }
}
.c_title {
  //设置超过两行隐藏 start
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  //设置超过两行隐藏 end
  font-size: 11px;
  height: 26px;
  line-height: 13px;
  margin-top: 10px;
  color: #2b333b;
}
//价格
.price {
  margin-top: 8px;
  font-size: 12px;
  color: #d93f30;
}
.btn-more{
  width:200px;
  height: 40px;
  border: 2px solid #e6e6e6;
  margin: 0 auto;
  line-height: 40px;
  color: gray;
}
</style>
