<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
				msg:'好琴声',
			}
		},
	}
</script>

<style lang="less">

	@import '~vux/src/styles/reset.less';
	@mainColor:#f44b50;
	html,body {
		background-color: #fff;
		height: 100%;
		/*overflow-x: hidden;*/
	}
	body {
		.weui-cell{
			padding-left: 0;
			left: 0!important;
		}
	}
	#subapp{
		background-color: #fff;
	}
	.main{
		margin: 0 20px;
		background-color:#fff;
		.weui-cells:before{
			border-top: none;

		}
		.weui-cells{
			font-size: 16px;
		}

	}
</style>
