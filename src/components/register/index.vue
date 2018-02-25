'<template>
<div class="groupselect">
	<heads :tit="headertitle"></heads>
	<flexbox wrap="wrap" :gutter="0">
		<flexbox-item class="group-wrap" :span="1/2">
			<div class="group-item">
				<router-link :to="{ name: 'regRegular', params: { groupid: 1 }}">
					<img class="group-pic" src="../../assets/greattone/group1.png" alt="">
					<h2 class="group-title">爱乐人</h2>
					<p class="group-dec">适合学生，家长，喜欢音乐的朋友申请。</p>
				</router-link>
			</div>
		</flexbox-item>
		<flexbox-item class="group-wrap" :span="1/2">
			<div class="group-item">
				<router-link :to="{ name: 'regRegular', params: { groupid: 3 }}">
					<img class="group-pic" src="../../assets/greattone/group3.png" alt="">
					<h2 class="group-title">音乐老师</h2>
					<p class="group-dec">适合全职或兼职的从事音乐教育的人士申请。</p>
				</router-link>
			</div>
		</flexbox-item>
		<flexbox-item class="group-wrap" :span="1/2">
			<div class="group-item">
				<router-link :to="{ name: 'regRegular', params: { groupid: 4}}">
					<img class="group-pic" src="../../assets/greattone/group4.png" alt="">
					<h2 class="group-title">琴行教室</h2>
					<p class="group-dec">适合培训中心， 琴行申请。</p>
				</router-link>
			</div>
		</flexbox-item>
		<flexbox-item class="group-wrap" :span="1/2">
			<div class="group-item">
				<router-link :to="{ name: 'regRegular', params: { groupid:5 }}">
					<img class="group-pic" src="../../assets/greattone/group5.png" alt="">
					<h2 class="group-title">乐器品牌</h2>
					<p class="group-dec">提供乐器制造商展示平台。。</p>
				</router-link>
			</div>
		</flexbox-item>
	</flexbox>
</div>
</template>

<script>
import heads from '@/components/header/header.vue'
import { Flexbox, FlexboxItem, Divider } from 'vux'
import router from '../../router/index';
export default {
	data(){
		return{
			headertitle:"会员注册"
		}
	},
	components: {
		heads,
		Flexbox,
		FlexboxItem,
		Divider
	}
}
</script>

<style lang="less">
	.groupselect{
		.group-wrap{
			padding: 10px;
			box-sizing:border-box;
		}
	    .group-item{
		    padding: 20px;
	        border:#ccc solid 2px;
	        border-radius:5px;
		    img{
			    width:100%;
		    }
	        .group-title{
		        color: #333;
		        font-size: 16px;
		        line-height:30px;
		        text-align: center;
	        }
			.group-dec{
				color: #333;
				font-size: 12px;
				line-height:20px;
			}
	    }
	}
</style >