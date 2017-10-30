<!-- 这是权限管理的角色管理 -->
<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-input v-model.trim="searchForm.roleName" placeholder="搜索角色名"></el-input>
      </el-col>
      <el-col :offset="1" :span="4">
        <el-select v-model.trim="searchForm.status" clearable placeholder="搜索状态">
          <el-option label="有效" value="V"></el-option>
          <el-option label="无效" value="I"></el-option>
        </el-select>
      </el-col>
      <el-col :offset="1" :span="2">
        <el-button type="primary" :plain="true" icon="search" @click="query">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="plus" @click="add">添加</el-button>
      </el-col>
    </el-row>
    <br />
    <!-- 添加&&修改弹框 —— start-->
    <el-dialog title="角色功能" :visible.sync="isDialog">
      <el-form :model="FunForm" :rules="rules" ref="FunForm" label-width="80px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model.trim="FunForm.roleName" placeholder="角色名"></el-input>
        </el-form-item>
        <el-form-item label="选择状态" prop="status">
          <el-select v-model.trim="FunForm.status" clearable style="width:100%" placeholder="选择状态">
            <el-option label="有效" value="V"></el-option>
            <el-option label="无效" value="I"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model.trim="FunForm.comment" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button type="primary" @click="enter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加&&修改弹框 —— end-->
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column type="index" label="ID"  width="80">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名">
      </el-table-column>
      <el-table-column label="状态">
        <template scope="scope">{{ scope.row.status ==='V'?'有效':'无效' }}</template>
      </el-table-column>
      <el-table-column label="状态日期">
        <template scope="scope">{{ scope.row.statusDate.time | dateFormat }}</template>
      </el-table-column>
      <el-table-column prop="comment" label="备注">
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
      // 所属公司信息
      CompanyGet: [],
      // 添加&&修改
      FunForm: {
        roleName: '',
        status: '',
        comment: '',
      },
      // 添加--验证
      rules: {
        roleName: { required: true, message: '请输入名称', trigger: 'blur' },
        status: { required: true, message: '请选择状态', trigger: 'blur' },
      },
      // 弹框
      isDialog: false,
      isAddEdit: 1,
      // 搜索
      searchForm: {
        roleName: '',
        status: '',
      },
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
      this.FunForm.roleId = row.roleId;
      this.FunForm.roleName = row.roleName;
      this.FunForm.status = row.status;
      this.FunForm.comment = row.comment;
    },
    // 点击确认
    enter() {
      this.$refs.FunForm.validate((valid) => {
        if (valid) {
          this.isDialog = false;
          this.tableLoading = true;
          let url;
          this.isAddEdit === 1 ?
            url = 'role_add.action?jsonData=' :
            url = 'role_update.action?jsonData='
          this.$axios.get(url + JSON.stringify(this.FunForm)).then(response => {
            this.tableLoading = false;
            this.isAddEdit === 1 ?
              this.$message({ message: "新增成功！", type: 'success', }) :
              this.$message({ message: "修改成功！", type: 'success', });
            this.query();
            this.FunForm = {
              roleName: '',
              status: '',
              comment: '',
            };
          }, response => {
            this.tableLoading = false;
            this.isAddEdit === 1 ?
              this.$message({ message: "新增失败：" + response, type: 'error', }) :
              this.$message({ message: "修改失败：" + response, type: 'error', });
            return false;
          })
        } else {
          return false;
        }
      });
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
        this.tableLoading = false;
        this.$message({ message: "查询数据失败：" + response, type: 'error', });
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
          this.$message({ message: "角色删除失败：" + response, type: 'error', });
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
