<!-- 这是权限管理的数据权限  功能重复 废弃-->
<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" icon="plus" @click="add">添加</el-button>
      </el-col>
      <el-col :offset="6" :span="12">
        <el-col :span="6">
          <el-input v-model.trim="searchForm.name" placeholder="搜索员工姓名……"></el-input>
        </el-col>
        <el-col :offset="1" :span="6">
          <el-input v-model.trim="searchForm.address" placeholder="搜索地址……"></el-input>
        </el-col>
        <el-col :offset="1" :span="6">
          <el-input v-model.trim="searchForm.code" placeholder="搜索员工编号……"></el-input>
        </el-col>
        <el-col :offset="1" :span="2">
          <el-button type="primary" :plain="true" icon="search" @click="query">搜索</el-button>
        </el-col>
      </el-col>
    </el-row>
    <br />
    <!-- 添加弹框 —— start-->
    <el-dialog title="添加功能" :visible.sync="isDialog">
      <el-form :model="dataPForm" :rules="rules" ref="dataPForm" label-width="80px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model.trim="dataPForm.name" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="code">
          <el-input v-model.trim="dataPForm.code" placeholder="员工编号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model.trim="dataPForm.sex" label="man">男</el-radio>
          <el-radio v-model.trim="dataPForm.sex" label="woman">女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="dataPForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="员工号码" prop="tel">
          <el-input v-model.trim="dataPForm.tel" placeholder="员工号码"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model.trim="dataPForm.status" style="width:100%" placeholder="请选择状态">
            <el-option label="有效" value="V"></el-option>
            <el-option label="无效" value="I"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="org">
          {{ dataPForm.org }} <el-button @click="openTreeDialog">选择部门</el-button>
          <tree-menu :dialogState="isdialogTree" ref="postinfo" @on-close="closeDialog" @post-node="getNodes"></tree-menu>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model.trim="dataPForm.address" placeholder="地址"></el-input>
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
      <el-table-column prop="code" label="员工编号">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="tel" label="员工号码">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="orgName" label="部门">
      </el-table-column>
      <el-table-column label="状态">
        <template scope="scope">{{ scope.row.status ==='V'?'有效':'无效' }}</template>
      </el-table-column>
      <el-table-column label="状态日期">
        <template scope="scope">{{ scope.row.statusDate.time | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template scope="scope">
          <el-button size="small" type="danger" @click="delRow(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" type="warning" @click="editRow(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <!-- 表格 ——end-->
    </el-row>
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
  components:{
    treeMenu,
  },
  data() {
    return {
      // 弹框表单
      dataPForm: {
        name:'',
        code:'',
        sex:'man',
        email:'',
        tel:'',
        status:'',
        org:'全部',
        orgId:1,
        address:'',
      },
      // 添加--验证
      rules: {
        name: { required: true, message: '请输入员工员工姓名', trigger: 'blur' },
        code: { required: true, message: '请输入员工编号', trigger: 'blur' },
        sex: { required: true, message: '请输入性别', trigger: 'blur' },
        email: { required: true, message: '请输入邮箱', trigger: 'blur' },
        tel: { required: true, message: '请输入员工号码', trigger: 'blur' },
        address: { required: true, message: '请输入地址', trigger: 'blur' },
        status: { required: true, message: '请输入状态', trigger: 'blur' },
        org: { required: true },  // 部门
        date: { required: true, message: '请输入状态日期', trigger: 'blur' },
      },
      // 弹框
      isDialog: false,
      // 部门弹框
      isdialogTree:false,
      // 搜索
      searchForm: {
        name:'',
        address:'',
        code:'',
      },
      // 表格
      tableData: [],
      tableLoading: false,
      isAddEdit:1,
      // 分页
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
    }
  },
  methods: {
    // ====== 选择部门 start =========
    openTreeDialog(){
      this.isdialogTree = true;
          this.$refs.postinfo.TreeQuery();
    },
    closeDialog(){
      this.isdialogTree = false;
    },
    getNodes(nodes){
      this.isdialogTree = false;
      this.dataPForm.org =  nodes[0].name
      this.dataPForm.orgId =  nodes[0].value
    },
    // ====== 选择部门 end =========
    // 点击添加
    add() {
      this.isDialog = true;
      this.isAddEdit = 1;
    },
    // 点击修改
    editRow(i, row) {
      this.isDialog = true;
      this.isAddEdit = 0;
      this.dataPForm.userId = row.userId;
      this.dataPForm.name = row.name;
      this.dataPForm.code = row.code;
      this.dataPForm.sex = row.sex;
      this.dataPForm.email = row.email;
      this.dataPForm.tel = row.tel;
      this.dataPForm.status = row.status;
      this.dataPForm.org = row.org;
      this.dataPForm.orgId = row.orgId;
      this.dataPForm.address = row.address;
    },
    // 点击确认
    enter() {
      console.log( JSON.stringify(this.dataPForm) )
      this.$refs.dataPForm.validate((valid) => {
        if (valid) {
          this.isDialog = false;
          this.tableLoading = true;
          let url;
          this.isAddEdit === 1 ?
            url = 'sysUser_addUserRole.action?jsonData=' :
            url = 'sysUser_updateUserRole.action?jsonData='
          this.$axios.get(url + JSON.stringify(this.dataPForm)).then(response => {
            this.tableLoading = false;
            this.isAddEdit === 1 ?
              this.$message({ message: "新增成功！", type: 'success', }) :
              this.$message({ message: "修改成功！", type: 'success', });
            this.query();
          }, response => {
            this.tableLoading = false;
            this.isAddEdit === 1 ?
              this.$message({ message: "新增失败："+response, type: 'error', }) :
              this.$message({ message: "修改失败："+response, type: 'error', });
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
      this.$axios.get('sysUser_queryUserList?jsonData=' + JSON.stringify(this.searchForm)).then(response => {
        this.tableLoading = false;
        try {
          let funFmt = JSON.parse(response.data);
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

        this.$axios.get('sysUser_delete?id=' + row.userId).then(response => {
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
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  created() {

  }
}

</script>
<style lang="less" scoped>


</style>
