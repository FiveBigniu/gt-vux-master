<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main">
			<div class="log">
				<img src="../../assets/logo.png"/>
			</div>
			<div class="login-warp">
				<form action="" @submit.prevent="gtlogin">

					<group>
						<x-input type="text" placeholder="邮箱/手机号/用户名" required show-clear v-model="user.username"></x-input>
						<x-input type="password" title="" placeholder="请输入密码" required show-clear v-model="user.password"></x-input>
						<x-input type="text" class="show-loginmessage" disabled v-model="login_showmessage"  required show-clear></x-input>
						<br>
						<x-button type="primary">登录</x-button>
					</group>
				</form>
			</div>
			<flexbox :gutter="0" class="other-menu">
				<!--<flexbox-item><div class="flex-demo"></div></flexbox-item>-->
				<flexbox-item><div class="flex-demo"></div></flexbox-item>
				<flexbox-item><div class="flex-demo"><router-link to="/session/regSelect">用户注册</router-link></div></flexbox-item>丨
				<flexbox-item><div class="flex-demo"><router-link to="/session/forgetList">忘记密码</router-link></div></flexbox-item>
				<flexbox-item><div class="flex-demo"></div></flexbox-item>
				<!--<flexbox-item><div class="flex-demo"></div></flexbox-item>-->
			</flexbox>
			<br>
			<br>
		</div>

	</div>

</template>

<script>
	import Vue from 'vue';
	import router from '../../router/index';
	import staticData from '@/components/static/data.js';
	import heads from '@/components/header/header.vue';
	import { XInput,Group,XButton, Flexbox, FlexboxItem, Divider,AjaxPlugin  } from 'vux';
	Vue.use(AjaxPlugin);
	export default {
		name: 'subapp',
		data(){
			return{
				msg:'登录',
				titleContent:'登录',
				user:{
					username:'',
					password:''
				},
				login_showmessage:''
			}
		},
		methods:{
			gtlogin(){
				this.login_showmessage="正在登录";
				var params = new URLSearchParams();
				params.append('username',this.user.username);
				params.append('password',this.user.password);
				params.append('api','user/login');
				this.$http.post(staticData.apiurl,params).then(res => {
					if (res.status === 200&&res.data.err_msg === 'error'){
						this.login_showmessage = res.data.info
					}else{
						this.login_showmessage = res.data.info;
						sessionStorage.setItem('userdata',JSON.stringify(res.data.data));
						router.replace('/')
					}
				}, res => {
					this.login_showmessage = "网络错误，请稍后重试";
				});
			}
		},
		components:{
			heads,
			XInput,
			Group,
			XButton,
			Flexbox,
			FlexboxItem,
			Divider,
			AjaxPlugin
		}
	}
</script>

<style lang="less">

	.log{
		text-align: center;
		padding:50px 0 50px 0;
		img{
			width: 79px;
			height: 79px;
			text-align: center;
		}
	}
	.flex-demo{
		text-align: center;
		a{
			color: #5775ab;
		}
	}
	.other-menu{
		margin-top: 50px;
		color: #d6d6d6;
	}
	.show-loginmessage{
		color: #f44b50;
	}
</style>
