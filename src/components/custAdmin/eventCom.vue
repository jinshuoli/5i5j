<!-- 这个是客户管理的事件 -->
<template>
  <div>
    <el-form ref="eventForm" :inline="true">
      <el-form-item label="事件类型">
        <el-select v-model.trim="eventForm.type" placeholder="全部类型">
          <el-option label="全部类型" value=""></el-option>
          <el-option label="归属记录" value=""></el-option>
          <el-option label="资料记录" value=""></el-option>
          <el-option label="电话修改" value=""></el-option>
          <el-option label="状态记录" value=""></el-option>
          <el-option label="通话记录" value=""></el-option>
          <el-option label="短信记录" value=""></el-option>
          <el-option label="客户删除" value=""></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间区域选择 —— start-->
      <el-form-item label="时间：" tag="div">
        <el-date-picker v-model.trim="dateValue" type="datetimerange" @change="dateChange" placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>
      <!-- 时间区域选择 —— end-->
      <el-form-item label="员工姓名">
        <el-input v-model.trim="eventForm.name" placeholder="姓名(编号)"></el-input>
      </el-form-item>
      <el-form-item label="客户归属">
        <el-select v-model.trim="eventForm" placeholder="用户">
          <el-option label="用户" value=""></el-option>
          <el-option label="客户池" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="eventForm.name" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model.trim="eventForm.name" placeholder="姓名(用户名)"></el-input>
      </el-form-item>
      <el-button type="primary" @click="Queryevent">查询</el-button>
    </el-form>
    <!-- 时间区域选择 —— end-->
    <!-- 表格1 —— start-->
    <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="remarks" label="事件类型">
      </el-table-column>
      <el-table-column prop="tiem" label="时间">
      </el-table-column>
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column prop="code" label="员工编号">
      </el-table-column>
      <el-table-column prop="Attribution" label="归属">
      </el-table-column>
      <el-table-column prop="coment" :show-overflow-tooltip="true" label="内容">
      </el-table-column>
    </el-table>
    <br>
    <!-- 表格1 —— end-->
    <!-- 分页1 —— start-->
    <el-row>
      <el-col :offset="8">
        <el-pagination @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 分页1 —— end-->
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      // 事件的表单（头）
      eventForm: {
        type: '',
        name: '',
        // 时间
        dateVal: '',
      },
      dateValue: '',
      audioSrc: '',
      // 表格(客户)
      tableData: [],
      tableLoading: false,
      dialogVisible: false,
      // 分页--默认状态1
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
    };
  },
  methods: {
    /************* 事件 **************/
    // 格式化后的时间
    dateChange(val) {
      this.eventForm.dateVal = val;
    },
    // 查询
    Queryevent() {
      this.eventForm.currentPage = this.currentPage;
      this.geteventTable()
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.eventForm.currentPage = val;
      this.geteventTable()
    },
    // 获取事件表格的数据
    geteventTable() {
      // this.tableLoading = true;
      // this.$axios.post('callRecords_queryCallInList.action','jsonData=' + JSON.stringify(this.eventForm)).then(response => {
      //   this.tableLoading = false;
      //   try {
      //     let eventFmt = JSON.parse(response.data)
      //     let eventData = eventFmt.pageview
      //     this.tableData = eventData.records; // 表格数据
      //     this.pageSize = +eventData.page_size; // 每页显示条数
      //     this.totalrecord = +eventData.totalrecord; // 总数据条数
      //   } catch (e) {
      //     this.tableData = [];
          // this.$message({ message: "未查询到数据！", type: 'error', });
      //   }
      // }, response => {
      //   this.tableLoading = false;
      //   this.$message({ message: "查询数据失败：" + response, type: 'error', });
      // })
      var data = {
        "pageview": {
          "totalrecord": 3,
          "page_size": 5,
          "currentpage": 1,
          "records": [{
              "remarks": "短信",
              "tiem": "2017-5-11",
              "naem": "赵倩",
              "code": "赵玉",
              "Attribution": "北京朝阳区",
              "coment": "我们是我爱我家，您上次想要的楼盘现在正在做活动……",
            }, {
              "remarks": "短信",
              "tiem": "2017-3-26",
              "naem": "于明杰",
              "code": "李明",
              "Attribution": "河南省洛阳市",
              "coment": "我们是我爱我家，您上次想要的楼盘现在正在做活动……",
            },
            {
              "remarks": "短信",
              "tiem": "2017-3-11",
              "naem": "张思雨",
              "code": "张天",
              "Attribution": "上海",
              "coment": "我们是我爱我家，您上次预约的购房……",
            }
          ],
          "totalpage": 2,
          "previousPage": 1
        }
      }

      let custData = data.pageview
      this.tableData = custData.records;
      this.pageSize = +custData.page_size;
      this.totalrecord = +custData.totalrecord;
    },

  },
  created() {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
