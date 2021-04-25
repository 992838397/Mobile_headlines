<template>
  <div class="personal">
    <router-link :to="`/edit_profile/${id}`">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender == 1,
                iconxingbienv: userinfo.gender == 0,
              }"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <!-- 调用封装好的 -->
    <my_celi title="我的关注" msg="关注的用户"> </my_celi>
    <my_celi title="我的跟帖" msg="跟帖/回复"> </my_celi>
    <my_celi title="我的收藏" msg="文章/视频"> </my_celi>
    <my_celi title="设置"> </my_celi>

    <my_buttom type="danger" style="margin-top: 20px">退出</my_buttom>
  </div>
</template>

<script>
import my_celi from "@/components/my_celi.vue";
import my_buttom from "@/components/my_buttom.vue";
import { getUserinfo } from "@/apis/user";
import axios from "@/utils/request";
export default {
  data() {
    return {
      id: "",
      userinfo: {},
    };
  },
  components: {
    my_celi,
    my_buttom,
  },
  mounted() {
    this.id = this.$route.params.id;
    getUserinfo(this.id)
      .then((res) => {
        console.log(res);
        // 如果身份验证失败,我们跳到登入页面,这里使用了响应拦截
        this.userinfo = res.data.data;
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>