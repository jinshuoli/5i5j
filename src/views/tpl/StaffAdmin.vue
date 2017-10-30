<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="22">
        <h3>员工管理</h3>
        <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="员工" name="first">
            <staff-com ref="postTabelData">
              <!-- 员工组件 -->
            </staff-com>
          </el-tab-pane>
          <el-tab-pane label="部门" name="second">
            <branch-com @on-search-table-info="searchTableInfo">
              <!-- 部门组件 -->
            </branch-com>
          </el-tab-pane>
          <el-tab-pane label="号码" name="third">
            <number-com @on-search-table-info="searchTableInfo">
              <!-- 号码组件 -->
            </number-com>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import staffCom from '@/components/StaffAdmin/staffCom'
import branchCom from '@/components/StaffAdmin/branchCom'
import numberCom from '@/components/StaffAdmin/numberCom'

export default {
  components: {
    staffCom,
    branchCom,
    numberCom,
  },
  data() {
    return {
      activeName: 'first', // 默认显示那个tab（tab-name）
      isAdmin: false,
    }
  },
  methods: {
    tabClick(tab, event) {
      // console.log(tab,event);
    },
    // 员工$$部门 组件传递来的，查询到的数据
    searchTableInfo(data, isDie) {
      this.activeName = "first";
      this.$refs.postTabelData.searchTable(data, isDie); // 触发查询部门树的方法
    },
  },
  created() {
    this.activeName = this.$route.query.n === "third" ? this.$route.query.n : "first";    // 首次进入时的优化
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.activeName = this.$route.query.n === "third" ? this.$route.query.n : "first";
    }
  }
}

</script>
<style lang="less" scoped>


</style>
