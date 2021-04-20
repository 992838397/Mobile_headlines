<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <my_input
          v-model="user.username"
          placeholder="请输入手机号"
          :rules="/^1\d{10}$|^1\d{4}$/"
          msg="请输入11位手机号码"
        ></my_input>

        <my_input
          v-model="user.password"
          placeholder="请输入密码"
          :rules="/^.{3,12}$/"
          msg="请输入3-12位密码"
        ></my_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <my_buttom type="danger" @click="login">登录按钮</my_buttom>
    </div>
  </div>
</template>

<script>
import my_buttom from "@/components/my_buttom.vue";
import my_input from "@/components/my_input.vue";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    my_buttom,
    my_input,
  },
  methods: {
    login(e) {
      console.log(this.user.username);
      console.log(this.user.password);
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