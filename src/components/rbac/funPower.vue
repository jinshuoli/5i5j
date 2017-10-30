<!-- 这是权限管理的功能权限 -->
<template>
  <div>
    <el-row>
        <el-col :span="5">
          <el-input v-model.trim="searchForm.functionName" placeholder="搜索名称……"></el-input>
        </el-col>
        <el-col :offset="1" :span="2">
          <el-button type="primary" :plain="true" icon="search" @click="query">搜索</el-button>
        </el-col>
    </el-row>
    <br />
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column type="index" label="ID"  width="80">
      </el-table-column>
      <el-table-column prop="functionName" label="列表名称">
      </el-table-column>
      <el-table-column label="状态">
        <template scope="scope">{{ scope.row.status ==='V'?'有效':'无效' }}</template>
      </el-table-column>
      <el-table-column label="状态日期">
        <template scope="scope">{{ scope.row.statusDate.time | dateFormat }}</template>
      </el-table-column>
<!--       <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="danger" @click="delRow(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" type="warning" @click="editRow(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <br />
    <!-- 表格 ——end-->
    <!-- 分页 —— start-->
    <el-row>
      <el-col :offset="8">
        <el-pagination @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 分页 —— end-->
  </div>
</template>
<script>
import { formatDate } from '@/base/date'
// 功能权限以后可能会有增加，删除，修改等功能 先将html注释以后打开直接按需求整改
export default {
  data() {
    return {
      // 搜索
      searchForm: {functionName:''},
      // 表格
      tableData: [],
      tableLoading: false,
      // 分页
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
    }
  },
  methods: {
    // 查询
    query() {
      this.searchForm.currentPage = this.currentPage;
      this.getTable()
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.searchForm.currentPage = val;
      this.getTable()
    },
    getTable() {
      this.tableLoading = true;
      this.$axios.post('function_queryList.action','jsonData=' + JSON.stringify(this.searchForm)).then(response => {
        this.tableLoading = false;
        try {
          let funFmt = JSON.parse(response.data)
          let funPage = funFmt.pageview;
          this.pageSize = +funPage.page_size; // 每页显示条数
          this.totalrecord = +funPage.totalrecord; // 总数据条数
          this.tableData = funPage.records; // 表格数据
          console.log(JSON.stringify(funPage.records))
        } catch (e) {
          this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
      })
    },
  },
  filters: {
    dateFormat(time) {
      if (time == undefined) { return "未获取到时间"; }
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  created() {

  }
}

</script>
<style lang="less" scoped>


</style>
