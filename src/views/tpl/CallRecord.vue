<template>
	<div>
	  <el-row>
	      <el-col :offset="1" :span="22">
		   <h3>外呼记录</h3>
			   <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
			    <el-tab-pane label="呼出记录" name="first">
		            <outgoing-com> <!-- 呼出记录组件 --> </outgoing-com>
			    </el-tab-pane>
			    <el-tab-pane label="回电记录" name="second">
		            <callback-com> <!-- 回电记录组件 --> </callback-com>
			    </el-tab-pane>
			    <el-tab-pane label="陌生呼入" name="third">
				    <strange-in-com><!-- 陌生呼入组件 --></strange-in-com>
			    </el-tab-pane>
			    <el-tab-pane label="短信记录" name="fourth">
			    <sms-re-com><!-- 短信记录组件 --></sms-re-com>
			    </el-tab-pane>
			    <el-tab-pane label="回复记录" name="fifth">
			    	<reply-re-com><!-- 回复记录组件 --></reply-re-com>
			    </el-tab-pane>
			    <el-tab-pane label="陌生记录" name="sixth">
				    <strange-re-com><!-- 陌生记录组件 --></strange-re-com>
			    </el-tab-pane>
			  </el-tabs>
		  </el-col>
	  </el-row>
	</div>
</template>

<script>
import outgoingCom from '@/components/CallRecord/outgoingCom'
import callbackCom from '@/components/CallRecord/callbackCom'
import strangeInCom from '@/components/CallRecord/strangeInCom'
import smsReCom from '@/components/CallRecord/smsReCom'
import replyReCom from '@/components/CallRecord/replyReCom'
import strangeReCom from '@/components/CallRecord/strangeReCom'

export default {
	components: {
        outgoingCom,
        callbackCom,
        strangeInCom,
        smsReCom,
        replyReCom,
        strangeReCom
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
