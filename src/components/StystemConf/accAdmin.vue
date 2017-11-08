<template>
  <div>
    <el-button type="primary" @click="clickAdd">新增</el-button>
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column prop="code" label="员工编号">
      </el-table-column>
      <el-table-column label="数据权限">
        <template scope="scope">{{ scope.row.dataPermission === 1 ?'有':'无' }}</template>
      </el-table-column>
      <el-table-column label="超级管理员">
        <template scope="scope">{{ scope.row.functionPermission === 1 ?'是':'否' }}</template>
      </el-table-column>
      <el-table-column label="冻结">
        <template scope="scope">{{ scope.row.status === 'V'?'正常':'冻结' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template scope="scope">
          <el-button size="small" type="text" @click="clickEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="text" @click="clickDel(scope.$index, scope.row)">删除</el-button>
          <!-- <el-button size="small" type="text" @click="RestPass(scope.row)">重置密码</el-button> -->
          <el-button size="small" type="text" @click="isThaw(scope.$index, scope.row)">
            {{ scope.row.status ==='V'?'冻结':'解冻' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <!-- 表格 —— end-->
    <!-- 分页 —— start-->
    <el-row>
      <el-col :offset="8">
        <el-pagination @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 分页 —— end-->
    <!-- 弹框 —— start-->
    <el-dialog title="账号管理" :visible.sync="dialogFormVisible">
      <el-form :model="AccountForm" :rules="rules" ref="AccountForm" label-width="80px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model.trim="AccountForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="code">
          <el-input v-model.trim="AccountForm.code" auto-complete="off"></el-input>
        </el-form-item>
<!--         <el-form-item label="所属公司" prop="company">
          <el-select v-model.trim="AccountForm.company" style="width:100%" placeholder="选择所属公司">
            <el-option v-for="item in CompanyGet" :label="item.descrShort" :value="item.setId" :key="item.setId"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="选择部门" prop="org">
          【 <span v-text="AccountForm.org"></span> 】 <a href="javaScript:void(0)" @click="openTreeDialog">选择</a>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox label="数据权限" v-model.trim="AccountForm.dataPermission" :true-label="1" :false-label="0"></el-checkbox>
          <!-- <el-checkbox label="超级管理员" v-model.trim="AccountForm.functionPermission" :true-label="1" :false-label="0"></el-checkbox> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOK('AccountForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框 —— end-->
    <!-- 部门选择树 —— start  -->
    <tree-menu :dialogState.sync="isTreeDialog" ref="postinfo" @on-close="closeDialog" @post-node="getNodes">
    </tree-menu>
    <!-- 部门选择树 —— end -->
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
      // 所属公司信息
      CompanyGet: [],
      // 选择部门
      isTreeDialog: false,
      // 账户管理
      tableData: [],
      tableLoading: false,
      dialogFormVisible: false,
      isAddEdit: 1,
      // 弹框表单
      AccountForm: {
        org: '全部',
        orgId: '',
        code: '',
        // pwd: '',
        // checkPass: '',
        name: '',
        // company: '',
        // functionPermission: 0,
        dataPermission: 0,
      },
      // 添加--验证
      rules: {
        name: { required: true, message: '请输入员工姓名', trigger: 'blur' },
        code: { required: true, message: '请输入员工编号', trigger: 'blur' },
        // company: { required: true, message: '请选择所属公司', trigger: 'change' },
        org: { required: true, message: '请选择部门', trigger: 'change' },
      },
      // 分页
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
    };
  },
  methods: {
    // 获取所属公司
    getCompany() {
      this.$axios.get('role_showCollectionIdAddUser.action').then(response => {
        this.CompanyGet = JSON.parse(response.data)
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
      this.AccountForm.org = nodes[0].name
      this.AccountForm.orgId = nodes[0].value
    },
    // ***** 账号管理
    // 获取表格数据
    getAccount() {
      this.tableLoading = true;
      this.$axios.get('sysUser_getUserList.action?currentPage=' + this.currentPage).then(response => {
        console.log(response.data)
        this.tableLoading = false;
        let parseData = JSON.parse(response.data)
        let inData = parseData.pageview
        this.tableData = inData.records; // 表格数据
        this.pageSize = +inData.page_size; // 每页显示条数
        this.totalrecord = +inData.totalrecord; // 总数据条数
      }, response => {
        this.$message({ message: "获取数据失败：" + response, type: 'error' })
      })
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.tableLoading = true;
      this.currentPage = val;
      this.getAccount()
    },
    // 点击新增
    clickAdd() {
      this.isAddEdit = 1;
      this.dialogFormVisible = true;
      this.AccountForm = {
        org: '全部',
        orgId: '',
        code: '',
        name: '',
        // company: '',
        // functionPermission: 0,
        dataPermission: 0,
      };
    },
    // 点击修改
    clickEdit(index, row) {
      this.isAddEdit = 0;
      this.dialogFormVisible = true;
      this.AccountForm.id = row.userId;
      this.AccountForm.code = row.code;
      this.AccountForm.name = row.name;
      // this.AccountForm.company = row.setId;
      this.AccountForm.org = row.orgName;
      this.AccountForm.orgId = row.orgId;
      // this.AccountForm.functionPermission = row.functionPermission;
      this.AccountForm.dataPermission = row.dataPermission;
    },
    // 点击确认
    dialogOK(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url;
          this.isAddEdit === 1 ?
            url = 'sysUser_addUser.action' :
            url = 'sysUser_update.action';
          // console.log(url)
          // console.log(JSON.stringify(this.AccountForm))
          this.$axios.post(url ,'jsonData=' + JSON.stringify(this.AccountForm)).then(response => {
            this.$message(JSON.parse(response.data))
            this.dialogFormVisible = false;
            this.getAccount();
            // 清空
            this.AccountForm = {
              org: '',
              orgId: '',
              code: '',
              name: '',
              // company: '',
              // functionPermission: 0,
              dataPermission: 0,
            };
          }, response => {
            this.$message({ message: "失败：" + response, type: 'error' })
          })
        } else {
          return false;
        }
      });
    },
    // 删除
    clickDel(index, row) {
      this.$confirm('您确定要将这个账户删除吗？', '删除账号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.get("sysUser_delete.action?id=" + row.userId).then(response => {
          this.$message({ message: "删除账号成功", type: 'success' });
          this.getAccount();
        }, response => {
          this.$message({ message: "删除账号失败：" + response, type: 'error' })
        })

      }).catch(() => {
        this.$message({ message: '已取消删除', type: 'info', });
      });
    },
    // 解冻-冻结
    isThaw(index, row) {
      this.$axios.post("sysUser_blocked.action","jsonData=" + JSON.stringify({ "id": row.userId, "status": row.status })).then(response => {
        this.$message({ message: "状态变更成功！", type: 'success' })
        this.getAccount();
      }, response => {
        this.$message({ message: "状态变更失败：" + response, type: 'error' })
      })
    },
    // 重置密码
    RestPass(row) {
      console.log(row.userId)
      this.$confirm('您确定要将这个账户重置密码吗？', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.get("sysUser_updatePassword.action?id=" + row.userId).then(response => {
          this.$alert('您的新密码是：' + response.data, '重置成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({ type: 'info', message: "请牢记您的新密码！" });
            }
          });
        }, response => {
          this.$message({ message: "重置失败：" + response, type: 'error' })
        })

      }).catch(() => {
        this.$message({ message: '已取消重置密码', type: 'info', });
      });
    },
  },
  created() {
    // this.getCompany();
    this.getAccount();
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
