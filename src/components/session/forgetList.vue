<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main forget-list">
			<group>
				<!--<cell is-link link="/forget/forget">-->
					<!--<div slot="title">-->
					<!--<span>-->
					<!--<img class="forget-icon" style="display:inline-block;vertical-align:middle;" src="../../assets/greattone/user.png" width="24" height="24">-->
					<!--</span>-->
					<!--<span>通过用户名找回密码</span>-->
					<!--</div>-->
				<!--</cell>-->

				<cell is-link link="/session/forget">

					<div slot="title">
						<span>
							<img class="forget-icon" style="display:inline-block;vertical-align:middle;" src="../../assets/greattone/phone.png" width="24" height="24">
						</span>
						<span>通过绑定手机找回密码</span>
					</div>
				</cell>
				<!--<cell is-link link="/forget/forget">-->

					<!--<div slot="title">-->
						<!--<span>-->
							<!--<img class="forget-icon" style="display:inline-block;vertical-align:middle;" src="../../assets/greattone/user.png" width="24" height="24">-->
						<!--</span>-->
						<!--<span>通过绑定邮箱账户找回密码</span>-->
					<!--</div>-->
				<!--</cell>-->
			</group>

		</div>
	</div>
</template>

<script>
	import heads from '../header/header.vue'
	import { Group,CellBox ,Cell } from 'vux'
	export default {
		name: 'subapp',
		data(){
			return{
				msg:'登录',
				titleContent:'设置新密码'
			}
		},
		components:{
			heads,
			Group,
			CellBox,
			Cell
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	.forget-list .weui-cell{
		background-color: #f5f5f7;
	}
	.forget-icon{
		margin:0 10px;
	}


</style>
