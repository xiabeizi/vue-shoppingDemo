import axios from "axios";
import Vue from "vue";

/**
 * mockjs模拟数据
 */

const api = {
	apiPath: "/mock"
};

//通用路径
api.ajax = axios.create({
	baseURL: api.apiPath
});

//获取全部商品资料
api.getGoods = api.ajax.get("/goods");

//获取商品的详细资料
api.getProductDetail = function(id) {
	return api.ajax.get("/goods/" + id);
};

//获取商品的评论信息
api.getComment = function(id, { comment_num }) {
	return api.ajax.get("/comment/" + id + "?comment_num=" + comment_num);
};

//获取登录用户的信息
api.setLogin = api.ajax.get("/user");
export default api;
