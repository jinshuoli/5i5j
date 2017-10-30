<template>
  <div>
    <el-button type="primary" @click="pushTpl" v-if="adminPermission">提交模板</el-button>
    <el-button type="primary" @click="updataTpl">刷新模板</el-button>
    <a href="javascript:void(0);" style="color:#FF4949;" @click="sindInfo"> 发送限制</a>
    <a href="javascript:void(0);" style="color:#FF4949;" @click="explainInfo"> 变量说明</a>
    <!-- 表格 ——start-->
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" v-loading="tableLoading" element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column prop="name" label="模板名称">
      </el-table-column>
      <el-table-column prop="content" label="模板内容">
      </el-table-column>
      <el-table-column label="审核状态">
        <template scope="scope">
          <span v-if="scope.row.status==='c'">审核成功</span>
          <span v-if="scope.row.status==='w'">正在审核</span>
          <span v-if="scope.row.status==='f'">审核失败</span>
        </template>
      </el-table-column>
      <el-table-column label="使用状态">
        <template scope="scope">{{ scope.row.type==='u' ?'闪信':'短信' }}</template>
      </el-table-column>
      <el-table-column label="编辑">
        <template scope="scope">
          <el-button size="small" type="warning" @click="clickEditTpl(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="DelTpl(scope.$index, scope.row)" v-if="adminPermission">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 ——end-->
    <!-- 分页 —— start-->
    <el-row>
      <el-col :offset="8">
        <el-pagination @current-change="CurrentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="totalrecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 分页 —— end-->
    <!-- 模板弹框 ——start-->
    <el-dialog title="短信模板:" :visible.sync="dialogTpl">
      <el-form :model="TplForm">
        <el-form-item label="模板名称">
          <el-input v-model.trim="TplForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板内容">
          <el-input type="textarea" :rows="2" v-model.trim="TplForm.content" auto-complete="off"></el-input>
          <p style="color: #FF4949">{{TplForm.content.length}}/70</p>
        </el-form-item>
        <el-form-item>
          <a href="javascript:void(0);" @click="addInfo('#Agent#')">员工姓名</a>
          <a href="javascript:void(0);" @click="addInfo('#Phone#')">员工号码</a>
          <a href="javascript:void(0);" @click="addInfo('#CustomerNo#')">客户号码</a>
          <!-- <a href="javascript:void(0);" @click="addInfo('#CustomerId#')">客户标识</a> -->
          <!-- <a href="javascript:void(0);" @click="addInfo('#ProductId#')">产品标识</a> -->
          <!-- <a href="javascript:void(0);" @click="addInfo('#Time#')">来电时间</a> -->
          <!-- <a href="javascript:void(0);" @click="addInfo('#VirtualNo#')">小号</a> -->
          <a href="javascript:void(0);" @click="addInfo('#Channel#')">渠道名称</a>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTpl = false">取 消</el-button>
        <el-button type="primary" @click="EditTplTable()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模板弹框 ——end-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 短信模板
      tableData: [],
      tableLoading: false,
      dialogTpl: false,
      isEditPush: 0, // 判断是修改模板还是提交模板（短信）
      TplForm: { // 修改模板
        name: '',
        content: '',
      },
      // 分页
      currentPage: 1, // 选中页
      pageSize: 5, // 每页显示条数
      totalrecord: 0, // 总数据条数
        // 判断管理者
      adminPermission:''
    };
  },
  methods: {
    // ***** 短信模板
    // 提交模板
    pushTpl() { // 提交模板和修改模板用的是一个dialog
      this.dialogTpl = true;
      this.isEditPush = 0;
      // 清空
      this.TplForm = {
        name: '',
        content: '',
      };
    },
    // 刷新短信模板
    updataTpl() {
      this.tableLoading = true;
      this.$axios.get('template_getfindTemplate.action?currentPage=' + this.currentPage).then(response => {
        this.tableLoading = false;
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
        this.tableLoading = false;
        this.$message({ message: "刷新模板失败：" + response, type: 'error', });
      })
    },
    // 分页变化时触发
    CurrentPageChange(val) {
      this.tableLoading = true;
      this.currentPage = val;
      this.updataTpl()
    },
    // 点击修改模板
    clickEditTpl(i, row) { // 提交模板和修改模板用的是一个dialog
      this.dialogTpl = true;
      this.isEditPush = 1;
      this.TplForm.templateId = row.templateId
      this.TplForm.name = row.name
      this.TplForm.content = row.content
    },
    // 点击确认模板
    EditTplTable() {
      console.log(JSON.stringify(this.TplForm))
      let url = this.isEditPush === 1 ? "template_update.action" : "template_add.action";

      this.$axios.post(url, 'jsonData=' + JSON.stringify(this.TplForm)).then(response => {
        this.dialogTpl = false;
        // 清空
        this.TplForm = { name: '', content: '', };
        this.updataTpl()
        this.isEditPush === 1 ?
          this.$message({ message: "修改成功！", type: 'success', }) :
          this.$message({ message: "添加成功！", type: 'success', })

      }, response => {
        this.$message({ message: "失败：" + response, type: 'error', });
      })
    },
    // 删除模板
    DelTpl(i, row) {
      this.$confirm('您确定要将这个短信模板删除吗？', '删除短信模板', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.get("template_ delete.action?templateId=" + row.templateId).then(response => {
          this.$message({ message: "删除短信模板成功", type: 'success' });
          this.updataTpl();
        }, response => {
          this.$message({ message: "删除短信模板失败：" + response, type: 'error' })
        })

      }).catch(() => {
        this.$message({ message: '已取消删除', type: 'info', });
      });
    },
    // 添加信息
    addInfo(info) {
      this.TplForm.content += info;
    },
    // 发送限制
    sindInfo() {
      const h = this.$createElement;
      this.$msgbox({
        title: '发送限制',
        message: h('ol', { style: 'line-height:30px;' }, [
          h('li', null, '同一手机号30秒内重复提交相同的内容'),
          h('li', null, '同一手机号5分钟内重复提交相同的内容超过3次'),
          h('li', null, '24小时内同一手机号发送次数超过限制'),
          h('li', null, '1小时内同一手机号发送次数超过限制'),
          h('li', { style: 'color: red' }, '模板内容不能大于 70 个字符')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => { done(); }
      })
    },
    // 变量说明
    explainInfo() {
      const h = this.$createElement;
      this.$msgbox({
        title: '变量说明',
        message: h('ul', { style: 'line-height:30px;' }, [
          h('li', null, '#Agent#, 员工姓名, 适用于发给客户的挂机短信 '),
          h('li', null, '#Phone#, 员工号码, 适用于发给客户的挂机短信'),
          h('li', null, '#CustomerNo#,客户号码,适用于发给员工的挂机短信'),
          // h('li', null, '#CustomerId#, 客户标识, 适用于外呼场景中发给员工的挂机短信'),
          // h('li', null, '#ProductId#, 产品标识, 适用于外呼场景中发给员工的挂机短信'),
          // h('li', null, '#Time#, 来电时间'),
          // h('li', null, '#VirtualNo#, 小号(隐私号,虚拟号),适用于隐藏真实号码'),
          h('li', null, '#Channel#, 渠道名称, 适用于渠道呼入场景中发给员工的挂机短信'),
          // h('li', null, '#Phone#, 号码, 发给客户的挂机短信中是员工真实号码, 发给员工的挂机短信中是客户真实号码, 不推荐使用')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => { done(); }
      })
    },
    isAdmin(){
     // 判断是否是管理员（如果不是管理员，不显示提交模板&&删除模板）
    let adminInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
    this.adminPermission = adminInfo.functionpermission;
    }
  },
  created() {
    this.isAdmin()
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
