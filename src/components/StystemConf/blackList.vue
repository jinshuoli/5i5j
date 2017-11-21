
<template>
  <div>
  	<!-- 查询的from表单 —— start -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
	  <el-form-item>
	    <el-input v-model="formInline.acms" placeholder="请输入小号"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="onSubmit">查询</el-button>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="AddStaffDialog = true">新增</el-button>
	  </el-form-item>
	</el-form>
	<!-- 查询的from表单 —— end -->
    <!-- 新增号码弹框 —— start -->
    <el-dialog title="新增号码" :visible.sync="AddStaffDialog" @close="closeTreeInfo">
      <el-form :model="AddStaffV" :inline="true">
        <el-form-item label="虚拟号">
          <el-input v-model.trim="AddStaffForm.acms" auto-complete="off" placeholder="请输入虚拟号"></el-input>
        </el-form-item>
        <el-form-item label="黑名单号码：">
          <el-button auto-complete="off" icon="plus" @click="AddRow(AddStaffForm.list)">添加号码</el-button>
          <span style="color:gray">（黑名单号码）</span>
        </el-form-item>
        <!-- 动态添加号码 —— start -->
        <el-form-item v-for="(items,index) in AddStaffForm.numberList" :key="index">
          <i class="el-icon-close" @click="delRow(AddStaffForm.numberList,items)"></i>
          <el-select style="width:160px;" v-model.trim="items.channelVal" placeholder="外呼">
            <el-option v-for="(item,index) in items.channel" :value="item.value" :label="item.label" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 动态添加号码 —— end -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddStaffDialog = false">取 消</el-button>
        <el-button type="primary" @click="AddStaff">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增号码弹框 —— end -->
	<el-row>
      <!-- 表格 ——start-->
      <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%" @selection-change="tableSelectionChange">
        <el-table-column prop="list" label="黑名单号码">
        </el-table-column>
        <el-table-column prop="acms" label="小号号码">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="seeNumber(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <!-- 表格 ——end-->
      <!-- 分页 —— start-->
      <el-col :offset="8">
        <el-pagination @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
        </el-pagination>
      </el-col>
      <!-- 分页 —— end-->
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
         acms: ''  //小号
       },
 	  // 号码表格
      tableData: [],
      tableLoading: false,
      // 分页
      pageSize: 5,    // 每页显示条数
      totalrecord: 0, // 总数据条数
      currentPage: 1, // 分页选中
      // 新增
      AddStaffDialog: false,
      AddStaffV: {},
      // 新增员工表单
      AddStaffForm: {
        acms: '',
        list: '',
      },
    };
  },
  methods: {
  	// 查询号码
    onSubmit(){
        this.getNumberTable()
    },
    // 获取号码表格的数据
    getNumberTable() {
      this.tableLoading = true;
      this.$axios.post('blackList_findlist','jsonData=' + JSON.stringify(this.formInline)).then(response => {
        this.tableLoading = false;
        try {
          let numberData = JSON.parse(response.data)
          this.pageSize = +numberData.pageview.page_size; // 每页显示条数
          this.totalrecord = +numberData.pageview.totalrecord; // 总数据条数
          this.tableData = numberData.pageview.records;
          console.log(numberData.pageview.records)
        } catch (e) {
          this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: "查询数据失败：" + response, });
      })
    },

  },
  created() {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
