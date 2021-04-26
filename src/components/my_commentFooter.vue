<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" />
      <span class="comment">
        <i class="iconfont iconpinglun-"></i>
        <em>100</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ active: post.has_star }"
        @click="getstars"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" @blur="isFocus = false"></textarea>
      <div>
        <span>发 送</span>
        <span>取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starThisAriticle } from "@/apis/post.js";
export default {
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    async getstars() {
      //   路由获取参数
      let id = this.$route.params.id;
      let res = await starThisAriticle(id);
      this.$toast.success(res.data.message);
      this.post.has_star = !this.post.has_star;
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
}
.active {
  color: red;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  margin-bottom: 60px;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }

  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>