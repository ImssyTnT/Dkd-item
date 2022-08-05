<template>
  <el-card class="box-card">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column property="date" label="日期"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },

  created() {},

  methods: {},
}
</script>

<style scoped></style>
