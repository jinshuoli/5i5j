<!-- 这是系统设置的活动日志 -->
<template>
  <div>
    <el-form ref="form" :inline="true">
      <p> 部门 【 {{searchForm.org}} 】 <a href="javaScript:void(0)" @click="openTreeDialog">选择</a> </p>
      <el-form-item>
        <el-input v-model.trim="searchForm.name" placeholder="搜索员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model.trim="searchForm.duty" clearable placeholder="全部职务">
          <el-option v-for="item in dutyGet" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    <!-- 时间区域选择 —— start-->
      <el-form-item label="时间：" tag="div">
        <el-date-picker type="datetimerange" @change="dateChange" v-model.trim="dateValue" placeholder="选择日期范围">
        </el-date-picker>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    <!-- 时间区域选择 —— end-->
    </el-form>
    <!-- 部门选择树 —— start -->
    <tree-menu :dialogState="isTreeDialog" ref="postinfo" @on-close="closeDialog" @post-node="getNodes">
    </tree-menu>
    <!-- 部门选择树 —— end -->
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column prop="code" label="员工编号">
      </el-table-column>
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column prop="duty" label="职务">
      </el-table-column>
      <el-table-column prop="orgName" label="部门">
      </el-table-column>
      <el-table-column prop="statement" label="类型">
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template scope="scope">{{ scope.row.createTime.time | dateFormat }}</template>
      </el-table-column>
      <el-table-column prop="comments" label="详情">
      </el-table-column>
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
import treeMenu from '@/components/selectSector'

export default {
  components: {
    treeMenu,
  },
  data() {
    return {
      // 职务
      dutyGet: '',
      // 搜索
      searchForm: {
        name: '',
        duty: '',
        org: '全部',
        orgId: '',
        dateVal: '',
      },
      // 选择部门
      isTreeDialog: false,
      // 时间
      dateValue: '',
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
    // 获取职务下拉框信息
    getDuty() {
      this.$axios.get('staff_getDutyList.action').then(response => {
        this.dutyGet = JSON.parse(response.data)
      })
    },
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
      this.searchForm.org = nodes[0].name
      this.searchForm.orgId = nodes[0].value
    },
    // 格式化后的时间
    dateChange(val) {
      this.searchForm.dateVal = val;
    },
    // 查询活动日志
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
      this.$axios.post('operationLog_query.action','jsonData=' + JSON.stringify(this.searchForm)).then(response => {
        this.tableLoading = false;
        try {
          console.table(JSON.parse(response.data))
          let funFmt = JSON.parse(response.data)
          let funPage = funFmt.pageview;
          this.pageSize = +funPage.page_size; // 每页显示条数
          this.totalrecord = +funPage.totalrecord; // 总数据条数
          this.tableData = funPage.records; // 表格数据
        } catch (e) {
          this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableLoading = false;
        this.$message({ message: "查询数据失败：" + response, type: 'error', });
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
    this.getDuty() // 获取职务
  }
}

</script>
<style lang="less" scoped>


</style>
