import Vue from "vue";
import Router from "vue-router";

//首页
const home = resolve => require(["../components/Home/Home.vue"], resolve);
//订单页
const order = resolve => require(["../components/order/order.vue"], resolve);
//购物车页
const trolley = resolve =>
	require(["../components/trolley/trolley.vue"], resolve);
//用户中心
const user = resolve => require(["../components/user/user.vue"], resolve);
//商品详情
const goodDetail = resolve =>
	require(["../components/good-detail/good-detail.vue"], resolve);

// 评论
const comment = resolve =>
	require(["../components/comment/comment.vue"], resolve);

Vue.use(Router);

function checkIfLogin(to, from, next) {
	if (true) {
		next();
	} else {
		next("/user");
	}
}

export default new Router({
	routes: [
		{ path: "/", component: home },
		{ path: "/home", component: home },
		{ path: "/order", component: order, beforeEnter: checkIfLogin },
		{ path: "/trolley", component: trolley, beforeEnter: checkIfLogin },
		{ path: "/user", component: user },
		{ path: "/good-detail/:id", component: goodDetail },
		{ path: "/comment/:id", component: comment }
	]
});
