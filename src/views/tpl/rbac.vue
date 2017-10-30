<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="22">
        <h3>权限管理</h3>
        <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="功能权限" name="first">
             <fun-power><!-- 功能权限 --></fun-power>
          </el-tab-pane>
          <el-tab-pane label="功能分配" name="second">
             <fun-allot><!-- 功能分配 --></fun-allot>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third">
             <roles><!-- 角色管理 --></roles>
          </el-tab-pane>
     <!--      <el-tab-pane label="数据权限" name="fourth">
            <data-power></data-power>
          </el-tab-pane> -->
          <el-tab-pane label="角色分配" name="fifth">
            <data-allot><!-- 角色分配 --></data-allot>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import funPower from '@/components/rbac/funPower'
import funAllot from '@/components/rbac/funAllot'
import roles from '@/components/rbac/roles'
// import dataPower from '@/components/rbac/dataPower'
import dataAllot from '@/components/rbac/dataAllot'

export default {
  components: {
    funPower,
    funAllot,
    roles,
    // dataPower,
    dataAllot,

  },
  data() {
    return {
      activeName: 'first', // 默认显示那个tab（tab-name）
    }
  },
  methods: {
    tabClick(tab, event) {
      // console.log(tab, event);
    },
  },
  created() {

  }
}

</script>
<style lang="less" scoped>


</style>
