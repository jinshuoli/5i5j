<!-- 这是权限管理的功能分配 -->
<template>
  <div>
    <el-row>
      <el-col :offset="1" :span="5">
        <el-select @change="selectChange" v-model.trim="selected" placeholder="请选择功能权限……">
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
        <el-transfer :titles="titleArr" filterable :filter-method="filterMethod" filter-placeholder="请输入要搜索的内容" v-model.trim="transferRight" :data="transferLeft" :right-default-checked="transferRight">
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
      titleArr: ['未分配功能权限', '已有功能权限'],
      transferLeft: [],
      transferRight: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      roleId: '',
    }
  },
  methods: {
    // 获取下拉框数据
    getSelect() {
      this.$axios.get('role_getRoleList.action').then(response => {
        this.selectData = JSON.parse(response.data)
      }, response => {})
    },
    // 下拉框选中值发生变化时触发
    selectChange(val) {
      this.roleId = val;
      // 左侧 ——
      let left = [];
      this.$axios.get('roleFunction_queryNoUseFuncList.action?roleId=' + val).then(response => {
        let list = JSON.parse(response.data);
        list.forEach(function(item, index) {
          left.push({ label: item.name, key: item.id, pinyin: item.name });
        })
      }, response => {})
      // 右侧 ——
      this.$axios.get('roleFunction_queryList.action?roleId=' + val).then(response => {
        console.log(response.data)
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

      const data = { "roleId": this.roleId, "functionIds": this.transferRight }
      this.$axios.post('roleFunction_saveRoleFunctions.action','jsonData=' + JSON.stringify(data)).then(response => {
        console.log(response.data)
        this.$message({ message: "保存成功！", type: 'success', });
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
