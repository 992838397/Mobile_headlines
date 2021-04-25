<template>
  <div class="edit_profile">
    <my_header title="个人信息编辑">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </my_header>
    <div class="image">
      <img :src="userinfo.head_img" alt="" />
      <!-- 实现文件上传 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <my_celi
      title="昵称"
      :msg="userinfo.nickname"
      @click.native="showNicknameDialog"
    ></my_celi>
    <van-dialog
      v-model="nickShow"
      title="编辑昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field label="昵称" placeholder="请输入昵称" />
    </van-dialog>
    <my_celi @click.native="showNickpass" title="密码" msg="******"> </my_celi>
    <van-dialog
      v-model="nickpass"
      title="编辑密码"
      show-cancel-button
      @confirm="editNickpass"
      :before-close="beforeclose"
    >
      <van-field
        required
        v-model="originPass"
        label="原密码"
        placeholder="请输入原密码"
      />
      <van-field
        required
        v-model="newPass"
        label="新密码"
        placeholder="请输入新密码"
      />
    </van-dialog>
    <my_celi
      title="性别"
      :msg="userinfo.gender == 1 ? '男' : '女'"
      @click.native="nicknv = !nicknv"
    ></my_celi>
    <van-action-sheet
      v-model="nicknv"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
  </div>
</template>

<script>
import my_header from "@/components/my_header.vue";
import my_celi from "@/components/my_celi.vue";
import { uploadFile } from "@/apis/fileUpload.js";
import { editUserinfo, getUserinfo } from "@/apis/user.js";

import axios from "@/utils/request.js";
export default {
  data() {
    return {
      userinfo: {},
      nickShow: false,
      nickpass: false,
      nicknv: false,
      /* 用户昵称 */
      nickname: "",
      // 原密码
      originPass: "",
      // 新密码
      newPass: "",
      actions: [{ name: "女" }, { name: "男" }],
    };
  },
  components: {
    my_header,
    my_celi,
  },
  mounted() {
    //   更新用户信息
    let id = this.$route.params.id;
    getUserinfo(id)
      .then((res) => {
        // console.log(res);
        // 定义第三方变量,接收数据,然后通过第三方变量渲染
        this.userinfo = res.data.data;
        // 更新头像
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // 文件上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formdata = new FormData();
      formdata.append("file", file.file);
      //   发送请求
      uploadFile(formdata)
        .then((res) => {
          console.log(res);
          if (res.data.message == "文件上传成功") {
            this.$toast.success(res.data.message);
            // 拼接路径，因为服务器上只是目录,还有基准路径没有拼接
            console.log(axios.defaults.baseURL);
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            // 实现用户编辑头像
            editUserinfo(this.$route.params.id, { head_img: res.data.data.url })
              .then((res) => {
                console.log(res);
                this.$toast.success(res.data.message);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑昵称弹出框
    showNicknameDialog() {
      this.nickShow = !this.nickshow;
      this.nickname = this.userinfo.nickname;
    },
    // 编辑用户名
    editNickname() {
      editUserinfo(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          this.$toast.success(res.data.message);
          //   页面刷新也就是数据更新
          this.userinfo.nickname = this.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //编辑密码弹出框
    showNickpass() {
      this.nickpass = !this.nickpass;
      this.originPass = this.newPass = "";
    },
    // 修改密码
    async editNickpass() {
      // 1.判断原密码是否正确
      // 1.1 拿到原密码,
      if (this.userinfo.password == this.originPass) {
        // 2.判断新密码是否符合校验规则
        if (/^.{6,16}$/.test(this.newPass)) {
          let res = await editUserinfo(this.$route.params.id, {
            password: this.newPass,
          });

          if ((res.data.message = "修改成功")) {
            //  数据更新
            this.originPass = this.newPass;
            this.$toast.success(res.data.message);
          }
        }
      } else {
        this.$toast.fail("原密码错误啦");
      }
      // 满足了以上的条件,才发送修改密码请求
    },
    // 输入密码错误弹出框也会关闭,现在添加密码错误弹出框不会关闭
    beforeclose(active, done) {
      if (active == "confirm") {
        if (
          (this.userinfo.password == this.originPass) &
          /^.{6,16}$/.test(this.newPass)
        ) {
          done();
        } else {
          done(false);
        }
      } else {
        done();
      }
      console.log(active);
      console.log(done);
    },

    // 修改性别
    async onSelect(item) {
      console.log(item.name);
      let gender = item.name == "男" ? 1 : 0;
      let res = await editUserinfo(this.$route.params.id, {
        gender,
      });
      console.log(res);
      this.$toast.success(res.data.message);
      this.userinfo.gender = gender;
    },
  },
};
</script>
<style lang="less" scoped>
.image {
  display: flex;
  justify-content: center;
  padding: 0 20px;
  position: relative;
  img {
    width: 120px;
    height: 120px;
  }
  /deep/.van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  /deep/.van-uploader__upload {
    width: 120px;
    height: 120px;
  }
}
</style>