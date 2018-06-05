import vue from "vue";
import vuex from "vuex";
import api from "../api/api";

vue.use(vuex);

const state = {
	// 控制tabBar显示隐藏
	tabBarShow: true,
	//商品详细信息
	productDetail: {},
	//购物车中的商品
	trolley: [],
	//已完成的订单
	order: [],
	userInfo: null
};

const getters = {
	trolleyNum(state) {
		let num = 0;
		state.trolley.forEach(item => {
			num += item.num;
		});
		return num;
	},
	isLogin(state) {
		return state.userInfo;
	}
};

const mutations = {
	//设置商品详细信息
	setProductDetail(state, { good }) {
		state.productDetail = good;
	},
	//合并商品详细信息
	combineProductDetail(state, { good }) {
		state.productDetail = { ...state.productDetail, ...good };
	},
	//切换tab显示
	toggleTabbar(state, boolean) {
		state.tabBarShow = boolean;
	},
	//从购物车删除商品
	deleteGood(state, index) {
		state.trolley.splice(index, 1);
	},
	//把商品信息存到购物车中
	addToTrolley(state, { good, num = 1 }) {
		let ifAreadyAdd = false;
		//设置商品数量
		good.num = num;

		state.trolley.forEach((item, index) => {
			//在购物车中，直接添加商品数量
			if (item.good_id === good.good_id) {
				ifAreadyAdd = true;
				let newTrolley = { ...state.trolley[index] };
				newTrolley.num += good.num;
				//vue.set 触发状态更新
				vue.set(state.trolley, index, newTrolley);
			}
		});
		//不在购物车中,push进去
		if (!ifAreadyAdd) {
			state.trolley.push(good);
		}
	},
	//结算商品（把商品从购物车添加到订单）
	checkOut(state, arr) {
		//返回数组中不同的值，即删除相同的
		const difference = (a, b) => {
			const s = new Set(b);
			return a.filter(x => !s.has(x));
		};
		state.order = [...arr, ...state.order];
		state.trolley = difference(state.trolley, arr);
	},
	//设置登录信息
	setLogin(state, { userInfo }) {
		state.userInfo = userInfo;
	}
};

const actions = {
	//请求商品详细信息
	getProductDetail({ commit }, id) {
		api.getProductDetail(id).then(Response => {
			let good = Response.data;
			commit("combineProductDetail", { good });
		});
	},
	// 获取评论详情
	getComment({ commit }, { id, comment_num }) {
		api.getComment(id, { comment_num }).then(Response => {
			let good = Response.data;
			commit("combineProductDetail", { good });
		});
	},
	//设置登录信息
	setLogin({ commit }) {
		api.setLogin.then(Response => {
			let userInfo = Response.data;
			commit("setLogin", { userInfo });
		});
	}
};

const store = new vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;
