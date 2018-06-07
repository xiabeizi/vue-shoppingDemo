import Api from "./api/api";
import "./commom/css/base.css";
import Vue from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";

Vue.prototype.$api = Api;

router.beforeEach((to, from, next) => {
	// console.log(to, from)
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
