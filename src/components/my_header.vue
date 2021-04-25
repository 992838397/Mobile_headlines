<template>
  <div class="my_header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="content">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "my_header",
    },
  },
};
</script>

<style lang="less" scoped>
.my_header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999;
  padding: 0 20px;
  .right {
    color: red;
  }
}
</style>