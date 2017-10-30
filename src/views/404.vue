<template>
	<div class="page-container" @click="goLogin">
	    <img src="http://img.zcool.cn/community/01b4805809cf43a84a0e282b3508f4.gif" class="bg">
	</div>
</template>
<script>
export default{
	data(){
		return{

		}
	},
	methods:{
		goLogin(){
              this.$router.push({path:'/5i5j'})
		},
		setTimeLogin(){
			setTimeout(() => {
				this.goLogin()
            }, 5000);
		}
	},
	created() {
		this.setTimeLogin();
	}
}
</script>
<style lang="less" scoped>
  .bg{
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
  }
    @media screen and (max-width: 1024px) {
      img.bg {
        left: 50%;
        margin-left: -512px;
      }
    }
</style>
