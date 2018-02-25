<template>
	<div id="index"  style="height: 100%;">
		<drawer
			width="200px;"
			show.sync="false"
			show-mode="push"
			placement="left"
			:drawer-style="{'background-color':'#35495e', width: '200px'}">
			<view-box ref="viewBox">
				<div class="search-wrap">搜索</div>
				<div class="swipe-wrap">
					<swiper :list="swipeList" :show-desc-mask="false" :auto="true" :loop="true"></swiper>
				</div>
				<div class="main-menu">
					<grid :rows="4">
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-xx.png">
							<span slot="label">音乐新星</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-dq.png">
							<span slot="label">斗琴擂台</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-bs.png">
							<span slot="label">各地比赛</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-hx.png">
							<span slot="label">网络海选</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-hd.png">
							<span slot="label">音乐活动</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-mr.png">
							<span slot="label">名人专区</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-qh.png">
							<span slot="label">琴行教室</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-pp.png">
							<span slot="label">乐器品牌</span>
						</grid-item>
					</grid>
				</div>
				<!--音乐广场等分组展示-->
				<div class="mian-list">
					<div class="mian-list-menu">
						<!--音乐广场等的选项-->
						<tab class="main-list-tab" :line-width="1" custom-bar-width="26px"  v-model="index">
							<tab-item @on-item-click="mainMenuPicke" selected>
								<span >音乐广场</span>
								<img src="../../assets/greattone/sanjiao.png">
							</tab-item>
							<tab-item @on-item-click="mainMenuPicke">关注动态</tab-item>
							<tab-item @on-item-click="mainMenuPicke">热门动态</tab-item>
						</tab>
						<!--音乐广场等下的二级分组-->
						<swiper class="main-sublist-tab sublist-tab-hide" v-model="index" height="60px" :show-dots="false">
							<swiper-item >
								<div class="tab-swiper vux-center">
									<checker class=""
									         selected-item-class="checker-item-selected">
										<checker-item value="全部动态" @on-item-click="onItemClick">全部动态</checker-item>
										<checker-item value="音乐新闻" @on-item-click="onItemClick">音乐新闻</checker-item>
										<checker-item value="原创新闻" @on-item-click="onItemClick">原创新闻</checker-item>
										<checker-item value="推荐帖"  @on-item-click="onItemClick">推荐帖</checker-item>
									</checker>
								</div>
							</swiper-item>
							<swiper-item >
								<div class="tab-swiper vux-center">
									<checker class=""
									         selected-item-class="checker-item-selected">
										<checker-item value="全部动态" @on-item-click="onItemClick">全部动态</checker-item>
										<checker-item value="音乐新闻" @on-item-click="onItemClick">音乐新闻</checker-item>
										<checker-item value="原创新闻" @on-item-click="onItemClick">原创新闻</checker-item>
										<checker-item value="推荐帖"  @on-item-click="onItemClick">推荐帖</checker-item>
									</checker>
								</div>
							</swiper-item>
							<swiper-item >
								<div class="tab-swiper vux-center">
									<checker class=""
									         selected-item-class="checker-item-selected">
										<checker-item value="全部动态" @on-item-click="onItemClick">全部动态</checker-item>
										<checker-item value="音乐新闻" @on-item-click="onItemClick">音乐新闻</checker-item>
										<checker-item value="原创新闻" @on-item-click="onItemClick">原创新闻</checker-item>
										<checker-item value="推荐帖"  @on-item-click="onItemClick">推荐帖</checker-item>
									</checker>
								</div>
							</swiper-item>
						</swiper>
						<!--显示二级分组时候的底部遮罩-->
						<div class="list-cover list-cover-hide" @touchend.click="sulistHide"></div>
						<!--实际展示的列表-->
						<div class="main-content-lists">
							<!--视频卡片-->
							<card class="content-list-item" v-for="item in guangList" v-if="item.classid == 11" :key="item.id">
								<!--卡片头部-->
								<div slot="header" class="clearfix">
									<div class="titlepic-wrap ff">
										<img class="titlepic" :src="item.userinfo.userpic" :alt="item.userinfo.username">
										<img v-if="item.ismember==1" class="vip" src="../../assets/greattone/vip.png" alt="">
									</div>
									<div class="title-wrap ff">
										<h2 class="title">{{item.userinfo.username}}<span class="level">{{item.userinfo.level.name}}</span></h2>
										<p><span class="group">{{item.userinfo.groupname}}</span><span class="area">{{item.userinfo.address}}</span><span class="time">{{item.userinfo.newstime}}</span></p>
									</div>
									<div class="buttons fr">
										<x-button class="userBtn1" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 0" >关注</x-button>
										<x-button class="userBtn1 hasFollow" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 1">已关注</x-button>
									</div>
								</div>
								<!--卡片内容-->
								<div  slot="content">
									<router-link :to="item.titleurl">
										<h3 class="content-title">{{item.title}}</h3>
										<div class="list-item-content">
											<img class="contentpic" :src="item.titlepic" :alt="item.title">
											<img class="play" src="../../assets/greattone/play.png" alt="">
										</div>
										<p class="content-text">{{item.smalltext}}</p>
									</router-link>
								</div>
								<!--卡片底部-->
								<div slot="footer" class="card-demo-flex card-demo-content01">
									<div class=" vux-1px-r footer-icon">
										<img src="../../assets/greattone/zan.png" alt="">
										<span>{{item.diggtop}}</span>
									</div>
									<div class="vux-1px-r footer-icon">
										<img src="../../assets/greattone/discuss.png" alt="">
										<span>{{item.plnum}}</span>
									</div>
									<div class="footer-icon">
										<img src="../../assets/greattone/share.png" alt="">
										<span>分享</span>
									</div>
								</div>

							</card>
							<!--图片卡片-->
							<card class="content-list-item" v-for="item in guangList" v-if="item.classid == 12" :key="item.id">
								<!--卡片头部-->
								<div slot="header" class="clearfix">
									<div class="titlepic-wrap ff">
										<img class="titlepic" :src="item.userinfo.userpic" :alt="item.userinfo.username">
										<img v-if="item.ismember==1" class="vip" src="../../assets/greattone/vip.png" alt="">
									</div>
									<div class="title-wrap ff">
										<h2 class="title">{{item.userinfo.username}}<span class="level">{{item.userinfo.level.name}}</span></h2>
										<p><span class="group">{{item.userinfo.groupname}}</span><span class="area">{{item.userinfo.address}}</span><span class="time">{{item.userinfo.newstime}}</span></p>
									</div>
									<div class="buttons fr">
										<x-button class="userBtn1" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 0" >关注</x-button>
										<x-button class="userBtn1 hasFollow" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 1">已关注</x-button>
									</div>
								</div>
								<!--卡片内容-->
								<div  slot="content">
									<router-link :to="item.titleurl">
										<h3 class="content-title">{{item.title}}</h3>
										<flexbox class="content-pics">
											<flexbox-item :span="1/3"  v-for="(key,index) in item.morepic" v-if="index<3"><div class="flex-demo" ><img class="" :default-src="imgPlaceHolder"   :src="key.thumbnail" :alt="item.title" ></div></flexbox-item>
										</flexbox>
										<p class="content-text">{{item.smalltext}}</p>
									</router-link>
								</div>
								<!--卡片底部-->
								<div slot="footer" class="card-demo-flex card-demo-content01">
									<div class=" vux-1px-r footer-icon">
										<img src="../../assets/greattone/zan.png" alt="">
										<span>{{item.diggtop}}</span>
									</div>
									<div class="vux-1px-r footer-icon">
										<img src="../../assets/greattone/discuss.png" alt="">
										<span>{{item.plnum}}</span>
									</div>
									<div class="footer-icon">
										<img src="../../assets/greattone/share.png" alt="">
										<span>分享</span>
									</div>
								</div>
							</card>
							<!--音乐卡片-->
							<card class="content-list-item" v-for="item in guangList" v-if="item.classid == 13" :key="item.id">
								<!--卡片头部-->
								<div slot="header" class="clearfix">
									<div class="titlepic-wrap ff">
										<img class="titlepic" :src="item.userinfo.userpic" :default-src="imgPlaceHolder" :alt="item.userinfo.username">
										<img v-if="item.ismember==1" class="vip" src="../../assets/greattone/vip.png" alt="">
									</div>
									<div class="title-wrap ff">
										<h2 class="title">{{item.userinfo.username}}<span class="level">{{item.userinfo.level.name}}</span></h2>
										<p><span class="group">{{item.userinfo.groupname}}</span><span class="area">{{item.userinfo.address}}</span><span class="time">{{item.userinfo.newstime}}</span></p>
									</div>
									<div class="buttons fr">
										<x-button class="userBtn1" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 0" >关注</x-button>
										<x-button class="userBtn1 hasFollow" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 1">已关注</x-button>
									</div>
								</div>
								<!--卡片内容-->
								<div  slot="content">
									<router-link :to="item.titleurl">
										<h3 class="content-title">{{item.title}}</h3>
										<div class="list-item-content music-list clearfix">
											<div class="music-pic ff">
												<img class="contentpic" :default-src="imgPlaceHolder" :src="item.titlepic" :alt="item.title">
												<img class="play" src="../../assets/greattone/play.png" alt="">
											</div>
											<div class="music-title">
												<h3>{{item.title}}</h3>
											</div>
										</div>
										<p class="content-text">{{item.smalltext}}</p>
									</router-link>
								</div>
								<!--卡片底部-->
								<div slot="footer" class="card-demo-flex card-demo-content01">
									<div class=" vux-1px-r footer-icon">
										<img src="../../assets/greattone/zan.png" alt="">
										<span>{{item.diggtop}}</span>
									</div>
									<div class="vux-1px-r footer-icon">
										<img src="../../assets/greattone/discuss.png" alt="">
										<span>{{item.plnum}}</span>
									</div>
									<div class="footer-icon">
										<img src="../../assets/greattone/share.png" alt="">
										<span>分享</span>
									</div>
								</div>
							</card>
							<!--海选卡片-->
							<card class="content-list-item" v-for="item in guangList" v-if="item.classid == 73" :key="item.id">
								<!--卡片头部-->
								<div slot="header" class="clearfix">
									<div class="titlepic-wrap ff">
										<img class="titlepic" :src="item.userinfo.userpic" :alt="item.userinfo.username">
										<img v-if="item.ismember==1" class="vip" src="../../assets/greattone/vip.png" alt="">
									</div>
									<div class="title-wrap ff">
										<h2 class="title">{{item.userinfo.username}}<span class="level">{{item.userinfo.level.name}}</span></h2>
										<p><span class="group">{{item.userinfo.groupname}}</span><span class="area">{{item.userinfo.address}}</span><span class="time">{{item.userinfo.newstime}}</span></p>
									</div>
									<div class="buttons fr">
										<x-button class="userBtn1" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 0" >投票</x-button>
										<x-button class="userBtn1" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 0" >关注</x-button>
										<x-button class="userBtn1 hasFollow" action-type="button" :mini="true" :plain="true" type="primary" v-if="item.isguanzhu == 1">已关注</x-button>
									</div>
								</div>
								<!--卡片内容-->
								<div  slot="content">
									<router-link :to="item.titleurl">
										<h3 class="content-title">{{item.hai_name}}参加{{item.hai_division}}的比赛</h3>
										<div class="list-item-content">
											<img class="contentpic" :src="item.hai_photo" :alt="item.title">
											<img class="play" src="../../assets/greattone/play.png" alt="">
										</div>
										<p class="content-text">{{item.smalltext}}</p>
									</router-link>
								</div>
								<!--卡片底部-->
								<div slot="footer" class="card-demo-flex card-demo-content01">
									<div class=" vux-1px-r footer-icon">
										<img src="../../assets/greattone/zan.png" alt="">
										<span>{{item.diggtop}}</span>
									</div>
									<div class="vux-1px-r footer-icon">
										<img src="../../assets/greattone/discuss.png" alt="">
										<span>{{item.plnum}}</span>
									</div>
									<div class="footer-icon">
										<img src="../../assets/greattone/share.png" alt="">
										<span>分享</span>
									</div>
								</div>

							</card>
						</div>
					</div>
				</div>
				<!--<heads :tit="titleContent"></heads>-->
				<router-view></router-view>
			</view-box>
			<foot ></foot>
		</drawer>
	</div>
	<!--<router-view></router-view>-->
</template>

<script>
//	import Vue from 'vue';
	import foot from '@/components/footer/footer.vue';
	import heads from '@/components/header/header.vue';
	import staticData from '@/components/static/data.js';
	import router from '../../router/index.js';
	import { Drawer,ViewBox,Swiper,SwiperItem , Grid, GridItem,Tab,TabItem,TransferDom, Popup,Checker,CheckerItem,ToastPlugin,Card,Divider,XButton,Flexbox,FlexboxItem,XImg } from 'vux'
//	Vue.use(AjaxPlugin);
	export default {
		name: 'subapp',
		created(){
			this.getSwipeList();
		},
		mounted(){
			this.hasLogin();
//			this.getGuangList(1);
		},
		directives:{
			TransferDom
		},
		data(){
			return{
				msg:'好琴声',
				titleContent:'好琴声主页',
				user:'',
				index: 0,
				imgPlaceHolder:'http://greattone.oss-cn-shanghai.aliyuncs.com/images/placeholder.png?x-oss-process=style/pc-userpic',
				swipeList:[],//主轮播图列表
				subGuang:false, //音乐广场列表下子列表显示
				guangList:[]
			}
		},
		components:{
			foot,heads, Drawer, ViewBox,Swiper,SwiperItem, Grid, GridItem,Tab,TabItem, Popup,Checker,CheckerItem,ToastPlugin,Card,Divider,XButton,Flexbox,FlexboxItem,XImg
		},
		methods:{
			hasLogin(){
				let userdata = sessionStorage.getItem('userdata');
				if(!userdata){
					router.replace('/session/login');
				}else{
					this.user = JSON.parse(userdata);
//					this.$vux.toast.show({
//						text:this.user.username + ',欢迎回来！'
//					});
					this.getGuangList(1);
				}
			},
			getSwipeList(){
				let params = new URLSearchParams();
				params.append('api','extend/getAdvList');
				params.append('classid',5);

				this.$http.post(staticData.apiurl,params).then(res=>{
					let obj = {};
					let _this = this;
					if (res.data.err_msg == 'success'){
						res.data.data.forEach(function (item,index) {
							obj.url = item.url;
							obj.img = item.pic;
//							obj.title = item.title;
							_this.swipeList.push(obj)
						})
					}
				},res=>{

				}).catch(res=>{

				})
			},
			onItemClick (value) {
				console.log(value )
				if (!this.disabled) {
					this.showPopup = false
				}
			},
			mainMenuPicke(index){
				this.sulistShow();
				switch(index){
					case 0:this.subGuang = true;
						break;
					case 1:this.subGuang = true;
						break;
					case 2:this.subGuang = true;
						break;
				}
			},
			sulistHide(e){
				document.querySelector('.main-sublist-tab').className += " "  +'sublist-tab-hide';
				e.target.className += " " + 'list-cover-hide';
			},//隐藏音乐广场子选项列表及遮罩
			sulistShow(){
				let sublistTab = document.querySelector('.main-sublist-tab');
				sublistTab.className = sublistTab.className.replace(/sublist\-tab\-hide/g,' ');
				let cover = document.querySelector('.list-cover');
				cover.className = cover.className.replace(/list\-cover\-hide/g,' ');
			},//音乐广场子选项列表及遮罩
			getGuangList(type){
				let params = 'api=' + 'info/guanlist' +
					'&classid=' + '1' +
					'&query=' + '' +
					'&extra=' + 'shipin,hai_id,hai_video,hai_photo,hai_petition,hai_name' +
					'&pageIndex=' + 1 +
					'&pageSize=' + 30 +
					'&loginuid=' + this.user.userid +
					'&logintoken=' + this.user.token;
				this.$http.post(staticData.apiurl,params,{headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}).then(res=>{
					this.guangList = res.data.data
				},res=>{
					console.log(res.data)
				}).catch(res=>{
					console.log(res)
				})
			}
		},
	}
</script>

<style  lang="less">
	@import "../../../node_modules/vux/src/styles/variable.less";
	@import "../../assets/css/common.less";
	#index{
		background-color:#f2f2f5;
		.main-menu{
			background-color: #fff;
			margin-bottom: 10px;
		}
		.weui-grid__icon{
			width:40px;
			height: 40px;
		}
	    .weui-grids:before,.weui-grids:after{
		    border-color:#fff;
	    }
		.weui-grid:before,.weui-grid:after{
			border-color:#fff;
		}
		.weui-grid{
			padding:16px 2px 2px;
		}

	}

	.vux-popup-dialog{
		background-color: #fafafa!important;
	}
	
	.mian-list-menu{
		background-color: #fafafa!important;
		position:relative;
		.vux-checker-box{
			margin-top: 15px;
			display: flex;
			height: 45px;
		}
		.vux-checker-item{
			flex: auto;
			text-align: center;
			margin-right: 5px;
			margin-left: 5px;
			height: 30px;
			line-height:30px;
			border-radius: 3px;
			background-color: #F0F0F0;
			/*width:20%;*/
		}
	    .vux-checker-item.checker-item-selected{
		    background-color: @theme-color;
		    color: #fff;
	    }
	    .main-list-tab{
		    position: relative;
		    z-index: 1000;
	    }
	    .main-sublist-tab{
		    top:44px;
		    transition: all 0.5s;
		    z-index: 900;

	    }
	    .sublist-tab-hide{
			opacity: 0;
		    transform: translateY(-60px);
	    }
	    .main-sublist-tab{
		    position: absolute;
		    width:100%;
		    background-color: #fafafa;
	    }
	    .list-cover{
		    background-color: rgba(0,0,0,0.4);
		    width:100%;
		    height: 100%;
		    transition: all 0.5s ease 0s;
		    position: absolute;
		    z-index: 400;
	    }
	    .list-cover-hide{
		    opacity: 0;
		    display: none;
	    }
	    /*单个文章*/
		.card-demo-flex {
			display: flex;
		}
		.card-demo-content01 {
			padding: 10px 0;
		}
		.card-padding {
			padding: 15px;
		}
		.card-demo-flex > div {
			flex: 1;
			text-align: center;
			font-size: 12px;
		}
	    .content-list-item{
		    padding: 12px 12px 0;
		    background-color: #fff;
	    }
	    .titlepic-wrap{
		    width:40px;
		    height:40px;
		    border-radius: 50%;
		    overflow: hidden;
		    position: relative;
		    margin-right: 10px;
			.titlepic{
				width:100%;
				height: 100%;
			}
			.vip{
				width:16px;
				height:16px;
				position: absolute;
				bottom:0;
				right:0;
			}


	    }

		.title-wrap{
			.title{
				font-size: 16px;
				line-height:20px;
			}
	        p{
		        font-size: 12px;
		        line-height:20px;
		        span{
			        margin-right: 5px;
		        }
	        }
			.level{
				font-size: 10px;
				border:#4E91D6 solid 1px;
				color: #4E91D6;
				margin-left: 5px;
				border-radius: 3px;
				line-height:16px;
				padding: 0 3px;
			}
		}
		.music-title{
			h3{
				font-size: 16px;
				line-height:30px;
				color: #000;
			}
	        margin-left:90px;
		}
		.buttons{
			.userBtn1{
				color: @mainColor;
				border-color: #ccc;
				padding-left: 10px;
				padding-right: 10px;
				margin-top: 4px;
			}
	        .userBtn1:active{
		        color: #fff;
		        background-color: @mainColor;
		        border-color: @mainColor;
	        }
	        .hasFollow{
		        color: #ccc;
	        }
			.hasFollow:active{
				color: #ccc;
				background-color: #fff;
				border-color: #ccc;
			}
		}
		.vux-card-content{
			.list-item-content{
				height:150px;
				width:100%;
				position: relative;
				background-color:#000;
				overflow:hidden;
				.contentpic{
					max-width: 100%;
					position: relative;
					left: 50%;
					top:50%;
					transform: translate(-50%,-50%);
				}
				.play{
					position: absolute;
					left:50%;
					top:50%;
					transform: translate(-50%,-50%);
				}

			}
			.list-item-content.music-list{
				height: 80px;
				background-color: #F4F5F6;
			}
			.content-pics{
				/*max-height: 120px;*/
				width:95%!important;
				.vux-flexbox-item{
					height: 100%;
				}
			}
			.flex-demo{
				img{
					max-width:100%;
					height: auto;
				}
			}
			.content-title{
				font-size: 16px;
				line-height:40px;
				color: #333;
				overflow: hidden;
				white-space: nowrap;
				-ms-text-overflow: ellipsis;
				text-overflow: ellipsis;
			}
	        .content-text{
				font-size: 14px;
		        line-height:24px;
		        max-height:48px;
		        overflow: hidden;
		        padding: 5px 0;
		        color: #999;
		        border-bottom: #f2f2f5 solid 1px;
	        }
		}

		.vux-card-content>div>a{
			display: block;
			width:100%;
		}
		.music-pic{
			height: 80px;
			width:80px;
			position: relative;
			background:url('http://greattone.oss-cn-shanghai.aliyuncs.com/images/placeholder.png?x-oss-process=style/pc-userpic');
		}
		.footer-icon{
			img{
				width:20px;
				height:20px;
				vertical-align: middle;
			}
			span{
				display: inline-block;
				line-height:20px;
				vertical-align: middle;

			}

		}
	/*单个文章*/
	}
</style>
