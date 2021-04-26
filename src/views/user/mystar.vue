<template>
  <div class="my_post">
    <my_header title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </my_header>

    <my_post v-for="item in post" :key="item.id" :post="item"></my_post>
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import my_post from "@/components/my_post";
import { getUserStars } from "@/apis/user";
export default {
  data() {
    return {
      post: {},
    };
  },
  components: {
    my_header,
    my_post,
  },
  async mounted() {
    let res = await getUserStars();
    console.log(res);
    this.post = res.data.data;
  },
};
</script>

<style>
</style>