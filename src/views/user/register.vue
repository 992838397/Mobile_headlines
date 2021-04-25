<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <my_input
        v-model="user.username"
        placeholder="手机号码"
        :rules="/^1[35789]\d{9}$|^1\d{4}$/"
        msg="请输入11位手机号"
      ></my_input>
      <my_input v-model="user.nickname" placeholder="昵称"></my_input>
      <my_input
        v-model="user.password"
        placeholder="请输入密码"
        :rules="/^.{6,12}$/"
        msg="请输入6~12位密码"
      ></my_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <my_buttom type="primary" @click="registerClick">注册</my_buttom>
  </div>
</template>

<script>
// 引入封装的组件
import my_buttom from "@/components/my_buttom.vue";
import my_input from "@/components/my_input.vue";
import { userRegister } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  components: {
    my_buttom,
    my_input,
  },
  methods: {
    registerClick() {
      console.log(this.user);
      userRegister(this.user)
        .then((res) => {
          this.$toast.success("注册成功");
          // 路由重定向
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>