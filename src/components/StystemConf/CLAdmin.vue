<template>
  <div>
    <el-button type="primary" @click="clickCL">提交彩铃</el-button>
    <el-button type="primary" @click="updataCL">状态刷新</el-button>
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column prop="name" label="彩铃名称">
      </el-table-column>
      <el-table-column label="下载">
        <template scope="scope">
          <a :href="scope.row.url" target="_blank" :download="scope.row.url">下载</a>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template scope="scope">{{ scope.row.state==='V' ?'正常':'冻结' }}</template>
      </el-table-column>
       <el-table-column prop="descrShort" label="所属城市">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="danger" @click="DelCL(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table><br />
    <!-- 表格 ——end-->
    <!-- 分页 —— start-->
    <el-row>
      <el-col :offset="8">
        <el-pagination @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 分页 —— end-->
    <!-- 彩铃弹框 ——start-->
    <el-dialog title="提交彩铃" :visible.sync="dialogCL">
      <el-form :model="pushcl" label-width="80px">
        <el-form-item label="彩铃名称">
          <el-input v-model.trim="CLform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择城市">
          <el-select v-model.trim="CLform.city" placeholder="所属城市" style="width: 100%">
            <el-option v-for="item in CityGet" :label="item.descrShort" :value="item.setId" :key="item.setId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传彩铃">
          <el-upload ref="uploadCL" action="/5i5j/ringtone_uploadRingtone.action" accept="audio/*" name="bgm" :data="{'form': JSON.stringify(CLform)}" :on-success="flieSuccess" :on-error="fileError" :file-list="fileList" :auto-upload="false">
            <el-button type="primary" icon="upload">选择彩铃</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp3或wav且不超过6M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCL = false">取 消</el-button>
        <el-button type="primary" @click="pushCL">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 彩铃弹框 ——end-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取城市
      CityGet:[],
      // 彩铃管理
      tableData: [],
      tableLoading: false,
      // 彩铃表单
      CLform:{
        name:'',
        city:''
      },
      fileList: [],
      pushcl: {},
      dialogCL: false,
      // 分页--默认状态
      currentPage: 1, // 选中页
      pageSize: 8, // 每页显示条数
      totalrecord: 0, // 总数据条数

    };
  },
  methods: {
    // ***** 彩铃
    clickCL() {
      this.dialogCL = true
      this.CLform = {
        name:'',
        city:''
      },
      this.fileList = [];
      this.pushcl = {};
      this.getCity()
    },
    // 获取城市下拉框信息
    getCity() {
      this.$axios.get('role_showCollectionIdBySetId.action').then(response => {
        this.CityGet = JSON.parse(response.data)
      })
    },
    // 提交彩铃模板
    pushCL() {
      console.log("pushCL")
      this.$refs.uploadCL.submit();
      this.dialogCL = false;
    },
    // 文件上传成功的钩子
    flieSuccess(response, file, fileList) {
      console.log("flieSuccess:", response)
      var res = JSON.parse(response)
      if (res.result == 'success') {
      this.$message({ message: "上传成功！", type: 'success' });
        this.updataCL();
      } else {
        this.$message({ message: res.cause, type: 'error' });
      }
    },
    // 文件上传失败的钩子
    fileError(err, file, fileList) {
      this.$message({ message: "上传彩铃失败，文件过大！", type: 'error' });
    },
    // 刷新状态
    updataCL() {
      this.tableLoading = true;
      this.$axios.get('ringtone_getfindRingtone.action?currentPage=' + this.currentPage).then(response => {
        this.tableLoading = false;
        console.log(response.data)
        try {
           let parseData = JSON.parse(response.data)
            let inData = parseData.pageview
            this.tableData = inData.records; // 表格数据
            this.pageSize = +inData.page_size; // 每页显示条数
            this.totalrecord = +inData.totalrecord; // 总数据条数
        } catch (e) {
          this.tableData = [];
          this.$message({ message: "未查询到数据！", type: 'error' });
        }
      }, response => {
        this.$message({ message: "刷新失败：" + response, type: 'error' })
      })
    },
    // 删除彩铃
    DelCL(index,row) {
      this.$axios.get('ringtone_deleteRingtone.action?id=' +row.id).then(response => {
        this.$message({ message: "删除成功！", type: 'success'});
        this.updataCL();
      }, response => {
        this.$message({ message: "删除失败" + response, type: 'error' })
      })
    },
        // 分页变化时触发
   CurrentPageChange(val) {
      this.tableLoading = true;
      this.currentPage = val;
      this.updataCL()
    },

  },
  created() {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
