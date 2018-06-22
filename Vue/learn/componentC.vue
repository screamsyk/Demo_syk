<template>
    <div>局部组件C，使用.vue文件，{{introduce}}</div>
</template>
<script>
export default {
  data() {
    return {
      introduce: "单文件组件"
    };
  }
};
</script>