<!-- 这个是客户管理的员工 -->
<template>
  <div>
    <el-form ref="custForm">
      <el-form-item label="选择类别:">
        <a href="JavaScript:void(0)" @click="categoryChoice">选择</a>
      </el-form-item>
      <el-form-item label="选择归属:">
        <el-select v-model.trim="custForm.ascription" placeholder="全部归属">
          <el-option label="用户" value="user"></el-option>
          <el-option label="客户池" value="clientPool" :disabled="true"></el-option>
        </el-select>
        <el-select style="width:300px" v-if="custForm.ascription === 'user'" v-model.trim="custForm.user" placeholder="请选择用户">
          <el-option v-for="item in nameGet" :label="item.userName" :value="item.userId" :key="item.userId"></el-option>
        </el-select>
        <el-input style="width:300px" v-if="custForm.ascription === 'clientPool'" v-model.trim="custForm.clientPool" placeholder="请输入客户池"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model.trim="custForm.source" placeholder="全部来源">
          <el-option v-for="item in sourceGet" :label="item.sourceName" :value="item.sourceId" :key="item.sourceId"></el-option>
        </el-select>
        <el-input style="width:300px" v-model.trim="custForm.fuzzySearch" placeholder="员工姓名/员工编号/备注(模糊搜素)"></el-input>
        <el-input style="width:300px" v-model.trim="custForm.tel" placeholder="电话号码"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="Timeform" :inline="true">
      <!-- 时间区域选择 —— start-->
      <el-form-item label="时间：" tag="div">
        <el-date-picker v-model.trim="dateValue" type="datetimerange" @change="dateChange" placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>
      <!-- 时间区域选择 —— end-->
      <el-form-item>
        <el-select v-model.trim="custForm.state" placeholder="全部状态">
          <el-option v-for="item in stateGet" :label="item.statusName" :value="item.statusId" :key="item.statusId"></el-option>
        </el-select>
        <el-button type="primary" @click="QueryCust">查询</el-button>
        <el-button type="primary" @click="addCustomer">新增</el-button>
        <el-button type="primary">导入</el-button>
        <el-dropdown>
          <el-button type="primary">
            操作<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>转出</el-dropdown-item>
            <el-dropdown-item>状态</el-dropdown-item>
            <el-dropdown-item>类别</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <!-- 类别弹框 —— start-->
    <el-dialog title="选择类别" :visible.sync="categoryDialog" size="tiny">
      <el-form ref="form" :inline="true">
        <el-form-item label="客户级别:">
          <el-radio-group v-model.trim="custForm.Customer">
            <el-radio-button v-for="item in customerGet" :label="item.typeId" name="Customer" :vuale="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio-button> ······
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品级别:">
          <el-radio-group v-model.trim="custForm.Product">
            <el-radio-button v-for="item in CProductGet" :label="item.typeId" name="Product" :vuale="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio-button> ······
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="categoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="categoryEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 类别弹框 —— end-->
    <!-- 新增弹框 —— start-->
    <el-dialog title="新增客户" :visible.sync="addCustomerDialog">
      <el-form ref="form" :inline="true">
        <el-form-item label="员工姓名:">
          <el-input style="width:200px" v-model.trim="addCustForm.name" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model.trim="addCustForm.state" placeholder="全部状态">
            <el-option v-for="item in stateGet" :label="item.statusName" :value="item.statusId" :key="item.statusId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号:">
          <el-input style="width:200px" v-model.trim="addCustForm.code" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="来源:">
          <el-select v-model.trim="addCustForm.source" placeholder="全部来源">
            <el-option v-for="item in sourceGet" :label="item.sourceName" :value="item.sourceId" :key="item.sourceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择归属:">
          <el-select v-model.trim="addCustForm.ascription" placeholder="全部归属">
            <el-option label="用户" value="user"></el-option>
            <el-option label="客户池" value="clientPool" :disabled="true"></el-option>
          </el-select>
          <el-select style="width:300px" v-if="addCustForm.ascription === 'user'" v-model.trim="addCustForm.user" placeholder="请选择用户">
            <el-option v-for="item in nameGet" :label="item.userName" :value="item.userId" :key="item.userId"></el-option>
          </el-select>
          <el-input style="width:300px" v-if="addCustForm.ascription === 'clientPool'" v-model.trim="addCustForm.clientPool" placeholder="请输入客户池"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio class="radio" v-model.trim="addCustForm.gender" label="M">男</el-radio>
          <el-radio class="radio" v-model.trim="addCustForm.gender" label="F">女</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="客户级别:">
          <el-radio-group v-model.trim="addCustForm.Customer">
            <el-radio-button v-for="item in customerGet" :label="item.typeId" name="Customer" :vuale="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio-button> ······
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品级别:">
          <el-radio-group v-model.trim="addCustForm.Product">
            <el-radio-button v-for="item in CProductGet" :label="item.typeId" name="Product" :vuale="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio-button> ······
          </el-radio-group>
        </el-form-item>
        <br />
        <el-form-item label="添加号码:">
          <el-button auto-complete="off" icon="plus" @click="addNumber">添加号码</el-button>
        </el-form-item>
        <!-- 动态号码列表 —— start -->
        <el-form-item :label="'号码 '+(index+1)" v-for="(item, index) in addCustForm.telList" :key="index">
          <el-input style="width:200px" v-model.trim="item.tel" placeholder="手机号"></el-input>
          <el-input style="width:200px" v-model.trim="item.FixedLine" placeholder="固话"></el-input>
        </el-form-item>
        <!-- 动态号码列表 —— end -->
        <el-form-item label="">
          <el-input type="textarea" :rows="2" style="width:600px;" placeholder="请输入备注" v-model.trim="addCustForm.comments"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCustomerDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCustomerEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹框 —— end-->
    <!-- 修改弹框 —— start-->
    <el-dialog title="修改客户" :visible.sync="editCustomerDialog">
      <el-form ref="form" :inline="true">
        <el-form-item label="员工姓名:">
          <el-input style="width:200px" v-model.trim="editCustForm.name" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model.trim="editCustForm.state" placeholder="全部状态">
            <el-option v-for="item in stateGet" :label="item.statusName" :value="+item.statusId" :key="+item.statusId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号:">
          <el-input style="width:200px" v-model.trim="editCustForm.code" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="来源:">
          <el-select v-model.trim="editCustForm.source" placeholder="全部来源">
            <el-option v-for="item in sourceGet" :label="item.sourceName" :value="item.sourceId" :key="item.sourceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择归属:">
          <el-select v-model.trim="editCustForm.ascription" placeholder="全部归属">
            <el-option label="用户" value="user"></el-option>
            <el-option label="客户池" value="clientPool" :disabled="true"></el-option>
          </el-select>
          <el-select style="width:300px" v-if="editCustForm.ascription === 'user'" v-model.trim="editCustForm.user" placeholder="请选择用户">
            <el-option v-for="item in nameGet" :label="item.userName" :value="item.userId" :key="item.userId"></el-option>
          </el-select>
          <el-input style="width:300px" v-if="editCustForm.ascription === 'clientPool'" v-model.trim="editCustForm.clientPool" placeholder="请输入客户池"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio class="radio" v-model.trim="editCustForm.gender" label="M">男</el-radio>
          <el-radio class="radio" v-model.trim="editCustForm.gender" label="F">女</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="客户级别:">
          <el-radio-group v-model.trim="editCustForm.Customer">
            <el-radio-button v-for="item in customerGet" :label="item.typeId" name="Customer" :vuale="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio-button> ······
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品级别:">
          <el-radio-group v-model.trim="editCustForm.Product">
            <el-radio-button v-for="item in CProductGet" :label="item.typeId" name="Product" :vuale="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio-button> ······
          </el-radio-group>
        </el-form-item>
        <br />
        <!-- 动态号码列表 —— start -->
        <el-form-item :label="'号码 '+(index+1)" v-for="(item, index) in editCustForm.telList" :key="index">
          <el-input style="width:200px" v-model.trim="item.tel" placeholder="手机号"></el-input>
          <el-input style="width:200px" v-model.trim="item.FixedLine" placeholder="固话"></el-input>
        </el-form-item>
        <!-- 动态号码列表 —— end -->
        <el-form-item label="">
          <el-input type="textarea" :rows="2" style="width:600px;" placeholder="请输入备注" v-model.trim="editCustForm.comments"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCustomerDialog = false">取 消</el-button>
        <el-button type="primary" @click="editCustomerEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹框 —— end-->
    <!-- 表格 —— start-->
    <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" prop="custId" width="55">
      </el-table-column>
      <el-table-column prop="name" label="员工姓名">
      </el-table-column>
      <el-table-column label="性别" width="80px">
        <template scope="scope">
          <span>{{ scope.row.gender ==='F' ?"女":"男" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sourceName" label="来源">
      </el-table-column>
      <el-table-column prop="comments" :show-overflow-tooltip="true" label="备注">
      </el-table-column>
      <el-table-column label="归属" width="80px">
        <template scope="scope">
          <span>{{ scope.row.belongWith ==='C' ?"客户池":"用户" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="statusName" label="状态">
      </el-table-column>
      <el-table-column prop="situation" label="跟进详情">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="电话">
        <template scope="scope">
          <span v-if="scope.row.sourceId !== 3" v-for="item in scope.row.telList">
            {{item.tel}} , {{item.FixedLine}}
          </span>
          <span v-if="scope.row.sourceId === 3">{{scope.row.telList}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template scope="scope">
          <el-button @click.native.prevent="editCustomer(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              更多<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>转出</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="delCustomer(scope.$index, scope.row)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <br />
    <!-- 分页 —— end-->
  </div>
</template>
<script>
import treeMenu from '@/components/selectSector'

export default {
  data() {
    return {
      // 获取用户
      nameGet: [],
      // 获取客户级别
      customerGet: [],
      // 获取产品级别显示
      CProductGet: [],
      // 获取来源
      sourceGet: [],
      // 获取状态
      stateGet: [],
      // 类别弹框
      categoryDialog: false,
      // 客户的表单（头）
      custForm: {
        ascription: 'user', // 归属
        user: '', // 用户
        clientPool: '', // 客户池
        source: '', // 来源
        Customer: '',
        Product: '',
        fuzzySearch: '',
        tel: '',
        state: '',
        // 时间
        dateVal: '',
      },
      // 新增客户的表单
      addCustForm: {
        ascription: 'user', // 归属
        user: '', // 用户
        clientPool: '', // 客户池
        code: '', // 员工编号
        source: '', // 来源
        gender: 'M',
        Customer: '',
        Product: '',
        telList: [{
          tel: '',
          FixedLine: '',
        }],
        state: '',
      },
      // 新增客户弹框
      addCustomerDialog: false,
      // 修改客户的表单
      editCustForm: {
        ascription: 'user', // 归属
        user: '', // 用户
        clientPool: '', // 客户池
        code: '', // 员工编号
        source: '', // 来源
        gender: 'M',
        Customer: '',
        Product: '',
        telList: [{
          tel: '',
          FixedLine: '',
        }],
        state: '',
      },
      // 修改客户弹框
      editCustomerDialog: false,
      // 时间属性
      dateValue: '',
      // 音频路径
      audioSrc: '',
      // 表格(客户)
      tableData: [],
      tableLoading: false,
      // 分页--默认状态1
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
    };
  },
  methods: {
    // 获取客户级别 && 产品级别
    getCP() {
      // 获取客户级别
      this.$axios.get('customer_queryCustomerType.action').then(response => {
        this.customerGet = JSON.parse(response.data)
      })
      // 获取产品级别显示
      this.$axios.get('customer_queryCustomerProductType.action').then(response => {
        this.CProductGet = JSON.parse(response.data)
      })
    },
    queryUsername() { // 查询用户
      return this.$axios.get('customer_queryUsername.action');
    },
    queryCustomerSource() { // 查询来源
      return this.$axios.get('customer_queryCustomerSource.action');
    },
    queryCustomerStatus() { // 查询状态
      return this.$axios.get('customer_queryCustomerStatus.action');
    },
    // 获取 用户 && 来源 && 状态
    getSSN() {
      // // 获取用户
      // this.$axios.get('customer_queryUsername.action').then(response => {
      //   this.nameGet = JSON.parse(response.data)
      // })
      // // 获取来源
      // this.$axios.get('customer_queryCustomerSource.action').then(response => {
      //   this.sourceGet = JSON.parse(response.data)
      // })
      // // 获取状态
      // this.$axios.get('customer_queryCustomerStatus.action').then(response => {
      //   this.stateGet = JSON.parse(response.data)
      // })

      // 并发请求 （用户，来源，状态）
      this.$axios.all([this.queryUsername(), this.queryCustomerSource(), this.queryCustomerStatus()])
        .then(this.$axios.spread((queryUsername, queryCustomerSource, queryCustomerStatus) => {
          console.log(queryUsername.data)
          this.nameGet = JSON.parse(queryUsername.data)
          this.sourceGet = JSON.parse(queryCustomerSource.data)
          this.stateGet = JSON.parse(queryCustomerStatus.data)
        }, response => {
          this.$message({ message: "获取 用户 && 来源 && 状态 失败" + response, type: 'error', });
        }));
    },
    // ======== 类别弹框
    // 选择类别
    categoryChoice() {
      this.categoryDialog = true;
      this.getCP();
    },
    // 确认类别
    categoryEnter() {
      this.categoryDialog = false
    },
    // ======== 新增客户
    // 新增客户
    addCustomer() {
      this.addCustomerDialog = true;
      this.getCP();
      this.getSSN();
    },
    // 动态- 添加号码
    addNumber() {
      this.addCustForm.telList.push({ tel: '', FixedLine: '', })
    },
    // 确认新增客户
    addCustomerEnter() {
      console.log(JSON.stringify(this.addCustForm))
      this.$axios.post('customer_CustomerAdd.action','jsonData=' + JSON.stringify(this.addCustForm)).then(response => {
        this.addCustomerDialog = false;
        if (response.data === 'success') {
          this.QueryCust();
          this.$message({ message: "新增成功！", type: 'success', });
        } else if (response.data === 'false') {
          this.$message({ message: "用户不存在！", type: 'error', });
        } else {
          this.$message({ message: "新增失败！", type: 'error', });
        }
      }, response => {
        this.addCustomerDialog = false;
        this.$message({ message: "新增失败：" + response, type: 'error', });
      })
    },
    // ======== 修改客户
    // 修改客户
    editCustomer(i, row) {
      this.editCustomerDialog = true;
      this.getCP();
      this.getSSN();

      this.editCustForm.custId = row.custId
      this.editCustForm.name = row.name
      this.editCustForm.state = +row.statusId
      this.editCustForm.code = row.code
      this.editCustForm.source = row.sourceId
      this.editCustForm.ascription = row.belongWith === 'P' ? 'clientPool' : 'user'
      this.editCustForm.user = row.userId
      this.editCustForm.clientPool = row.clientPool
      this.editCustForm.gender = row.gender
      this.editCustForm.Customer = row.clevelId
      this.editCustForm.Product = row.plevelId
      this.editCustForm.comments = row.comments
      this.editCustForm.telList = row.telList
    },
    // 动态- 添加号码
    editNumber() {
      this.editCustForm.telList.push({ tel: '', FixedLine: '', })
    },
    // 确认修改客户
    editCustomerEnter() {
      console.log(JSON.stringify(this.editCustForm))
      this.$axios.post('customer_CustomerUpdate.action','jsonData=' + JSON.stringify(this.editCustForm)).then(response => {
        this.editCustomerDialog = false;
        console.log(response.data)
        if (response.data === 'success') {
          this.QueryCust();
          this.$message({ message: "修改成功！", type: 'success', });
        } else if (response.data === 'false') {
          this.$message({ message: "用户不存在！", type: 'error', });
        } else {
          this.$message({ message: "修改失败！", type: 'error', });
        }
      }, response => {
        this.editCustomerDialog = false;
        this.$message({ message: "修改失败：" + response, type: 'error', });
      })
    },
    // ========  删除
    delCustomer(i, row) {
      this.$axios.get('customer_CustomerDelete.action?custId=' + row.custId).then(response => {
        console.log(response.data)
        this.QueryCust();
        this.$message({ message: "删除成功！", type: 'success', });
      }, response => {
        this.$message({ message: "删除失败：" + response, type: 'error', });
      })
    },
    // ======== 查询
    // 查询
    QueryCust() {
      this.custForm.currentPage = this.currentPage;
      this.getCustTable()
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.custForm.currentPage = val;
      this.getCustTable()
    },
    // 获取客户表格的数据
    getCustTable() {
      this.tableLoading = true;
      this.$axios.post('customer_queryCustomerList.action','jsonData=' + JSON.stringify(this.custForm)).then(response => {
        this.tableLoading = false;
        try {
          let custFmt = JSON.parse(response.data)
          let custData = custFmt.pageview
          this.tableData = custData.records; // 表格数据
          this.pageSize = +custData.page_size; // 每页显示条数
          this.totalrecord = +custData.totalrecord; // 总数据条数
          console.log(response.data)
        } catch (e) {
          this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableLoading = false;
        this.$message({ message: "查询数据失败：" + response, type: 'error', });
      })
    },
    // 格式化后的时间
    dateChange(val) {
      this.custForm.dateVal = val;
    },
  },
  created() {
    this.getSSN();
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
