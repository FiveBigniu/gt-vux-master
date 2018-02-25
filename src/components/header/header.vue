<template>
	<div class="header-warp" >
		<x-header  :left-options="{backText: ''}">{{tit}}</x-header>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	export default{
		data(){
			return {
				msg: '1',
				menus: {
					menu1: 'Take Photo',
					menu2: 'Choose from photos'
				},
				showMenus: false
			}
		},
		directives: {
			TransferDom
		},
		components:{
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem
		},
		props: [
			'tit'
		]
	}
</script>

<style lang="less">
	.header-warp{
		.vux-header{
			background-color: #fff;
		}
		.vux-header h1{
			color: #333;
			font-weight: bold;
		}
	}

</style>