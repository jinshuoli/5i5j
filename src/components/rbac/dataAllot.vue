<!-- 这是权限管理的数据分配 -->
<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="5">
        <el-select @change="selectChange" v-model="selected" placeholder="请选择功能权限……">
          <el-option v-for="item in selectData" :value="item.roleId" :label="item.roleName" key="item.roleId"></el-option>
        </el-select>
      </el-col>
      <el-col :offset="2" :span="2">
        <el-button type="primary" @click="keepTransfer">保 存</el-button>
      </el-col>
    </el-row>
    <br />
    <!-- 穿梭框 —— start -->
    <el-row>
      <el-col :offset="2" :span="10">
        <el-transfer :titles="titleArr" filterable :filter-method="filterMethod" v-model.trim="transferRight" :data="transferLeft" :right-default-checked="transferRight" filter-placeholder="请输入要搜索的内容">
        </el-transfer>
      </el-col>
    </el-row>
    <!-- 穿梭框 —— end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectData: [],
      selected: '',
      titleArr: ['未分配角色', '已分配角色'],
      leftArr: [],
      transferLeft: [],
      transferRight: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      roleId1: '',
    }
  },
  methods: {
    // 获取下拉框数据
    getSelect() {
      this.$axios.get('role_getRoleList.action').then(response => {
        this.selectData = JSON.parse(response.data)
        console.log(this.selectData)
      }, response => {
        this.$message({ message: "获取数据失败："+response, type: 'error', });
      })
    },
    // 下拉框选中值发生变化时触发
    selectChange(val) {
      this.roleId1 = val;
      // 左侧 ——
      let left = [];
      this.$axios.get('userRole_queryNoUseFuncList.action?roleId=' + val).then(response => {
        let list = JSON.parse(response.data);
        list.forEach(function(item, index) {
          left.push({ label: item.name, key: item.id, pinyin: item.name });
        })
      }, response => {})
      // 右侧 ——
      this.$axios.get('userRole_queryList.action?roleId=' + val).then(response => {
        let list = JSON.parse(response.data);
        const right = [];
        list.forEach(function(item, index) {
          left.push({ label: item.name, key: item.id, pinyin: item.name });
          right.push(item.id);
        })
        this.transferRight = right;
      }, response => {})
      this.transferLeft = left;
    },
    // 保存
    keepTransfer() {
      const data = { "roleId": this.roleId1, "userIds": this.transferRight }
      this.$axios.post('userRole_saveRoleFunctions.action','jsonData=' + JSON.stringify(data)).then(response => {
        console.log(response.data)
        if (response.data === "success") {
          this.$message({ message: "保存成功！", type: 'success', });
        } else {
          this.$message({ message: "保存失败！", type: 'error', });
        }
      }, response => {})
    }
  },
  created() {
    this.getSelect();
  }
}
</script>
<style lang="less" scoped>
</style>