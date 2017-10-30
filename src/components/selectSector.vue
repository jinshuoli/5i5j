<template>
  <div>
    <el-dialog title="选择部门" :visible.sync="dialogState" @close="closeDialog" :modal="false">
      <el-tree :data="TreeData" :props="defaultProps" :load="loadNode" @node-click="TreeClick" ref="tree" lazy="" node-key="value" highlight-current show-checkbox :check-strictly="true" empty-text="加载数据中……">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogState = false">取 消</el-button>
        <el-button type="primary" @click="treeOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogState: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      // 树形菜单
      TreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    }
  },
  methods: {
    TreeQuery() {
      this.$axios.get('org_orgTreeLoad.action').then(response => {
        this.TreeData = JSON.parse(response.data)
        return false; // 必须加
      }, response => {
        this.$message({ message: "未查询到部门：" + response, type: 'error', })
      })
    },
    // 节点被点击时触发
    TreeClick(data) {
      this.$emit("on-tree-key", data.value, data.setId)
    },
    // 加载子节点&树形菜单
    loadNode(node, resolve) {
      if (node.level > 0) {
        this.$once("on-tree-key", (id, setId) => {
          let ids = { id: id, setId: setId }
          this.$axios.post('org_childNodesLoad.action','jsonData=' + JSON.stringify(ids)).then(response => {
            return resolve(JSON.parse(response.data));
          }, response => {})
        })
      }
    },
    closeDialog() {
      this.$refs.tree.setCheckedNodes([])   // 关闭弹框时清空节点信息
      this.$emit('on-close') // on-close 告诉父级关闭弹框
    },
    treeOk() {
      console.log('选中的keys', this.$refs.tree.getCheckedKeys())
      console.log('选中的节点', JSON.stringify(this.$refs.tree.getCheckedNodes()))

      this.$emit('post-node', this.$refs.tree.getCheckedNodes()) // post-node 告诉父组件选中节点的数据
    }
  },
  created() {

  },
}

</script>
<style lang="less" scoped>


</style>
