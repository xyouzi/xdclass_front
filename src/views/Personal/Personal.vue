<template>
  <div>
    <div class="container">
        <div class="p_top">
            <div>
                <!-- <img src='static/imgs/hlw2.jpg' alt="头像"/> -->
                <img :src='info.head_img || defaultHeadImg' alt="头像"/>
                <router-link to="/login" v-if = "getToken === ''"> 
                <p>立刻登录</p>
                </router-link>
                <p v-else>{{info.name}} </p>
            </div>
        </div>
        <p style="color:gray;margin-top:200px">功能开发中。。。</p>
        <button v-if="getToken !== ''" class="green" @click="signOut">
            退出登录
        </button>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import { getUserInfo } from "@/api/getData.js";

export default {
  components: {
    CommonFooter
  },

  data() {
    return {
      info: {},
      defaultHeadImg: 'static/imgs/hlw1.jpg'
    };
  },

  computed: {
    getToken() {
      return this.$store.state.token;
    }
  },

  methods: {
    //获取用户信息
    async getInfo() {
      try {
        const result = await getUserInfo(this.getToken);
        console.log(result);
        if (result.data.code === 0) {
          this.info = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //退出登录
    async signOut() {
      //清除token
      await this.$store.dispatch('clearToken');
      localStorage.removeItem("token");

      //刷新页面
      location.reload();
    }
  },

  mounted() {
    if (this.getToken) {
      this.getInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // 顶部头像区域
  .p_top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-color: rgb(1,147,220);
    div {
      text-align: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50px;
      }
      p {
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }
}
// 退出登录
.green {
  display: block;
  background-color: rgb(1,147,220);
  border: none;
  position:fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  outline: none;
  width: 90%;
  height: 46px;
  color: #fff;
}
</style>
