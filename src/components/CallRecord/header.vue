<!-- 这是外呼记录的回电记录 -->
<template>
  <div>
    <el-form ref="OutgoForm">
      <p> 部门 【 {{formList.dept}} 】 <a href="javaScript:void(0)" @click="openTreeDialog">选择</a> </p>
      <el-form-item>
        <el-select v-model.trim="formList.adviser" placeholder="员工名称">
          <el-option label="员工名称" value="name"></el-option>
          <el-option label="员工号码" value="number"></el-option>
        </el-select>
        <el-input v-model.trim="formList.nameOrUser" style="width:200px" placeholder="按员工号码或名称查询"></el-input>
        <el-select v-model.trim="formList.customer" placeholder="客户号码">
          <el-option label="客户名称" value="name"></el-option>
          <el-option label="客户号码" value="number"></el-option>
        </el-select>
        <el-input v-model.trim="formList.CustomerNumber" style="width:200px" placeholder="按客户号码或名称查询"></el-input>
      </el-form-item>
    </el-form>
    <!-- 部门选择树 —— start -->
    <tree-menu :dialogState="isTreeDialog" ref="postinfo" @on-close="closeDialog" @post-node="getNodes">
    </tree-menu>
    <!-- 部门选择树 —— end -->
    <!-- 时间区域选择 —— start-->
    <el-form ref="Timeform" :inline="true">
      <el-form-item label="时间：" tag="div">
        <el-date-picker type="datetimerange" @change="dateChange" v-model.trim="dateValue" placeholder="选择日期范围">
        </el-date-picker>
          <el-checkbox v-model.trim="formList.isDiff">号码去重</el-checkbox>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="emitExport2Excel">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 时间区域选择 —— end-->
  </div>
</template>
<script>
import treeMenu from '@/components/selectSector'

export default {
  components: {
    treeMenu,
  },
  data() {
    return {
      // 呼出记录记录的表单（头）
      formList: {
        dept: '全部',
        deptId: '',
        adviser: 'name',
        nameOrUser: '',
        customer: 'name',
        CustomerNumber: '',
        isDiff: false,
        dateVal: '',
      },
      // 选择部门
      isTreeDialog: false,
      // 时间
      dateValue: '',
    };
  },
  methods: {
    // ******* 员工 *********
    // 部门选择
    openTreeDialog() { // 打开部门树
      this.isTreeDialog = true;
      this.$refs.postinfo.TreeQuery(); // 触发查询部门树的方法
    },
    closeDialog() { // 关闭部门树
      this.isTreeDialog = false;
    },
    getNodes(nodes) {
      this.isTreeDialog = false;
      this.formList.dept = nodes[0].name
      this.formList.deptId = nodes[0].value
    },
    // 格式化后的时间
    dateChange(val) {
      this.formList.dateVal = val;
    },
    // 点击查询的时候触发
    query() {
      this.formList.currentPage = 1;
      this.emitTable()
    },
    // 告诉父组件，要查询表格数据
    emitTable() {
      this.$emit("on-change-query", this.formList)
    },
    // 告诉父组件，要导出表格
    emitExport2Excel() {
      this.$emit("on-export-excel")
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
