<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({ path: `/personal/${id}` })">
        <van-icon name="manager-o" />
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <my_post
          v-for="item in cate.postList"
          :key="item.id"
          :post="item"
        ></my_post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCatelist } from "@/apis/category";
import { getNewslist } from "@/apis/post";
import my_post from "@/components/my_post";
export default {
  components: {
    my_post,
  },
  data() {
    return {
      // 当前被选中的active
      active: localStorage.getItem("my_token") ? 1 : 0,
      cateList: {}, //这是栏目列表数据
      //   newsCatelist: {}, //新闻列表数据
    };
  },
  async mounted() {
    let res = await getCatelist();
    this.cateList = res.data.data;
    // 数据改造
    // 反复重复请求造成资源的浪费,我们吧请求成功的数据存到变量里,如果点击的时候这个变量有数据,就不用在发起请求了
    this.cateList = this.cateList.map((v) => {
      return {
        ...v,
        // 当前栏目的数据
        postList: [],
        // 当前栏目的页面
        pageIndex: 1,
        // 当前栏目每页显示的数量
        pageSize: 6,
      };
    });
    console.log(this.cateList);
    this.geteditList();

    // 页面一开始就调用一次
  },
  methods: {
    async geteditList() {
      // 可以通过数组下标索引值拿到ID
      let id = this.cateList[this.active].id;
      let res = await getNewslist({
        category: id,
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
      });
      this.cateList[this.active].postList = res.data.data;
      console.log(this.cateList[this.active].postList);
    },
    // getactive() {
    //   this.geteditList();
    // },
  },
  watch: {
    active() {
      if (this.cateList[this.active].postList == 0) {
        this.geteditList();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.index {
  .header {
    //   width: 100%;
    height: 50px;
    background: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
  }
  .search {
    flex: 1;
    height: 40px;
    margin-top: 5px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 0 10px;
  }
  .user {
    color: #fff;
    font-size: 30px;
  }
}
</style>