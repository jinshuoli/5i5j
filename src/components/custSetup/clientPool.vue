<!-- 这是客户管理的客户池 -->
<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" icon="plus" @click="add">添加</el-button>
      </el-col>
    </el-row>
    <br />
    <!-- 添加弹框 —— start-->
    <el-dialog title="新增客户池" :visible.sync="isDialog" size="tiny">
      <el-form :model="addcliebtPoolForm">
        <el-form-item>
          <el-input v-model.trim="addcliebtPoolForm.name" placeholder="客户池员工姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <ul style="list-style:none;">
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="资料修改">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="状态修改">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="跟进详情">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="转入">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="转出">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="号码显示">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="号码新增">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="号码删除">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="号码编辑">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="取号呼叫">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="客户删除">
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model.trim="addcliebtPoolForm.checkList" true-label="1" false-label="0" label="取号备注">
              </el-checkbox>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button type="primary" @click="enter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹框 —— end-->
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column prop="power" label="权限">
      </el-table-column>
      <el-table-column prop="number" label="客户数量">
      </el-table-column>
      <el-table-column prop="number" label="部门访问">
      </el-table-column>
      <el-table-column label="员工访问">
        <template scope="scope">{{ scope.row.status ==='V'?'有效':'无效' }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="danger" @click="delRow(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" type="warning" @click="editRow(scope.$index, scope.row)">修改</el-button>
        </template>
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

export default {
  data() {
    return {
      // 添加
      addcliebtPoolForm: {
        name: '',
        checkList: [],
      },
      // 弹框
      isDialog: false,
      isAddEdit: 1,
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
    // 点击添加
    add() {
      this.isDialog = true;
      this.isAddEdit = 1;
    },
    // 点击修改
    editRow(i, row) {
      this.isDialog = true;
      this.isAddEdit = 0;
      this.addcliebtPoolForm.name = row.name;
      this.addcliebtPoolForm.checkList = row.checkList;
    },
    // 点击确认
    enter() {
      this.isDialog = false;
      this.tableLoading = true;
      console.log(JSON.stringify(this.addcliebtPoolForm))
      // let url;
      // this.isAddEdit === 1 ?
      //   url = 'role_add.action?jsonData=' :
      //   url = 'role_update.action?jsonData='
      // this.$axios.get(url + JSON.stringify(this.FunForm)).then(response => {
      //   this.tableLoading = false;
      //   this.isAddEdit === 1 ?
      //     this.$message({ message: "新增成功！", type: 'success', }) :
      //     this.$message({ message: "修改成功！", type: 'success', });
      //   this.query();
      // }, response => {
      //   this.tableLoading = false;
      //   this.isAddEdit === 1 ?
      //     this.$message({ message: "新增失败！", type: 'error', }) :
      //     this.$message({ message: "修改失败！", type: 'error', });
      //   return false;
      // })
    },
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
      this.$axios.post('role_queryList.action','jsonData=' + JSON.stringify(this.searchForm)).then(response => {
        this.tableLoading = false;
        console.log(response.data)
        try {
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
        this.$message({ message: "查询数据失败："+response, type: 'error', });
      })
    },
    // 删除
    delRow(i, row) {
      this.$confirm('您确定要删除这个角色吗？', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.get('role_delete.action?roleId=' + row.roleId).then(response => {
          this.$message({ message: "角色删除成功！", type: 'success', });
          this.query();
        }, response => {
          this.$message({ message: "角色删除失败："+response, type: 'error', });
        })

      }).catch(() => {
        this.$message({ type: 'info', message: '删除角色，已取消' });
      });
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
