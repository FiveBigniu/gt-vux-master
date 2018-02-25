<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main">
			<div class="log">
				<img src="../../assets/logo.png"/>
			</div>
			<div class="login-warp">
				<form action="">

					<group>
						<x-input title="" placeholder="邮箱/手机号/用户名" required show-clear></x-input>
						<x-input type="password" title="" placeholder="请输入密码" required show-clear></x-input>
						<x-input type="hidden" title="" placeholder="请输入密码" required show-clear></x-input>
						<br>
						<x-button type="primary">登录</x-button>

					</group>
				</form>
			</div>
		</div>
		<flexbox :gutter="0" class="other-menu">
			<flexbox-item><div class="flex-demo"></div></flexbox-item>
			<flexbox-item><div class="flex-demo"></div></flexbox-item>
			<flexbox-item><div class="flex-demo">用户注册</div></flexbox-item>丨
			<flexbox-item><div class="flex-demo">忘记密码</div></flexbox-item>
			<flexbox-item><div class="flex-demo"></div></flexbox-item>
			<flexbox-item><div class="flex-demo"></div></flexbox-item>
		</flexbox>
	</div>

</template>

<script>
//	import foot from './components/footer/footer.vue'
	import heads from '../header/header.vue'
	import { XInput,Group,XButton, Flexbox, FlexboxItem, Divider  } from 'vux'
	export default {
		name: 'subapp',
		data(){
			return{
				msg:'登录',
				titleContent:'注册'
			}
		},
		components:{
			heads,
			XInput,
			Group,
			XButton,
			Flexbox,
			FlexboxItem,
			Divider
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';


	.log{
		text-align: center;
		padding:50px 0 50px 0;
		img{
			width: 79px;
			height: 79px;
			text-align: center;
		}
	}

</style>
