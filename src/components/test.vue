<template>
  <div>
    <h2>测试</h2>
    <el-button @click="test">test post</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    test() {
    	let date = Date.now()

        this.$axios.post("sysUser_test.action","jsonData="+JSON.stringify({firstName: '中文', lastName: 'Flintstone' ,time: date})).then(response => {
            console.log(response.data)
          }, response => {
            console.log(response)
          })
    }

  },
  created() {},
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
