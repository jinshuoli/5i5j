<template>
  <div>
    <nav class="header">
      <el-row>
        <el-col :span="2">
          <el-tooltip class="item" effect="dark" content="点击图片切换菜单" placement="right-start" id="ban">
            <img @click="isCollapse = !isCollapse" src="../assets/5i5jlogo2.png" alt="crm-images-logo" width="60" height="55" class="logo" />
          </el-tooltip>
        </el-col>
        <el-col :span="6">
          <router-link :to="{path: '/5i5j/login'}">
            <h2 class="title">我爱我家虚拟号系统</h2>
          </router-link>
        </el-col>
        <el-col :offset="14" :span="1">
          <el-dropdown trigger="click" style="cursor:pointer">
            <span class="el-dropdown-link">
             <i class="fa fa-bars fa-2x"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link :to="{path: '/5i5j/main/resetPwd'}">
                <el-dropdown-item>个人资料</el-dropdown-item>
              </router-link>
              <el-dropdown-item>
                <a href="http://sso.bacic5i5j.com/logout?service=http%3A%2F%2F101.201.101.70%3A8080%2F5i5j%2F">
                  <p @click="backToLogin">退出</p>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </nav>
    <section>
      <el-row>
        <!-- 左侧列表 -->
        <el-col :span="2" class="nav">
          <el-menu :default-active="$route.path" :router="true" :collapse="isCollapse" theme="dark">
            <el-menu-item v-for="item in navList" :index="item.src" :key="item.src">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <!-- 中间内容 -->
        <el-col :span="22">
          <!-- <transition name="el-fade-in-linear"> -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <!-- </transition> -->
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false, // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
      navList: [
        // {icon:'fa fa-home',name:'概览',src:'/5i5j/main/overview'},
        // {icon:'fa fa-signal',name:'呼入分析',src:'/5i5j/main/IncomingAnalysis'},
        // {icon:'fa fa-phone ',name:'呼入记录',src:'/5i5j/main/IncomingCall'},
        // {icon:'fa fa-bullhorn',name:'外呼记录',src:'/5i5j/main/CallRecord'},
        // {icon:'fa fa-comment',name:'通知记录',src:'/5i5j/main/NotificationRecord'},
        // {icon:'fa fa-address-book ',name:'客户管理',src:'/5i5j/main/custAdmin'},
        // {icon:'fa fa-user',name:'员工管理',src:'/5i5j/main/StaffAdmin'},
        // {icon:'fa fa-id-card ',name:'权限管理',src:'/5i5j/main/rbac'},
        // {icon:'fa fa-headphones',name:'呼入设置',src:'/5i5j/main/InboundSetup'},
        // {icon:'fa fa-microphone',name:'外呼设置',src:'/5i5j/main/CallSetup'},
        // {icon:'fa fa-address-book-o ',name:'客户设置',src:'/5i5j/main/custSetup'},
        // {icon:'fa fa-wrench',name:'系统设置',src:'/5i5j/main/SystemConf'},
        // {icon:'test',name:'test',src:'/5i5j/main/test'},
      ],
    }
  },
  methods: {
    // 获取导航列表
    getNav() {
      this.$axios.get('sysUser_queryLoginRole.action').then(response => {
        console.table(JSON.parse(response.data))
        this.navList = JSON.parse(response.data)
      })
    },
    login() {
      this.$axios.get('sysUser_login.action').then(response => {
        sessionStorage.setItem('loginInfo', response.data);
        // this.$message({ message: "登陆成功！", type: 'success', });
        this.getNav();
      }, response => {
        // sessionStorage.setItem('loginInfo',"{"functionpermission":true,"permission":true,"loginFlag":true}");
        this.$message({ message: "登陆失败 " + response, type: 'error', });
      })
    },
    backToLogin() {
      this.$axios.get('sysUser_logOut.action').then(response => {})
      // sessionStorage.removeItem('loginInfo');
    },
  },
  created() {
    this.login();
  }
}

</script>
<style lang="less" scoped>
.header {
  background-color: #222d32;
  .title,
  i {
    color: white;
    line-height: 100%;
  }
  i {
    padding-top: 20px;
  }
}

a {
  text-decoration: none;
}

.el-menu {
  height: 880px;
}
#ban{
  position: relative;
}
.logo{
  position: absolute;
  top: 1.5px;
  left: 25px;
}

</style>
