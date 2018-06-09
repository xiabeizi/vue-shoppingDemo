import Api from "./api/api";
import VueLazyLoad from "vue-lazyload";
import "./commom/css/base.css";
import Vue from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";

//把api挂载到 vue 原型上
Vue.prototype.$api = Api;

//懒加载插件
Vue.use(VueLazyLoad);

//跳转之前 判断用户是否登录了
router.beforeEach((to, from, next) => {
	let path = to.path;
	if (!store.getters.isLogin && (path === "/trolley" || path === "/order")) {
		next("/user");
	} else {
		next();
	}
});

// "2018-05-30" to "2018年05月30日"
Vue.filter("formateDate", date => {
	const arr = date.split("-");
	return `${arr[0]}年${arr[1]}月${arr[2]}日`;
});

new Vue({
	el: "#app",
	store,
	router,
	render: h => h(App)
});
