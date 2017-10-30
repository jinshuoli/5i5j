<!-- 这是员工管理的号码 -->
<template>
  <div>
    <br />
    <!-- 查询的form表单 —— start -->
    <el-form ref="Nstateform" :inline="true">
      <el-form-item>
        <el-select v-model.trim="numberForm.state" placeholder="全部状态">
          <el-option label="全部状态" value="all"></el-option>
          <el-option label="使用" value="Y"></el-option>
          <el-option label="未使用" value="I"></el-option>
        </el-select>
        <el-select v-model.trim="numberForm.channel" clearable placeholder="全部渠道">
          <el-option v-for="item in ChannelGet" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
        <el-select v-model.trim="numberForm.nameOrNum" placeholder="员工姓名">
          <el-option label="员工姓名" value="name"></el-option>
          <el-option label="小号" value="number"></el-option>
        </el-select>
        <el-input v-model.trim="numberForm.UnameOrNum" style="width:190px" placeholder="请输入员工姓名或小号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryNumber">查询</el-button>
        <el-button type="primary" :loading="exportLoading" @click="export2Excel">导出</el-button>
        <!-- <el-button type="primary" @click="delNumber">删除</el-button> -->
      </el-form-item>
      <!-- <el-form-item> -->
      <!-- <el-button type="primary" @click="NewAddNumber">新增</el-button> -->
      <!-- <el-button type="primary" @click="openUpFileDialog(1)">渠道分配</el-button> -->
      <!-- <el-button type="primary" @click="openUpFileDialog(2)">外呼分配</el-button> -->
      <!-- </el-form-item> -->
    </el-form>
    <!-- 查询的form表单 —— end -->
    <!-- 导出的弹框 —— start -->
    <el-dialog title="导出号码" :visible.sync="export2fileDialog" size="tiny">
      <span>导出文件为查询到的数据</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="export2fileDialog = false">取 消</el-button>
        <a :href="fileUrl" target="_blank" :download="fileUrl">
          <el-button type="primary" @click="export2fileDialog = false">确 定</el-button>
        </a>
      </span>
    </el-dialog>
    <!-- 导出的弹框 —— end -->
    <!-- 渠道分配 && 外呼分配 弹框 ——start-->
    <el-dialog title="号码分配" :visible.sync="dialogUpFile">
      <el-form :model="uploadFile">
        <el-form-item label="上传文件：">
          <el-upload ref="uploadFile" action="/5i5j/number_importExcel.action" accept="text/csv" name="numFile" :auto-upload="false">
            <el-button type="primary" icon="upload">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">请根据下载的样例文件格式上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="下载样例：">
          <a href="/5i5j/assign-media.xls" v-if="isXls === 1">
            <el-button type="info" icon="document">样例文件下载</el-button>
          </a>
          <a href="/5i5j/assign-callout.xls" v-if="isXls === 2">
            <el-button type="info" icon="document">样例文件下载</el-button>
          </a>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpFile = false">取 消</el-button>
        <el-button type="primary" @click="pushAllot">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 渠道分配 && 外呼分配 弹框 ——end-->
    <el-row>
      <!-- 表格 ——start-->
      <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%" @selection-change="tableSelectionChange">
   <!--      <el-table-column type="selection" width="50">
        </el-table-column> -->
        <el-table-column prop="acms" label="小号">
        </el-table-column>
        <el-table-column prop="city" label="归属地">
        </el-table-column>
        <el-table-column prop="channel_name" label="渠道">
        </el-table-column>
        <el-table-column prop="code" label="员工编号">
        </el-table-column>
        <el-table-column prop="name" label="员工姓名">
        </el-table-column>
        <el-table-column label="上线">
          <template scope="scope">{{ scope.row.state==='U'?'是':'否' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="seeNumber(scope.$index, scope.row)">查看</el-button>
            <el-button size="small" type="text" @click="unBind(scope.$index, scope.row)">解绑</el-button>
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
import bus from '@/bus' //引用相同文件

export default {
  data() {
    return {
      ChannelGet: [],
      // 号码 select
      numberForm: {
        state: 'all',
        channel: '',
        nameOrNum: 'name',
        UnameOrNum: '',
      },
      // 导出的loding
      exportLoading: false,
      // 导出的弹框
      export2fileDialog: false,
      // 导出的文件路径
      fileUrl:'',
      // 号码表格
      tableData: [],
      tableLoading: false,
      // 判断下载那个样例文件
      isXls: 1,
      // 渠道分配（弹框默认值）
      dialogUpFile: false,
      uploadFile: {},
      // 外呼分配（弹框默认值）
      // 分页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
      currentPage: 1, // 分页选中
      multipleSelection: [], // 表格多选框的值
      // 详细信息表格
      InfoTable: [],
      page: 1
    }
  },
  methods: {
    // 获取渠道下拉框信息
    getChannel() {
      this.$axios.get('channel_channelList.action').then(response => {
        this.ChannelGet = JSON.parse(response.data)
      })
    },
    // *****号码
    // 查询号码
    queryNumber() {
      this.numberForm.currentPage = this.currentPage;
      this.getNumberTable()
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.numberForm.currentPage = val;
      this.getNumberTable()
    },
    // 表格多选框变化时触发
    tableSelectionChange(val) {
      this.multipleSelection = val.map((r) => { return r.acms });
      console.log(this.multipleSelection)
    },
    // 获取号码表格的数据
    getNumberTable() {
      this.tableLoading = true;
      this.$axios.post('number_queryNumberList.action','jsonData=' + JSON.stringify(this.numberForm)).then(response => {
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
    // 新增（媒体号码）
    NewAddNumber() {
      this.$prompt('请输入媒体号码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '媒体号码格式不正确'
      }).then(({ value }) => {
        this.$axios.get('number_add.action?acms=' + value).then(response => {
          this.$message({ type: 'success', message: '新增媒体号码成功' });
          this.queryNumber();
        }, response => {
          this.$message({ type: 'error', message: "新增媒体号码失败：" + response });
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '取消输入' });
      });
    },
    // 删除
    delNumber() {
      if (this.multipleSelection.length <= 0) {
        this.$message({ type: 'info', message: '请选择您要删除的账户' });
        return;
      }
      this.$confirm('您确定要将选中的员工编号删除吗？', '删除账户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get("number_delete.action?acms=" + JSON.stringify(this.multipleSelection)).then(response => {
          this.$message({ type: 'success', message: '删除账户成功' });
          this.queryNumber();
        }, response => {
          this.$message({ type: 'error', message: "删除账户失败：" + response });
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除账户' });
      });
    },
    // 导出
    // 导出表格
    export2Excel() {
      this.exportLoading = true;
      this.$axios.post('number_exportExcel.action','jsonData=' + JSON.stringify(this.numberForm)).then(response => {
        console.log(response.data)
        var res = JSON.parse(response.data)
        if (res.result == 'success') {
          // window.open(res.filepath);
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
    // 打开 渠道分配 && 外呼分配 弹框
    openUpFileDialog(isXls) {
      this.dialogUpFile = true;
      this.isXls = isXls; // 判断下载那个样例文件
    },
    // 渠道分配 && 外呼分配
    pushAllot() {
      console.log("uploadAllot")
      this.$refs.uploadFile.submit();
      this.dialogUpFile = false;
      this.$message({ message: "上传成功！", type: 'success', });
      this.queryNumber();
    },
    // 查看
    seeNumber(i, row) {
      let data = {
        "acms": row.acms,
        'currentPage': this.page
      }
      console.log(data)
      this.$axios.post('number_queryStaffByAcms.action','jsonData=' + JSON.stringify(data)).then(response => {
        let searchData = JSON.parse(response.data)
        if (searchData.totalrecord > 0) {
          this.$emit('on-search-table-info', response.data, "number")
        } else {
          this.$message({ type: 'info', message: "未查询到数据！" });
        }
      }, response => {
        this.$message({ type: 'error', message: "查看账户失败：" + response });
      })
    },
    // 解绑
    unBind(i, row){
      this.$confirm('此操作将会解绑当前号码，您确定要继续吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('staff_singleUnSub.action?jsonData='+ JSON.stringify({"code":row.code,"acms":row.acms}) ).then(response => {
          this.$message({ message: "解绑成功！", type: 'success' });
          this.queryNumber();
        }, response => {
          this.$message({ message: "解绑失败：" + response, type: 'error', });
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消解绑' });
      });
    }
  },
  created() {
    this.getChannel()
    bus.$on("on-number-page-change", (page) => {
      this.seeNumber()
      console.log("on-page", page)
      this.page = page || 1;
    })
  }
}

</script>
<style lang="less" scoped>
.el-dropdown-menu__item>p {
  margin: 0px;
}

</style>
