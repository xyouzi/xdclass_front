<template>
    <div class="container"> 
        <h1>{{videoInfo.title}}</h1>    
        <p class="brief">简介</p>
        <p class="briefs">{{videoInfo.brief}}</p>
        <p class="brief">概述</p>
        <p class="briefs">{{videoInfo.summary}}</p>
     </div>
</template>
<script>
export default {
    props:{
        videoInfo:{
            type:Object,
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  width:100%;
  padding-bottom:50px;
  margin:15px 0;
}
h1{
    text-align: left;
    padding: 30px 0 40px 20px;
    font-size: 18px;
}
.brief{
    font-size: 16px;
    padding-left: 20px;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 600;
}
.briefs{
    font-size: 14px;
    padding: 10px 20px 40px 20px;
    text-align: left;
    line-height: 20px;
}
  
</style>
