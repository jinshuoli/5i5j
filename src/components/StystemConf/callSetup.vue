<template>
  <div>
    <el-form ref="talSetupform" label-width="150px">
      <el-form-item label="骚扰电话时长：">
        <el-input-number v-model.trim="talSetupForm.id222" :min="1" :max="1000"></el-input-number> 秒
      </el-form-item>
      <el-form-item label="被叫无振铃时长：">
        <el-input-number v-model.trim="talSetupForm.id333" :min="1" :max="1000"></el-input-number> 秒
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="keepTelSetup">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 通话设置
      talSetupForm: {
        id222: 1,
        id333: 1,
      },
    };
  },
  methods: {

    // 保存通话设置
    keepTelSetup() {

    },
  },
  created() {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
