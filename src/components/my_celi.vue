<template>
  <div class="my_celi">
    <div class="left">
      <slot name="left">{{ title }}</slot>
    </div>
    <div class="right">
      <span>{{ msg }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      requires: true,
    },
    msg: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="less" scoped>
.my_celi {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .right {
    font-size: 12px;
    color: #999;
  }
}
</style>