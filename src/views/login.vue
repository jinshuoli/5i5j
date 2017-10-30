<template>
  <div class="block">
    <!-- 登陆 -->
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="model">
      <h3 class="title">我爱我家虚拟号系统登录 </h3>
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model.trim="loginForm.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model.trim="loginForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="submitForm('loginForm')" @keyup.enter="submitForm('loginForm')" :loading="logining" style="width:100%">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));

      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      // 登陆logining
      logining: false,
      loginForm: {
        pass: '',
        userName: ''
      },
      rules: {
        userName: [
          { validator: validateName, trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // console.log(this.loginForm)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var loginParams = {
            'user.code': this.loginForm.userName,
            'user.password': this.loginForm.pass,
          };
          this.logining = true;
          this.$axios.get('sysUser_login.action', { params: loginParams }).then(response => {
            let loginInfo = JSON.parse(response.data);
            console.log(loginInfo)
            this.logining = false;
            if (loginInfo.loginFlag) {
              sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
              this.$message({ message: "登陆成功！", type: 'success', });
              this.$router.push({ path: '/5i5j/main/overview' });
            } else {
              this.$message({ message: "用户名或密码错误", type: 'error', });
            }
          }, response => {
            this.logining = false;
            this.$message({ message: "登陆失败 " + response, type: 'error', });
          })

        } else {
          this.$message({ message: "请填写用户名密码！", type: 'error', });
          return false;
        }
      });
    }

  }
}

</script>
<style lang="less" scoped>
.block {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2d3a4b;
  background: url(../assets/banner_01.jpg) no-repeat;
  background-size: 100%;
}

.title {
  text-indent: 20px;
  color: #FFF;
}

.model {
  position: absolute;
  top: 30%;
  left: 56%;
  z-index: 2;
  width: 350px;
  padding: 10px 30px 20px 0;
  background-color: #619BB5;
  border-radius: 2%;
}

</style>
