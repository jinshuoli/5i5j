<!-- 这是员工管理的部门 -->
<template>
  <div>
    <!-- 一排按钮 —— start-->
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="TreeAdd();">添加</el-button>
        <el-button type="primary" @click="TreeRname();">重命名</el-button>
        <el-button type="primary" @click="TreeTransfer();">转移</el-button>
        <el-button type="primary" @click="TreeSee();">查看</el-button>
        <el-button type="primary" @click="delChecked();">删除</el-button>
        <el-button type="primary" @click="resetChecked();">清除</el-button>
      </el-col>
      <el-col :span="8">
        <el-upload action="/5i5j/main/org_importExcel.action" accept="text/csv" name="orgFile">
          <!--/api -->
          <el-button type="primary">导入</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <!-- 一排按钮 —— end-->
    <!-- 树形菜单 —— start-->
    <el-tree :data="TreeData" :props="defaultProps" :load="loadNode" lazy="" ref="tree" highlight-current show-checkbox node-key="value" @node-click="TreeClick" :check-strictly="true"></el-tree>
    <!-- 树形菜单 —— end-->
    <!-- 转移选择树 —— start -->
    <tree-menu :dialogState="isTreeDialog" ref="postinfo" @on-close="closeDialog" @post-node="getNodes">
    </tree-menu>
    <!-- 转移选择树 —— end -->
  </div>
</template>
<script>
import treeMenu from '@/components/selectSector'
import bus from '@/bus'   //引用相同文件

export default {
  components: {
    treeMenu,
  },
  data() {
    return {
      activeName: 'first', // 默认显示那个tab（tab-name）
      // 树形菜单
      TreeData: [],
      nodeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 转移
      isTreeDialog: false,
      // === 查看
      // 部门表格
      tableData: [],
      page:1,
    }
  },
  methods: {
    // ******* 部门 *********
    // 查询第一级部门
    TreeQuery() {
      this.$axios.get('org_orgTreeInit.action').then(response => {
        this.TreeData = JSON.parse(response.data)
        return false; // 必须加
      }, response => {})
    },
    // 点击当前部门时触发
    TreeClick(data) {
      this.$emit("on-tree-key", data.value, data.setId)
    },
    // 在当前部门下渲染 子部门
    loadNode(node, resolve) { // 加载子节点&树形菜单
      if (node.level > 0) {
        this.$once("on-tree-key", (id, setId) => {
          let ids = { id: id, setId: setId }
          this.$axios.post('org_getChildNodesByPId.action','jsonData=' + JSON.stringify(ids)).then(response => {
            return resolve(JSON.parse(response.data));
          })
        })
      }
    },
    // 新增部门
    TreeAdd() {
      console.log(this.$refs.tree.getCheckedKeys());
      if (this.$refs.tree.getCheckedKeys().length > 0) {
        this.$prompt('请输入部门', '新增部门', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          let nodeInfo = JSON.stringify({
            "content": value,
            "ParentNode": this.$refs.tree.getCheckedKeys()[0]
          })
          console.log(nodeInfo)
          this.$axios.get('org_add.action?jsonData=' + nodeInfo).then(response => {
            this.$message({ message: "新增成功！", type: 'success', });
            this.TreeQuery()
          }, response => {
            this.$message({ type: 'error', message: '新增失败：' + response });
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '取消输入' });
        });
      } else {
        this.$message({ type: 'error', message: '请选择部门' });
      }
    },
    // 重命名
    TreeRname() {
      if (this.$refs.tree.getCheckedKeys().length > 0) {
        // 获取节点名
        let name = this.$refs.tree.getCheckedNodes()[0].name;
        // 根据括号截取节点
        let partName = name.substring(0, name.indexOf("("))

        this.$prompt('请输入您要修改的部门', '重命名', {
          inputValue: partName,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          let nodeInfo = JSON.stringify({
            "content": value,
            "ParentNode": this.$refs.tree.getCheckedNodes()[0].value
          })
          console.log(nodeInfo)
          this.$axios.get('org_rename.action?jsonData=' + nodeInfo).then(response => {
            this.$message({ message: "重命名成功！", type: 'success', });
            this.TreeQuery()
          }, response => {
            this.$message({ type: 'error', message: '重命名失败：' + response });
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '取消输入' });
        });
      } else {
        this.$message({ type: 'error', message: '请选择部门' });
      }
    },
    // ******* 转移 *********
    TreeTransfer() {
      if (this.$refs.tree.getCheckedKeys().length > 0) {
        this.isTreeDialog = true;
        this.$refs.postinfo.TreeQuery(); // 触发查询部门树的方法
      } else {
        this.$message({ type: 'error', message: '请选择您要转移的部门！' });
      }
    },
    closeDialog() { // 关闭部门树
      this.isTreeDialog = false;
    },
    getNodes(nodes) {
      this.isTreeDialog = false;
      let nodeTeansferInfo = {
        oNode: this.$refs.tree.getCheckedNodes()[0].value,
        nNode: nodes[0].value
      }
      console.log(nodeTeansferInfo)
      this.$axios.post('org_transferOrg.action','jsonData=' + JSON.stringify(nodeTeansferInfo)).then(response => {
        console.log(response.data)
        this.$message({ message: "转移成功！", type: 'success', });
        this.TreeQuery()
      }, response => {
        this.$message({ type: 'error', message: '转移失败：' + response });
      })
    },
    // 查看
    TreeSee(page) {
      if (this.$refs.tree.getCheckedKeys().length > 0) {
        this.page = page || 1;
        let data = {
          "id": this.$refs.tree.getCheckedNodes()[0].value,
          'currentPage': this.page
        }
        this.$axios.get('org_queryStaffListByOrgId.action?jsonData='+ JSON.stringify(data)).then(response => {
          console.log(response.data)
          try {
              let searchData = JSON.parse(response.data)
              if (searchData.totalrecord > 0) {
                this.$emit('on-search-table-info', response.data,"branch")
              } else {
                this.$message({ type: 'info', message: "未查询到数据！" });
              }
          } catch (e) {
            this.$message({ type: 'error', message: '未查到数据！' });
          }
        }, response => {
          this.$message({ type: 'error', message: '查看失败：' + response });
        })
      } else {
        this.$message({ type: 'error', message: '请选择您要查看的部门！' });
      }
    },
    // 删除
    delChecked() {
      if (this.$refs.tree.getCheckedKeys().length > 0) {
        this.$confirm('您确定要删除该部门吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('org_delete.action?id=' + this.$refs.tree.getCheckedNodes()[0].value).then(response => {
            this.$message({ type: 'success', message: '删除成功!' });
            this.TreeQuery()
          }, response => {
            this.$message({ type: 'error', message: '删除失败：' + response });
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        });
      } else {
        this.$message({ type: 'error', message: '请选择您要删除的部门！' });
      }
    },
    // 清除
    resetChecked() {
      this.$confirm('您确定要清除整个该部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$axios.get('org_clear.action').then(response => {
          this.$message({ type: 'success', message: '清除成功!' });
          this.TreeQuery()
        }, response => {
          this.$message({ type: 'error', message: '清除失败：' + response });
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消清除' });
      });
    },
  },
  created() {
    this.TreeQuery();
        bus.$on("on-branch-page-change",(page) => {
          this.TreeSee(page)
        })

  }
}

</script>
<style lang="less" scoped>


</style>
