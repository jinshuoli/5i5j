<template>
	<div>
	 <el-row>
	      <el-col :offset="1" :span="22">
		   <h3>客户管理</h3>
		   <el-tabs v-model.trim="activeName" type="card" @tab-click="tabClick">
			    <el-tab-pane label="客户" name="first">
                  <cust-com> <!-- 客户记录组件 --> </cust-com>
			    </el-tab-pane>
			    <el-tab-pane label="事件" name="second">
                  <event-com> <!-- 事件记录组件 --> </event-com>
			    </el-tab-pane>
			  </el-tabs>
		  </el-col>
	  </el-row>
	</div>
</template>

<script>
import custCom from '@/components/custAdmin/custCom'
import eventCom from '@/components/custAdmin/eventCom'

export default {
	components: {
        custCom,
        eventCom,
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
