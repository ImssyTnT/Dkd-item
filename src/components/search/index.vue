<template>
  <el-card class="box-card" shadow="never">
    <slot />
  </el-card>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped>
.box-card {
  width: 100%;
  border: 0;
  margin-bottom: 20px;
}
</style>
