// 引入mockjs
const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;

// mock 全部商品数据
const goodsData = function() {
	let goodsData = [];
	for (let i = 8; i > 0; i--) {
		let newGoodsObject = Mock.mock({
			//生成随机价格
			"price|100-400": 100,
			// Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			good_imgsrc: Random.dataImage("266x266", "我是图片"),
			// Random.cname() 随机生成一个常见的中文姓名
			good_name: "我是商品-" + Random.cname(),
			//Random.id() 生成随机的id
			good_id: Random.id()
		});
		goodsData.push(newGoodsObject);
	}

	return {
		goodsData
	};
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock("/mock/goods", "get", goodsData);

// mock 商品详细数据
const productDetail = function() {
	let productDetail = Mock.mock({
		//生成随机地址
		area: Random.city(true),
		//生成随机的评论条数
		"comment_num|1-100": 100
	});

	return productDetail;
};

Mock.mock(/\/mock\/goods\/\d/, "get", productDetail);

//mock 评论信息
const commentObj = function(comment_num) {
	let commentArray = [];
	for (let i = 0; i < comment_num; i++) {
		let commentObj = Mock.mock({
			//生成随机头像
			comment_avatar: Random.dataImage("56x56", "头像"),
			//生成随机名字
			comment_name: Random.name(),
			//生成随机日期
			comment_date: Random.date(),
			//生成随机内容
			comment_detail: Random.cparagraph(1, 3)
		});
		commentArray.push(commentObj);
	}
	return {
		commentArray
	};
};

Mock.mock(/\/comment\/\d/, "get", function(options) {
	let comment_num = options.url.split("?")[1].replace(/[^0-9]/gi, "");
	return commentObj(comment_num);
});

// mock 登录用户
const productUser = function() {
	let productUser = Mock.mock({
		//生成名字
		user_name: Random.cname(),
		//生成随机的头像
		user_avatar: Random.dataImage("90x88", "头像")
	});

	return productUser;
};

Mock.mock("/mock/user", "get", productUser);
