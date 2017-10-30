<template>
  <el-form ref="powerform">
    <el-form-item label="私客">
      <span>号码显示：</span>
      <el-select v-model.trim="formGroup.privateGuest" placeholder="部分遮蔽">
        <el-option label="全部遮蔽" value="Y"></el-option>
        <el-option label="部分遮蔽" value="O"></el-option>
        <el-option label="不遮蔽" value="N"></el-option>
      </el-select>
      <el-checkbox v-model.trim="formGroup.pgform.add" true-label="1" false-label="0" label="号码新增"></el-checkbox>
      <el-checkbox v-model.trim="formGroup.pgform.nedit" true-label="1" false-label="0" label="号码编辑"></el-checkbox>
      <el-checkbox v-model.trim="formGroup.pgform.del" true-label="1" false-label="0" label="号码删除"></el-checkbox>
      <el-checkbox v-model.trim="formGroup.pgform.get" true-label="1" false-label="0" label="取号呼叫"></el-checkbox>
      <el-checkbox v-model.trim="formGroup.pgform.bdel" true-label="1" false-label="0" label="客户删除"></el-checkbox>
      <el-checkbox v-model.trim="formGroup.pgform.comment" true-label="1" false-label="0" label="取号备注"></el-checkbox>
    </el-form-item>
    <el-form-item label="下属客户">
      <span>号码显示：</span>
      <el-select v-model.trim="formGroup.branch" placeholder="部分遮蔽">
        <el-option label="全部遮蔽" value="Y"></el-option>
        <el-option label="部分遮蔽" value="O"></el-option>
        <el-option label="不遮蔽" value="N"></el-option>
      </el-select>
      <el-checkbox v-model.trim="formGroup.branchForm.add" true-label="1" false-label="0" label="号码新增">
      </el-checkbox>
      <el-checkbox v-model.trim="formGroup.branchForm.nedit" true-label="1" false-label="0" label="号码编辑">
      </el-checkbox>
      <el-checkbox v-model.trim="formGroup.branchForm.del" true-label="1" false-label="0" label="号码删除">
      </el-checkbox>
      <el-checkbox v-model.trim="formGroup.branchForm.get" true-label="1" false-label="0" label="取号呼叫">
      </el-checkbox>
      <el-checkbox v-model.trim="formGroup.branchForm.bdel" true-label="1" false-label="0" label="客户删除">
      </el-checkbox>
      <el-checkbox v-model.trim="formGroup.branchForm.comment" true-label="1" false-label="0" label="取号备注">
      </el-checkbox>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="keep">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      // 整个表单组
      formGroup: {
        privateGuest: '',
        branch: '',
        pgform: {
          add: '1',
          nedit: '1',
          del: '1',
          get: '1',
          bdel: '1',
          comment: '0',
        },
        branchForm: {
          add: '1',
          nedit: '1',
          del: '1',
          get: '1',
          bdel: '1',
          comment: '0',
        }
      },
    };
  },
  methods: {
    tabClick(tab, event) {
      // console.log(tab, event);
    },
    keep() {
      console.log(JSON.stringify(this.formGroup))
    },
  },
  created() {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
