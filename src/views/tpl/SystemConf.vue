<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="22">
        <h3>系统设置</h3>
        <el-tabs v-model.trim="activeName" type="card" @tab-click="tabChange">
          <el-tab-pane label="账号管理" name="first">
            <acc-admin>
              <!--  账号管理 -->
            </acc-admin>
          </el-tab-pane>
          <!--   <el-tab-pane label="费用统计" name="second">
            <cost-count> 费用统计</cost-count>
          </el-tab-pane> -->
          <el-tab-pane label="彩铃管理" name="third">
            <cl-admin>
              <!--  彩铃管理 -->
            </cl-admin>
          </el-tab-pane>
          <el-tab-pane label="短信模板" name="fourth">
            <sms-tpl>
              <!--  短信模板 -->
            </sms-tpl>
          </el-tab-pane>
          <el-tab-pane label="通话设置" name="fifth">
            <call-setup>
              <!--  通话设置 -->
            </call-setup>
          </el-tab-pane>
          <!-- <el-tab-pane label="黑名单" name="sixth">黑名单</el-tab-pane> -->
          <!-- <el-tab-pane label="数据推送" name="seventh">数据推送</el-tab-pane> -->
          <el-tab-pane label="活动日志" name="Ninth">
            <operation-log>
              <!-- 活动日志 -->
            </operation-log>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import accAdmin from '@/components/StystemConf/accAdmin'
import costCount from '@/components/StystemConf/costCount'
import CLAdmin from '@/components/StystemConf/CLAdmin'
import smsTpl from '@/components/StystemConf/smsTpl'
import callSetup from '@/components/StystemConf/callSetup'
import operationLog from '@/components/StystemConf/operationLog'

export default {
  components: {
    accAdmin,
    costCount,
    clAdmin: CLAdmin,
    smsTpl,
    callSetup,
    operationLog,
  },
  data() {
    return {
      activeName: 'first',

    };
  },
  methods: {
    tabChange(tab, event) {
      // console.log(tab, event);
    },
  },
  created() {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
