<template>
  <el-form ref="attrForm">
    <el-form-item label="来源">
      <el-radio-group v-model.trim="sourceForm">
        <el-radio-button label="无(已使用)"></el-radio-button>
        <el-radio-button label="上门(已使用)"></el-radio-button>
        <el-radio-button label="发彩页"></el-radio-button>
      </el-radio-group>
      <a href=""> 设置</a>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio-group v-model.trim="sourceForm">
        <el-radio-button label="初始状态(已使用)"></el-radio-button> ······
        <el-radio-button label="待邀约(已使用)"></el-radio-button> ······
        <el-radio-button label="已邀约(已使用)"></el-radio-button> ······
        <el-radio-button label="已带看"></el-radio-button> ······
        <el-radio-button label="已签约"></el-radio-button> ······
        <el-radio-button label="已成交"></el-radio-button> ······
        <el-radio-button label="已放弃(已使用)"></el-radio-button> ······
      </el-radio-group>
      <a href=""> 设置</a>
    </el-form-item>
    <el-form-item label="类别">
      <a href="">添加</a><br />
      <span>客户级别：</span>
        <el-radio-group v-model.trim="sourceForm">
        <el-radio-button label="1级(已使用)"></el-radio-button> ······
        <el-radio-button label="2级(已使用)"></el-radio-button> ······
        <el-radio-button label="3级(已使用)"></el-radio-button> ······
        <el-radio-button label="4级"></el-radio-button> ······
        <el-radio-button label="5级"></el-radio-button> ······
      </el-radio-group>
      <a href="">修改</a><br />
      <span>产品类别：</span>
       <el-radio-group v-model.trim="sourceForm">
        <el-radio-button label="出租方(已使用)"></el-radio-button> ······
        <el-radio-button label="承租方(已使用)"></el-radio-button> ······
        <el-radio-button label="售房(已使用)"></el-radio-button> ······
        <el-radio-button label="买房(已使用)"></el-radio-button> ······
      </el-radio-group>
       <a href="">修改</a>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      // 来源
      sourceForm: '',
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
