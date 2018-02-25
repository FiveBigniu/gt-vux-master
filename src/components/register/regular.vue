<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main">
			<div class="login-warp">
			</div>
			<div>
				<div class="tab-swiper vux-center">
					<form @submit.prevent="register">
						<group>

							<x-input :max="16" :min="6" :is-type="rep.repName" novalidate :iconType="userComfirm.Namecfm" :class="{'area-num-picker':true,}" placeholder="用户名6~16位汉字，字符及数字" required show-clear v-model="user.username"  @on-blur="checkname" ></x-input>
							<!--<popup-picker  :data="list1" v-model="areaNum" ></popup-picker >-->
							<flexbox :gutter="0" class="phone-warp">
								<flexbox-item span="110px">
									<popup-picker value-text-align="center"  :data="areaList" v-model="areanum" @on-change="completePhone" ></popup-picker >
								</flexbox-item>
								<flexbox-item >
									<x-input :max="20" :min="6" type="tel" novalidate :iconType="userComfirm.Phonecfm" :areanum="getAreaNum" class="weui-vcode" placeholder="手机号" v-model="user.phonenum" @on-blur="completePhone" @on-change="disableSendBtn"></x-input>
								</flexbox-item>
							</flexbox>
							<x-input class="weui-vcode" :max="6"  :min="6" novalidate :icon-type="userComfirm.Testcfm" placeholder="请输入验证码" v-model="user.smscode" @on-blur="checkSmsCode">
								<x-button   :disabled="sendDisabled"   action-type="button" slot="right"  @click.native="sendMsgCode"   type="primary" mini>{{sendBtnTitle}}</x-button>
							</x-input>
							<x-input :max="16"  :min="6" type="password" novalidate :iconType="userComfirm.Passcfm" title="" placeholder="密码6~16位英文，符号和数字" required show-clear v-model="user.password" @on-blur="checkPass"></x-input>
							<x-input :max="16"  :min="6" type="password" novalidate :iconType="userComfirm.RePasscfm" title="" placeholder="确认密码" required show-clear v-model="user.repassword" @on-blur="checkRePass"></x-input>
							<x-address   v-model="user.address" :title="addressTitle" :list="addressData" :raw-value="true"  ></x-address>
							<x-input type="hidden" title=""   show-clear disabled v-model="show_regmsg"></x-input>
							<check-icon :value.sync="userComfirm.Agreecfm">我已阅读 <router-link to="/agreement/index">《好琴声用户协议》</router-link></check-icon>
							<br>
							<br>
							<x-button action-type="submit" type="primary">注册</x-button>
							<flexbox :gutter="0" class="other-menu">
								<!--<flexbox-item><div class="flex-demo"></div></flexbox-item>-->
								<flexbox-item><div class="flex-demo"></div></flexbox-item>
								<flexbox-item><div class="flex-demo"><router-link to="/session/login">前往登录</router-link></div></flexbox-item>丨
								<flexbox-item><div class="flex-demo"><router-link to="/session/forgetList">忘记密码</router-link></div></flexbox-item>
								<flexbox-item><div class="flex-demo"></div></flexbox-item>
								<!--<flexbox-item><div class="flex-demo"></div></flexbox-item>-->
							</flexbox>
						</group>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//	import foot from './components/footer/footer.vue'
	import Vue from 'vue';
	import heads from '../header/header.vue';
	import router from '../../router/index.js';
	import {XInput, Group,PopupPicker ,Picker,XButton, Flexbox, FlexboxItem, Divider,CheckIcon,AjaxPlugin,AlertPlugin,ToastPlugin,XAddress,ChinaAddressV3Data     } from 'vux'


	Vue.use(AlertPlugin);
	Vue.use(ToastPlugin);
	const list = ['注册', '手机快捷注册'];
    const apiurl = 'http://m.greattone.net/e/appapi';
	export default {
		name      : 'subapp',
		computed:{
			getAreaNum:{
				get: function () {
					return this.areanum[0].match(/\d+/g)[0];
				},
				set: function (value) {
					this.user.areanum = this.areanum[0].match(/\d+/g)[0];
				}
			}
		},
		data(){
			return {
				msg         : '登录',
				titleContent: '注册',
				list2       : list,
				isSend      : true,
				addressData : ChinaAddressV3Data,//三级地址联动数据
				addressTitle:'请选择地址',
				user        : {
					username: '', password: '', repassword: '', areanum: '86', phonenum: '', smscode: '',
					groupid : this.$route.params.groupid || 1,address:['上海市', '市辖区', '闵行区']

				},
				userComfirm:{
					Namecfm  : '',
					Phonecfm : '',
					Testcfm  : '',
					Passcfm  : '',
					RePasscfm: '',
					Agreecfm : false
				},
				rep:{
					repName:function (value) {
						console.log(1);
						let tips = '用户名必须为6-16位汉字,字母和数字，不能出现特殊符号';
						let re = /^[\u4E00-\u9FFFa-zA-Z0-9]+$/g.test(value);
						if (!re){
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}
						return{
							valid: re,
							msg: tips
						}
					},
					repTestNum:function (value) {
						let tips = '验证码为6位数字';
						let re = /^[0-9]{1,6}$/g.test(value);
						if (!re){
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}
						return{
							valid: re,
							msg: tips
						}
					}
				},
				show_regmsg : '',               //错误提示
				sendDisabled: true,             //发送验证码按钮是否变暗
				sendBtnTitle: '发送验证码',       //发送验证码按钮文字内容
				sendBtnTimer: '',               //发送验证码按钮文字内容
				agree       : false,            //是否同意注册协议
				areanum     : ['大陆+86'],
				areaList    : [                 //区域列表
					['大陆+86', '台湾+886', '香港+852', '澳门+853', '新加坡+65', '美国+1']
				]
			}
		},
		mounted(){
//			this.$vux.toast.show({
//				text: '注册成功',
//				time:2000,
//				isShowMask:true,
//				onHide () {
//
//				}
//			});
		},
		components: {
			heads, XInput, Group, XButton, Flexbox, FlexboxItem, Divider, PopupPicker , Picker, CheckIcon, AjaxPlugin, AlertPlugin,XAddress,ChinaAddressV3Data
		},
		methods   : {
			register(){
				if(!this.userComfirm.Namecfm){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '用户名填写错误,请重新填写'
                    });
                    return false;
                }else if (!this.userComfirm.Phonecfm){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '手机号填写错误,请重新填写'
                    });
                    return false;
                }else if (!this.userComfirm.Testcfm){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '短信验证码填写错误,请重新填写'
                    });
                    return false;
                }else if (!this.userComfirm.Passcfm){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '密码填写错误,请重新填写'
                    });
                    return false;
                }else if (!this.userComfirm.RePasscfm){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '重复密码填写错误,请重新填写'
                    });
                    return false;
                }else if (!this.userComfirm.Agreecfm){
					this.showPluginAuto();
					return false;
				};

				let params = new URLSearchParams();
				params.append('api','user/createUser');
				params.append('username',this.user.username);
				params.append('password',this.user.password);
				params.append('phone',this.user.phonenum);
				params.append('smscode',this.user.smscode);
				params.append('groupid',this.user.groupid);

				this.$vux.toast.show({
					text: '正在提交',
					time:5000,
					isShowMask:true,
				});

				this.$http.post(apiurl,params).then(res => {
					this.$vux.toast.hide();
					if (res.status === 200&&res.data.err_msg === 'error'){
						this.$vux.toast.show({
							text: res.data.info,
						});

					}else{
						var _this = this;
						console.log(_this)
						this.$vux.toast.show({
							text: '注册成功',
							time:1000,
							onHide () {
								router.replace('/')
							}
						});
					}
				}, res => {
					this.$vux.toast.hide()
					this.$vux.toast.show({
						text: '网络错误，请稍后重试',
					});
				});
			},
			showPlugin () {
				this.$vux.alert.show({
					title: '提示',
					content: '请阅读注册协议并点击同意',
					onShow () {
						console.log('showing')
					},
					onHide () {
						console.log('hiding now')
					}
				})
			},
			showPluginAuto () {
				this.showPlugin();
				setTimeout(() => {
					this.$vux.alert.hide()
				}, 3000)
			},
			completePhone() {
				let area = this.getAreaNum;//区号
				let re;
				let tips = '请输入正确的手机号';
				if (area == 86){ //大陆手机号
					re = /^1[0-9]\d{9}$/g.test(this.user.phonenum);
				}else {//大陆外手机号
					re = /^\d+$/g.test(this.user.phonenum);
				}
				if (!re){
					this.userComfirm.Phonecfm = 'error';
					this.sendDisabled  = true ;
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确格式的手机号',
					});
				}else{
					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/checkphone');
					params.append('phone',this.user.phonenum);
					this.$http.post(apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							this.userComfirm.Phonecfm = 'error';
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							});
							this.sendDisabled  = true;
						}else{
							this.userComfirm.Phonecfm = 'success';
							this.sendDisabled  = false;
						}
					}, res => {
						this.userComfirm.Phonecfm = 'error';
						tips = res;
						this.sendDisabled  = true;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						})
					})
				}
			},//检测手机号是否可以用
			disableSendBtn(){
				this.sendDisabled  = true ;
			},//让发送验证码按钮禁用
			checkname(){
				let tips ;
				let username = this.user.username;                                                             //获取用户名
				let length1 = username.match(/[\u4E00-\u9FFF]/g)?username.match(/[\u4E00-\u9FFF]/g).length*2:0;//用户名中，中文长度
				let length2 = username.match(/[a-zA-Z0-9]/g)? username.match(/[a-zA-Z0-9]/g).length:0;         //用户名中英文长度
				let re = /[\u4E00-\u9FFFa-zA-Z0-9]/g.test(username);                                           //检测用户名中有没有非法字符

				if (length1+length2<6||length1+length2>16){
					tips = '用户名必须为6-16位';
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					});
					this.userComfirm.Namecfm = 'error';
				}else if (!re){
					tips='用户名必须汉字,字母和数字，不能出现特殊符号';
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					});
					this.userComfirm.Namecfm = 'error';
				}else{
					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/checkuser');
					params.append('username',this.user.username);
					this.$http.post(apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							this.userComfirm.Namecfm = 'error';
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}else{
							this.userComfirm.Namecfm = 'success';
						}
					}, res => {
						this.userComfirm.Namecfm = 'error';
						tips = res;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						})
					});
				}
			},//检查用户名是否可用
			sendMsgCode(){
				let Namecfm = this.userComfirm.Namecfm;
				let tips;
				if (Namecfm == 'success'){
                    this.sendDisabled = true ; //让发送按钮禁用
                    //拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/sendSms');
					params.append('username',this.user.username);
					params.append('Area','00'+this.getAreaNum);
					params.append('phone',this.user.phonenum);

					this.$http.post(apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							});
							this.sendDisabled = false ; //让发送按钮重新可以点击

						}else{
							let sendTime = 60;
							let timer_this = this;
							function changeSendBtn () {
								if (sendTime<0){
									timer_this.sendBtnTitle = '发送验证码';
									clearInterval(timer_this.sendBtnTimer);
									this.sendDisabled = false ; //让发送按钮重新可以点击
									return false;
								}
								timer_this.sendBtnTitle = sendTime+'s';
								sendTime--;
							}
							this.sendBtnTimer = setInterval(changeSendBtn,1000);
						}
					}, res => {
						this.userComfirm.Namecfm = 'error';
						tips = res;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						});
						this.sendDisabled = false ; //让发送按钮重新可以点击
					});
				}else{
					this.$vux.alert.show({
						title: '提示',
						content: '请先填写正确的用户名',
					});
				}
			},
			checkSmsCode(){
				let smsCode = this.user.smscode;
				let re = /^\d{6}$/.test(smsCode);
				let tips = '验证码为6位数字，请重新输入';
				if (smsCode === ''){
					this.userComfirm.Testcfm = 'error';
				}else if (!re){
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					});
					this.userComfirm.Testcfm = 'error';
				}else{

					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/checkcode');
					params.append('phone',this.user.phonenum);
					params.append('smscode',smsCode);

					this.$http.post(apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							this.userComfirm.Testcfm = 'error';
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							});
						}else{
							this.userComfirm.Testcfm = 'success';
						}
					}, res => {
						this.userComfirm.Phonecfm = 'error';
						tips = res;

						this.sendDisabled  = true;

						this.$vux.alert.show({
							title: '提示',
							content: tips,
						})
					})
				}
			},
			checkPass(){
			    let pass = this.user.password;
			    let re = /^[\w\S]{6,16}$/.test(pass);
			    if (re){
			        this.userComfirm.Passcfm = 'success';
				}else{
                    this.userComfirm.Passcfm = 'error';
                }
			},
            checkRePass(){
                let repass = this.user.repassword;
                let pass = this.user.password;
                if (this.userComfirm.Passcfm&&repass === pass){
                    this.userComfirm.RePasscfm = 'success';
                }else{
                    this.userComfirm.RePasscfm = 'error';
                }
            },
			showToast(){
            	var _this = this;
				this.$vux.toast.show({
				text: 'test',
				time:5000,
				onHide () {
					console.log(_this)
					}
				})
			}

		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';

	.area-num-picker:before{
		border-top:1px solid #fff!important;
	}

	.area-num-picker .weui-cell{
		padding: 0;
	}

	.phone-warp{
		/*margin-left:15px;*/
		border-top: #ECECEC solid 1px;
	}
	.weui-cell:before{
		left: 0;
	}
	.weui-btn_disabled.weui-btn_primary{
		background-color: #ccc;
	}
	.vux-cell-box:before{
		left: 0;
	}
	.weui-cells:after{
		border-bottom:none!important;
	}
</style>
