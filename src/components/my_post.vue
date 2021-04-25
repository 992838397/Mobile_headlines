<template>
  <div class="single">
    <div class="left">
      <p class="content">{{ post.title }}</p>
      <p class="info">
        <span>{{ post.user.nickname }}</span>
        <span>有几人跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
</template>

<script>
import axios from "@/utils/request";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    // 因为服务器问题,我们需要为图片添加前缀
    if (this.post.cover.length > 2) {
      for (let i = 0; i < this.post.cover.length; i++) {
        this.post.cover[i].url =
          this.post.cover[i].url.indexOf("http") !== -1
            ? this.post.cover[i].url
            : axios.defaults.baseURL + this.post.cover[i].url;
      }
    } else {
      this.post.cover[0].url =
        this.post.cover[0].url.indexOf("http") !== -1
          ? this.post.cover[0].url
          : axios.defaults.baseURL + this.post.cover[0].url;
    }
  },
};
</script>
<style lang="less" scoped>
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
</style>