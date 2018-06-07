import vue from "vue";
import vuex from "vuex";
import http from "../api/api";

vue.use(vuex);

const state = {
	// 控制tabBar显示隐藏
	tabBarShow: true,
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
	//切换tab显示
	toggleTabbar(state, boolean) {
		state.tabBarShow = boolean;
	},
	//从购物车删除商品
	deleteGood(state, index) {
		state.trolley.splice(index, 1);
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
	},
	//更新商品书籍
	_updateTrolley(state, { type, index, newTrolley }) {
		switch (type) {
			case "push":
				state.trolley.splice(0, 0, newTrolley);
				break;
			case "update":
				state.trolley.splice(index, 1, newTrolley);
				break;
			case "delete":
				state.trolley.splice(index, 1);
				break;
		}
	}
};

const actions = {
	//设置登录信息
	setLogin({ commit }) {
		http.setLogin.then(Response => {
			let userInfo = Response.data;
			commit("setLogin", { userInfo });
		});
	},
	//把商品信息存到购物车中
	addToTrolley(store, { good, num = 1 }) {
		let ifAreadyAdd = false;
		let trolley = store.state.trolley;
		//判断是否在购物车中
		trolley.forEach((item, index) => {
			//在购物车中，直接添加商品数量
			if (item.id === good.id) {
				ifAreadyAdd = true;
				let newTrolley = { ...trolley[index] };
				newTrolley.num += num;
				//更新本地vuex中的数据 vue.set 触发状态更新，
				store.commit("_updateTrolley", {
					type: "update",
					index,
					newTrolley
				});
				//保存到数据库
				let id = good.id;
				http.updateTrolley(id, { num: newTrolley.num });
			}
		});
		//不在购物车中,添加商品到vuex和数据库
		if (!ifAreadyAdd) {
			//设置默认商品数量1
			good.num = 1;
			//保存新商品到vuex
			store.commit("_updateTrolley", {
				type: "push",
				newTrolley: good
			});
			//保存新商品到数据库
			http.addToTrolley(good);
		}
	},
	//从购物车删除商品
	deleteGood(store, { id, index }) {
		http.deleteGood(id);
		store.commit("_updateTrolley", { type: "delete", index });
	},
	//结算商品
	checkOut(store, arr) {
		let trolley = store.state.trolley;
		let checkOutObj = [];
		arr.forEach(id => {
			trolley.forEach((item, index) => {
				if (item.id === id) {
					checkOutObj.push(item);
					//删除vuex中的商品
					store.commit("_updateTrolley", { type: "delete", index });
					//删除数据库购物车商品
					http.deleteGood(id);
				}
			});
		});
		//从数据库 删除购物车商品
		//保存已完成订单到数据库
		const id = new Date().getTime();
		const obj = { id, order: checkOutObj };
		http.checkOut(obj);
	}
};

const store = new vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;
