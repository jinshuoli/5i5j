<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="22">
        <h3>客户设置</h3>
        <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="属性" name="first">
            <attribute>
              <!-- 属性 -->
            </attribute>
          </el-tab-pane>
          <el-tab-pane label="权限" name="second">
            <power>
              <!-- 权限 -->
            </power>
          </el-tab-pane>
          <el-tab-pane label="客户池" name="third">
            <client-pool>
              <!-- 客户池 -->
            </client-pool>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import attribute from '@/components/custSetup/attribute'
import power from '@/components/custSetup/power'
import clientPool from '@/components/custSetup/clientPool'

export default {
  components: {
    attribute,
    power,
    clientPool,
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    tabClick(tab, event) {
      // console.log(tab, event);
    },

  },
  created() {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
