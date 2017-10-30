<!-- 这是外呼记录的陌生记录 -->
<template>
  <div>
    <!-- 公共的外呼记录头部 start-->
    <head-form @on-change-query="getTableData" @on-export-excel="export2Excel" ref="search"></head-form>
    <!-- 公共的外呼记录头部 end-->
    <!-- 表格 —— start-->
    <el-table ref="multipleTable" v-loading="tableLoading" :data="respData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column prop="" label="客户标识">
      </el-table-column>
      <el-table-column prop="otherms" label="客户号码">
      </el-table-column>
      <el-table-column prop="prtms" label="员工号码">
      </el-table-column>
      <el-table-column label="发送时间">
        <template scope="scope">
          {{scope.row.call_time.time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="content" :show-overflow-tooltip="true" label="内容">
      </el-table-column>
    </el-table>
    <br>
    <!-- 表格 —— end-->
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
import headForm from '@/components/CallRecord/header'

export default {
  components: {
    headForm,
  },
  data() {
    return {
      // 表格
      respData: [],
      tableLoading: false,
      // 分页
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数

      changePage: 1, //  分页变化时的页数
    };
  },
  methods: {
    getTableData(val) {
      this.tableLoading = true;
      val.currentPage = this.changePage // 将分页变化时的页数传递个 当前选中页;
      this.$axios.post('callRecords_queryCallOutStrangerRecords.action','jsonData=' + JSON.stringify(val)).then(response => {
        this.tableLoading = false;
        try {
          let parseData = JSON.parse(response.data)
          let inData = parseData.pageview
          this.respData = inData.records; // 表格数据
          this.pageSize = +inData.page_size; // 每页显示条数
          this.totalrecord = +inData.totalrecord; // 总数据条数
        } catch (e) {
          this.respData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableLoading = false;
        this.$message({ message: "查询数据失败：" + response, type: 'error', });
      })
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.changePage = val;
      this.$refs.search.emitTable();
    },
    // 导出表格
    export2Excel() {　　　　　　
      require.ensure([], () => {　　　　　　　　
        const { export_json_to_excel } = require('@/vendor/Export2Excel');　　　　　　　　
        const tHeader = ["员工", "客户标识", "客户号码", "员工号码", "发送时间", "内容"];　　　　　　　　
        const filterVal = ["name", "", "otherms", "prtms", "time", "content"];　　　　　　　　
        const data = this.formatJson(filterVal, this.respData);　　　　　　　　
        export_json_to_excel(tHeader, data, "陌生记录");
      })　　　　
    },
    formatJson(filterVal, jsonData) {　　　　　　
      return jsonData.map(v => filterVal.map(j => v[j]))　　　　
    },
  },
  // 时间格式化--后台传的时间戳格式化
  filters: {
    dateFormat(time) {
      if (time == undefined) { return "未获取到时间"; }
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
