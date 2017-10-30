<template>
  <div>
    <el-form ref="smsLogForm" :inline="true">
      <p> 部门 【 {{smsLogForm.dept}} 】 <a href="javaScript:void(0)" @click="openTreeDialog">选择</a> </p>
      <el-form-item>
        <el-select v-model.trim="smsLogForm.Channel" clearable placeholder="全部渠道">
          <el-option v-for="item in ChannelGet" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model.trim="smsLogForm.adviser" placeholder="员工姓名">
          <el-option label="员工姓名" value="name"></el-option>
          <el-option label="员工号码" value="number"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-if="smsLogForm.adviser === 'name'" v-model.trim="smsLogForm.nameOrUser" placeholder="按员工姓名查询"></el-input>
        <el-input v-if="smsLogForm.adviser === 'number'" v-model.trim="smsLogForm.nameOrUser" placeholder="按员工号码查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="smsLogForm.CustomerNumber" placeholder="按客户号码查询"></el-input>
      </el-form-item>
      <!-- 时间区域选择 —— start-->
      <el-form-item label="时间：" tag="div">
        <el-date-picker type="datetimerange" @change="dateChange" v-model.trim="dateValue" placeholder="选择日期范围">
        </el-date-picker>
        <el-button type="primary" @click="QuerySms">查询</el-button>
        <el-button type="primary" @click="export2Excel">导出</el-button>
      </el-form-item>
      <!-- 时间区域选择 —— end-->
    </el-form>
    <!-- 部门选择树 —— start -->
    <tree-menu :dialogState="isTreeDialog" ref="postinfo" @on-close="closeDialog" @post-node="getNodes">
    </tree-menu>
    <!-- 部门选择树 —— end -->
    <!-- 表格 —— start-->
    <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column prop="code" label="员工编号">
      </el-table-column>
      <el-table-column prop="channel_name" label="渠道">
      </el-table-column>
      <el-table-column label="员工号码">
        <template scope="scope">
          <el-tag type="primary">{{scope.row.prtms}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="otherms" label="客户号码">
        <template scope="scope">
          <el-tag type="warning">{{scope.row.otherms}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column  prop="call_time"  label="发送时间" width="180px">
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
import treeMenu from '@/components/selectSector'

export default {
  components: {
    treeMenu,
  },
  data() {
    return {
      ChannelGet: [],
      // 短信记录
      smsLogForm: {
        dept: '全部',
        deptId: '',
        Channel: '',
        adviser: 'name',
        nameOrUser: '',
        CustomerNumber: '',
        // 时间
        dateVal: '',
      },
      // 选择部门
      isTreeDialog: false,
      // 时间
      dateValue: '',
      // 表格(短信记录)
      tableData: [],
      tableLoading: false,
      // 分页--默认状态
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
      // 表格(短信记录)
    };
  },
  methods: {
    // 获取渠道下拉框信息（通话记录和短信记录的渠道一样）
    getChannel() {
      this.$axios.get('channel_channelList.action').then(response => {
        this.ChannelGet = JSON.parse(response.data)
      })
    },
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
      this.smsLogForm.dept = nodes[0].name
      this.smsLogForm.deptId = nodes[0].value
    },
    /************* 短信记录 **************/
    // 格式化后的时间2
    dateChange(val) {
      this.smsLogForm.dateVal = val;
    },
    // 查询短信
    QuerySms() {
      this.smsLogForm.currentPage = this.currentPage; // 当前页数
      this.getSmsTable()
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.smsLogForm.currentPage = val; // 当前页数
      this.getSmsTable()
    },
    // 获取短信记录表格的数据
    getSmsTable() {
      this.tableLoading = true;
      this.$axios.post('callRecords_queryCallInMessage.action','jsonData=' + JSON.stringify(this.smsLogForm)).then(response => {
        this.tableLoading = false;
        try {
          console.log(JSON.parse(response.data))
          let outgoingFmt = JSON.parse(response.data)
          let outgoingData = outgoingFmt.pageview
          this.tableData = outgoingData.records; // 表格数据
          this.pageSize = +outgoingData.page_size; // 每页显示条数
          this.totalrecord = +outgoingData.totalrecord; // 总数据条数
        } catch (e) {
          this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableLoading = false;
        this.$message({ message: "查询数据失败：" + response, type: 'error', });
      })
    },
    // 导出表格
    export2Excel() {　　　　　　
      require.ensure([], () => {　　　　　　　　
        const { export_json_to_excel } = require('@/vendor/Export2Excel');　　　　　　　　
        const tHeader = ["员工姓名", "员工编号", "渠道", "员工号码", "客户号码", "发送时间", "内容"];　　　　　　　　
        const filterVal = ["name", "code", "channel_name", "prtms", "otherms", "call_time", "content"];　　　　　　　　
        const data = this.formatJson(filterVal, this.tableData);　　　　　　　　
        export_json_to_excel(tHeader, data, "短信记录");
      })　　　　
    },
    formatJson(filterVal, jsonData) {　　　　　　
      return jsonData.map(v => filterVal.map(j => v[j]))　　　　
    },
  },
  created() {
    this.getChannel()
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
