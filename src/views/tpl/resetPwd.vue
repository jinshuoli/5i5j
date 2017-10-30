<template>
  <div class="conent-bg">
    <el-row >
      <el-col :offset="2" :span="16" class="panel">
        <el-col :offset="2" :span="7">
          员工姓名：{{userInfo.name}}
        </el-col>
        <el-col :span="7">
          职务：{{userInfo.duty}}
        </el-col>
        <el-col :span="7">
          <el-button type="success" @click="restPwdDialogForm = true">修改密码</el-button>
        </el-col>
        <el-col :offset="2" :span="16"><br />
           部门：{{userInfo.orgName}}
        </el-col>
      </el-col>
    </el-row>
    <!-- 修改密码 弹框 —— start -->
    <el-dialog title="修改密码" :visible.sync="restPwdDialogForm">
      <el-form :model="restForm" :rules="rules" ref="restForm" label-width="90px">
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input v-model.trim="restForm.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pwd">
          <el-input v-model.trim="restForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input v-model.trim="restForm.pwd2" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restPwdDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="postPwd">确 定 修 改</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 弹框 —— end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        name: "test",
        duty: "经理",
        orgName: "太原伟业我爱我家",
      },
      restPwdDialogForm:false,
      // 修改密码的表单
      restForm: {
        oldPwd: '',
        pwd: '',
        pwd2: '',
      },
      // 添加--验证
      rules: {
        oldPwd: { required: true, message: '请输入原密码', trigger: 'blur' },
        pwd: { required: true, message: '请输入新密码', trigger: 'blur' },
        pwd2: { required: true, message: '请输入密码', trigger: 'blur' },
      },
    }
  },
  methods: {
    getUserInfo() {
      this.$axios.get('sysUser_Info.action').then(response => {
        this.userInfo = JSON.parse(response.data)
      })
    },
    postPwd() {

      this.$refs.restForm.validate((valid) => {
        if (valid) {
          this.restPwdDialogForm = false
          this.$axios.post('sysUser_resetPassword.action','jsonData=' + JSON.stringify(this.restForm)).then(response => {
            console.log(response.data)
            this.$message({ message: "修改密码成功！", type: 'success', });
          },response =>{
            this.$message({ message: "修改密码失败："+response, type: 'error', });
          })
        } else {
          this.$message({ message: "修改密码失败！", type: 'error', });
          return false;
        }
      });
    }
  },
  created() {
    this.getUserInfo()
  },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.conent-bg {
  background-color: #F2F0F0;
  height: 880px;
  padding-top: 30px;
}
.panel{
  background-color: white;
  padding: 30px 0px;
}
</style>
