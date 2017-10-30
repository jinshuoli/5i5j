<template>
	<div>
	 <el-row>
	      <el-col :offset="1" :span="22">
		   <h3>呼入记录</h3>
		   <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
			    <el-tab-pane label="通话记录" name="first">
                  <call-com> <!-- 通话记录组件 --> </call-com>
			    </el-tab-pane>
			    <!-- <el-tab-pane label="短信记录" name="second">
                  <sms-com>  -->
										<!-- 短信记录组件 -->
									<!-- </sms-com>
			    </el-tab-pane> -->
			  </el-tabs>
		  </el-col>
	  </el-row>
	</div>
</template>

<script>
import callCom from '@/components/IncomingCall/callCom'
import smsCom from '@/components/IncomingCall/smsCom'

export default {
	components: {
        callCom,
        smsCom,
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
    created(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
