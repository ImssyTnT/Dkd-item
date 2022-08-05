<template>
  <div>
    <!-- 头部搜索 Start -->
    <Search>
      <div class="input">
        <div class="search">
          <span class="input-text">工单编号:</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="search">
          <span class="input-text">工单状态:</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </Search>
    <!-- 头部搜索 End -->

    <!-- 表格区域 Start -->
    <Table></Table>
    <!-- 表格区域 End -->
  </div>
</template>

<script>
import Search from '@/components/search'
import Table from '@/components/table'
export default {
  data() {
    return {
      input: '',
      options: [
        {
          value: '选项1',
          label: '代办',
        },
        {
          value: '选项2',
          label: '进行',
        },
        {
          value: '选项3',
          label: '取消',
        },
        {
          value: '选项4',
          label: '完成',
        },
      ],
      value: '',
    }
  },

  created() {},

  components: {
    Search,
    Table,
  },

  methods: {},
}
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  height: 40px;
}
.input .input-text {
  font-size: 14px;
  padding-right: 12px;
}
.input .el-input,
.el-select {
  width: 203px;
  height: 100%;
}
.search {
  margin-right: 10px;
}
.el-button {
  padding: 12px 15.5px;
  background-color: #5f84ff;
}
</style>
