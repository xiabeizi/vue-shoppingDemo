import axios from "axios";
import Vue from "vue";

/**
 * mockjs模拟数据
 */

const api = {
	host: "http://localhost:3003/"
};

//通用路径
api.ajax = axios.create({
	baseURL: api.host
});

//获取全部商品资料
api.getGoods = api.ajax.get("/goodsData");

//获取商品的详细资料
api.getProductDetail = function(id) {
	return api.ajax.get("/goodsData/" + id);
};

//获取商品的评论信息
api.getComment = function(id) {
	return api.ajax.get("/goodsCommentDate/" + id);
};

//用户保存购物车商品
api.addToTrolley = function(good) {
	return api.ajax.post("/userTrolley/", good);
};

//用户更新购物车商品数量
api.updateTrolley = function(id, obj) {
	return api.ajax.patch("/userTrolley/" + id, obj);
};

//用户删除购物车商品
api.deleteGood = function(id) {
	return api.ajax.delete("/userTrolley/" + id);
};

//用户购买商品
api.checkOut = function(obj) {
	return api.ajax.post("/userOrder/", obj);
};

//请求订单信息
api.getOrder = api.ajax.get("/userOrder/");

//获取登录用户的信息
api.setLogin = api.ajax.get("/user");

export default api;
