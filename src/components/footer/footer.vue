<template>
		<tabbar >
			<tabbar-item  selected>
				<img slot="icon" src="../../assets/greattone/index.png">
				<img slot="icon-active" src="../../assets/greattone/index-after.png">
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item  show-dot>
				<img slot="icon" src="../../assets/greattone/huodong.png">
				<img slot="icon-active" src="../../assets/greattone/huodong-after.png">
				<span slot="label">音乐活动</span>
			</tabbar-item>
			<tabbar-item  link="/component/demo">
				<img slot="icon" src="../../assets/greattone/fatie.png">
				<img slot="icon-active" src="../../assets/greattone/fatie-after.png">
				<span slot="label">发布</span>
			</tabbar-item>
			<tabbar-item   badge="2">
				<img slot="icon" src="../../assets/greattone/message.png">
				<img slot="icon-active" src="../../assets/greattone/message-after.png">
				<span slot="label">我的动态</span>
			</tabbar-item>
			<tabbar-item badge="2" link="/session/login">
				<img slot="icon" src="../../assets/greattone/center.png">
				<img slot="icon-active" src="../../assets/greattone/center-after.png">

				<span slot="label">个人中心</span>
			</tabbar-item>
		</tabbar>

</template>

<script>
	import {Tabbar, TabbarItem, Group, Cell} from 'vux'
	export default{
		data(){
			return {
				msg: '1'
			}
		},
		components:{
			Tabbar,
			TabbarItem,
			Group,
			Cell
		},
	}
</script>

<style>

</style>