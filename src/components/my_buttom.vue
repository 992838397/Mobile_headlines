<template>
  <div
    class="btn"
    :class="{
      primary: type == 'primary',
      danger: type == 'danger',
      orange: type == 'orange',
    }"
    @click="login"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    //
    login(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(70, 158, 12);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
.primary {
  border: 1px solid rgb(67, 145, 4);
  background-color: rgb(67, 145, 4);
  color: #fff;
}
.danger {
  border: 1px solid rgb(211, 29, 13);
  background-color: rgb(211, 29, 13);
  color: #fff;
}
.orange {
  border: 1px solid orange;
  background-color: orange;
  color: #fff;
}
</style>