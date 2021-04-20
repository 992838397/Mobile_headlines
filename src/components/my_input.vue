<template>
  <input
    @input="handlerInput"
    type="text"
    class="hminput"
    :[pn]="{ success: flag, error: !flag }"
    @blur="handlerchange"
  />
</template>
<script>
export default {
  data() {
    return {
      flag: "",
      pn: "",
    };
  },
  // 这里接收父组件传递的值,如果不传递,会默认添加到根组件上去
  props: {
    rules: {
      type: RegExp,
    },
    msg: {
      type: String,
    },
  },
  methods: {
    handlerInput(e) {
      let value = e.target.value;
      //   判断用户输入是否正确
      if (this.rules) {
        this.pn = "class";
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      this.$emit("input", value);
    },
    handlerchange(e) {
      let value = e.target.value;
      if (this.rules) {
        if (!this.rules.test(value)) {
          // console.log(this.msg);
          this.$toast.fail(this.msg);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.hminput {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>