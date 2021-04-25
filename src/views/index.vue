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
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="5"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <my_post
              v-for="item in cate.postList"
              :key="item.id"
              :post="item"
            ></my_post>
          </van-pull-refresh>
        </van-list>
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
        loading: false, //当前组件的上拉加载的状态
        finished: false, //当前组件的数据是否全部加载完毕的标记
        isLoading: false, //这个控制下拉刷新
      };
    });
    // 页面一开始就调用一次
    console.log(this.cateList);
    this.geteditList();
  },
  methods: {
    // 封装请求新闻文章数据
    async geteditList() {
      // 可以通过数组下标索引值拿到ID
      let id = this.cateList[this.active].id;
      let current = await getNewslist({
        category: id,
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
      });
      current = current.data.data;
      this.cateList[this.active].postList.push(...current);

      // 本次请求完成之后,将loading重置为false,方便下一次加载
      this.cateList[this.active].loading = false;
      // 本次下拉刷新完成,将isloading重置为false,方便下一次加载
      this.cateList[this.active].isLoading = false;

      //判断数据是否全部加载完成 如果返回的数据小于五条,说明已经没有数据了,把finished设置true
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },
    // 处理上拉加载
    onLoad() {
      this.cateList[this.active].pageIndex++;
      this.geteditList();
      // this.loading = false;
      // this.finished = true;
    },
    // 这是处理下拉刷新   (也就是刷新最新的数据,原来的数据要删除,然后重新获取新的数据)
    onRefresh() {
      // 页码回到第一页
      this.cateList[this.active].pageIndex = 1;
      // 清空数据,
      this.cateList[this.active].postList.length = 0;
      //将之前可能重置为true的finished状态重置为false
      this.cateList[this.active].finished = false;
      // 重新调用数据
      this.geteditList();
    },
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