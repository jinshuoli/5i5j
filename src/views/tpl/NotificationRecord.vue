<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="22">
        <h3>通知记录</h3>
        <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="挂机记录" name="first">
            <p> 部门 【 {{OnHookForm.dept}} 】 <a href="javaScript:void(0)" @click="openTreeDialog">选择</a> </p>
            <el-form ref="OnHokForm" :inline="true">
              <el-form-item>
                <el-select v-model.trim="OnHookForm.state" clearable placeholder="所有状态">
                  <el-option label="发送成功" value="S"></el-option>
                  <el-option label="发送失败" value="F"></el-option>
                </el-select>
                <el-select v-model.trim="OnHookForm.AllScenes" clearable placeholder="所有场景">
                  <el-option v-for="item in scenesGet" :label="item.templateName" :value="item.templateName" :key="item.templateId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model.trim="OnHookForm.userName" placeholder="按用员工姓名查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model.trim="OnHookForm.targetNumber" placeholder="按客户号码查询"></el-input>
              </el-form-item>
              <!-- 时间区域选择 —— start-->
              <el-form-item tag="div">
                <el-date-picker v-model.trim="dateValue" type="datetimerange" @change="dateChange" placeholder="选择日期范围">
                </el-date-picker>
                <el-button type="primary" @click="QueryNotifyRecord">查询</el-button>
                <el-button type="primary" :loading="exportLoading" @click="export2file">导出</el-button>
              </el-form-item>
              <!-- 时间区域选择 —— end-->
            </el-form>
            <!-- 部门选择树 —— start -->
            <tree-menu :dialogState="isTreeDialog" ref="postinfo" @on-close="closeDialog" @post-node="getNodes">
            </tree-menu>
            <!-- 部门选择树 —— end -->
            <!-- 表格1 —— start-->
            <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" border tooltip-effect="dark" style="width: 100%">
              <el-table-column prop="timestamp" label="时间" width="200px">
              </el-table-column>
              <el-table-column prop="targetNumber" label="客户号码">
              </el-table-column>
              <el-table-column label="状态">
                <template scope="scope">
                  <el-tag v-if="scope.row.state ==='S'" type="success">发送成功</el-tag>
                  <el-tag v-if="scope.row.state !=='S'" type="danger">发送失败</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="scenario" label="场景">
              </el-table-column>
              <el-table-column prop="content" :show-overflow-tooltip="true" label="内容">
              </el-table-column>
              <el-table-column prop="cntsms" label="计费(条)">
              </el-table-column>
              <el-table-column prop="userName" label="员工姓名">
              </el-table-column>
              <el-table-column label="更多">
                <template scope="scope">
                  <el-button size="small" type="text" @click="handleSee(scope.$index, scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <!-- 表格1 —— end-->
            <!-- 导出的弹框 —— start -->
            <el-dialog title="导出样例" :visible.sync="export2fileDialog" size="tiny">
              <span>请填写导出的样例文件后导入</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="export2fileDialog = false">取 消</el-button>
                <a :href="fileUrl" target="_blank" :download="fileUrl">
                  <el-button type="primary" @click="export2fileDialog = false">确 定</el-button>
                </a>
              </span>
            </el-dialog>
            <!-- 导出的弹框 —— end -->
            <!-- 分页 —— start-->
            <el-row>
              <el-col :offset="8">
                <el-pagination @size-change="currentPage" @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
                </el-pagination>
              </el-col>
            </el-row>
            <!-- 分页 —— end-->
          </el-tab-pane>
          <el-tab-pane label="系统通知" name="second">
            <p>Dialog</p>
            <el-button>Open Dialog</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
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
      activeName: 'first',
      // 场景下拉框
      scenesGet: [],
      // 呼出记录的表单（头）
      OnHookForm: {
        dept: '全部',
        deptId: '',
        userName: '',
        AllScenes: '',
        targetNumber: '',
        state: '',
        dateVal: '',
      },
      // 选择部门
      isTreeDialog: false,
      // 时间
      dateValue: '',
      // 导出
      export2fileDialog: false,
      exportLoading: false,
      fileUrl: '',
      // 表格
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
    tabClick(tab, event) {
      // console.log(tab, event);
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
      this.OnHookForm.dept = nodes[0].name
      this.OnHookForm.deptId = nodes[0].value
    },
    // 获取场景下拉框数据
    getScenes() {
      this.$axios.get('template_getfindNotificationScenario.action').then(response => {
        console.table(JSON.parse(response.data))
        this.scenesGet = JSON.parse(response.data)
      })
    },
    // 格式化后的时间1
    dateChange(val) {
      this.OnHookForm.dateVal = val;
    },
    // 呼出查询
    QueryNotifyRecord() {
      this.OnHookForm.currentPage = this.currentPage;
      this.getnotifyRecordTable()
    },
    // 分页变化时触发1
    CurrentPageChange(val) {
      this.OnHookForm.currentPage = val;
      this.getnotifyRecordTable()
    },
    // 获取通话记录表格的数据
    getnotifyRecordTable() {
      this.tableLoading = true;
      console.log(JSON.stringify(this.OnHookForm))
      this.$axios.post('notifyRecord_getfindRecord.action','jsonData=' + JSON.stringify(this.OnHookForm)).then(response => {
        this.tableLoading = false;
        console.log(response.data)
        try {
          let notifyRecordFmt = JSON.parse(response.data)
          let notifyRecordData = notifyRecordFmt.pageview
          this.tableData = notifyRecordData.records; // 表格数据
          this.pageSize = +notifyRecordData.page_size; // 每页显示条数
          this.totalrecord = +notifyRecordData.totalrecord; // 总数据条数
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
    export2file() {　　　　　　
      this.exportLoading = true;
      this.$axios.post('notifyRecord_notifyRecordExportExcel.action', 'jsonData=' + JSON.stringify(this.OnHokForm)).then(response => {
        var res = JSON.parse(response.data)
        if (res.result == 'success') {
          this.fileUrl = res.filepath;
          this.export2fileDialog = true;
        } else {
          this.$message({ message: res.cause, type: 'error' });
        }
        this.exportLoading = false;
      }, response => {
        this.exportLoading = false;
        this.$message({ message: "导出失败：" + response, type: 'error' });
      })　　　
    },
    formatJson(filterVal, jsonData) {　　　　　　
      return jsonData.map(v => filterVal.map(j => v[j]))　　　　
    },
    // 查看
    handleSee(i, row) {
      console.log(row.callId)
      this.$axios.get('notifyRecord_getfindRecordMore.action?id=' + row.callId).then(response => {
        try {
          let resData = JSON.parse(response.data),
              date1 = new Date(resData.callTime.time),
              callTime = formatDate(date1, 'yyyy-MM-dd hh:mm'),
              date2 = new Date(resData.releaseTime.time),
              releaseTime = formatDate(date2, 'yyyy-MM-dd hh:mm');
          const h = this.$createElement;
          this.$msgbox({
            title: '详细信息',
            message: h('ul', { style: 'line-height:50px;' }, [
                      h('li', null, '用户名：' + resData.userName),
                      h('li', null, '主叫：' + resData.prtms),
                      h('li', null, '被叫：' + resData.otherms),
                      h('li', null, '小号：' + resData.acms),
                      h('li', null, '呼叫时间：' + callTime),
                      h('li', null, '结束时间：' + releaseTime),
                    ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => { done(); }
          })
        } catch (e) {
          this.$message({ message: "未查询到详细信息！", type: 'error', });
        }
      })
    },
  },
  created() {
    this.getScenes();
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
