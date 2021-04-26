<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <my_input
          v-model.trim="user.username"
          placeholder="请输入手机号"
          :rules="/^1\d{10}$|^1\d{4}$/"
          msg="请输入11位手机号码"
        ></my_input>

        <my_input
          v-model.trim="user.password"
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
import { userLogin } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {
        username: "13035808046",
        password: "116616",
      },
    };
  },
  components: {
    my_buttom,
    my_input,
  },
  methods: {
    login(e) {
      // 验证一下密码是否符合,要不然随便输入一次,就发送一次请求,浪费资源
      if (
        /^1\d{10}$/.test(this.user.username) &&
        /^.{3,12}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            if (res.data.message == "登录成功") {
              this.$toast.success("登录成功");
              console.log(res);
              // 保存token值,后期验证使用
              localStorage.setItem("my_token", res.data.data.token);
              localStorage.setItem("my_id", res.data.data.user.id);
              console.log("这是login", location.href);
              //这里的localtion.href是被响应拦截器添加了路径的,需要通过字符截取拿到后面,进行跳转
              // 拦截器拦截下来,这里调用查看,如果有值,说明是从关注或者收藏页面跳转的,如果没有说明要跳转到个人中心页
              let redirect = location.href.split("=")[1];
              // 如果是从关注或收藏页面跳转到登录页面的,就会有这个值,如果不是,就不会有这个值
              // 如果有这个值,就跳转回当前的值得页面,没有值得话就跳转到个人中心页面
              if (redirect) {
                location.href = redirect;
                console.log(111111);
              } else {
                // 跳转到个人中心
                this.$router.push({
                  path: `/persondal/${res.data.data.user.id}`,
                });
              }
            } else {
              this.$toast.fail("登录失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail("用户名或密码错误");
      }
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