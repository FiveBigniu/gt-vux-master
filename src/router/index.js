import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index.vue'

import session from '@/components/session/index.vue'
import login from '@/components/session/login.vue'

import regSelect from '@/components/register/index.vue';
import regRegular from '@/components/register/regular.vue'

import forgetList from '@/components/session/forgetList.vue'
import forget from '@/components/session/forget.vue'
import agreement from '@/components/session/agreement.vue'
import test from '@/components/test/index.vue'

Vue.use(Router);

const router = new Router({
	routes: [
		{path: '/', component: Home,name: 'Home'},
		{
			path: '/session',
			name: 'session',
			component: session,
			redirect:'/session/login',
			children: [
				{path: '/session/agreement', name: 'agreement', component: agreement},
				{path: '/session/login', name: 'login', component: login},
				{path: '/session/regSelect', name: 'regSelect', component: regSelect},
				{path: '/session/regRegular/:groupid', name: 'regRegular', component: regRegular},
				{path: '/session/forgetList', name: 'forgetList', component: forgetList},
				{path: '/session/forget', name: 'forget', component: forget},

			]
		},
		{
			path: '/test',
			name: 'test',
			component: test,
			children: [
				{path: '/session/agreement', name: 'agreement', component: agreement},
				{path: '/session/login', name: 'login', component: login},
			]
		},
	]
});
router.beforeEach((to,from,next)=>{
	if(to.name === 'regRegular'){
		if (/^[1-5]{1}$/.test(to.params.groupid)){
			next()
		}else{
			alert('注册身份组别选择错误，请重新选择');
			router.replace('/session/regSelect');
		}

	}else if (to.path.match(/^\/session/) == '/session'){
		next()
	}else {
		next()
	}
})


export default router;