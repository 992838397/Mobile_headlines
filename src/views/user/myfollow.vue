<template>
  <div class="myfollow">
    <my_header title="我的关注">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </my_header>
    <div class="list" v-for="(value, index) in postFollow" :key="value.id">
      <div class="box">
        <img :src="axios.defaults.baseURL + value.head_img" alt="" />
        <div class="center">
          <p>{{ value.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancelFollow(value.id, index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import { getUserfollow, upfollowUser } from "@/apis/user";
import axios from "@/utils/request";
export default {
  data() {
    return {
      postFollow: {},
      axios,
    };
  },
  components: {
    my_header,
  },
  async mounted() {
    let id = this.$route.params.id;
    let res = await getUserfollow(id);
    this.postFollow = res.data.data;
    console.log(res);
  },
  methods: {
    //   取消关注
    async cancelFollow(id, index) {
      let res = await upfollowUser(id);
      this.postFollow.splice(index, 1);
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      padding: 0 20px;
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>