<template>
  <div class="conent-bg">
    <el-row>
      <el-col class="box" :offset="1" :span="10">
        <el-card class="box-card">
          <div slot="header">
            <span style="line-height: 36px;">个人信息</span>
          </div>
          <ul>
            <li>员工姓名 : {{userInfo.name}} </li>
            <li>职务 : {{userInfo.duty}} </li>
            <li>部门 : {{userInfo.orgName}}
              <router-link v-if="adminPermission" :to="{path: '/5i5j/StaffAdmin'}">员工管理</router-link>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col class="box" :offset="1" :span="10">
        <el-card class="box-card">
          <div slot="header">
            <span style="line-height: 36px;">小号使用
            <router-link v-if="adminPermission" :to="{path: '/5i5j/StaffAdmin?n=third'}">查看</router-link></span>
          </div>
          <ul>
            <li> 总共 : {{userInfo.total}} &nbsp;&nbsp;&nbsp;&nbsp;使用 : {{userInfo.vtotal}} &nbsp;&nbsp;&nbsp;&nbsp; 空闲 : {{userInfo.itotal}}</li>
            <li> 渠道 : {{userInfo.ctotal}}</li>
            <!-- <li>外呼 : {{userInfo.ototal}}</li> -->
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="box" :offset="1" :span="10">
        <el-card class="box-card">
          <div slot="header">
            <span style="line-height: 36px;">今日数据</span>
          </div>
          <ul>
            <li>渠道呼入电话 : {{userInfo.channelCallIn}}</li>
            <!-- <li>员工外呼电话 : {{userInfo.callOut}}</li> -->
            <li>客户呼入电话 : {{userInfo.custCallIn}} </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>

export default {
  data() {
    return {
      userInfo: {
        total: 0,
        vtotal: 0,
        ctotal: 0,
        duty: "default",
        ototal: 0,
        itotal: 0,
        name: "default",
        channelCallIn: 0,
        orgName: "",
        custCallIn: 0,
        callOut: 0
      },
    }
  },
  methods: {
    getUserInfo() {
      this.$axios.get('overview_overview.action').then(response => {
        try {
          this.userInfo = JSON.parse(response.data);
          // 判断是否是管理员（如果不是管理员，不显示查看&&员工管理）
          let adminInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
          this.adminPermission = adminInfo.permission;
        } catch (err) {
          throw "未获取到概览信息!"
        }
      }, response => {
        this.$message({ message: "获取用户信息失败：" + response, type: "error" })
      })
    },
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
}

.box {
  margin-top: 15px;
  margin-bottom: 30px;
}

.box ul li {
  list-style: none;
  /*letter-spacing: 3px;*/
  line-height: 40px;
}

</style>
