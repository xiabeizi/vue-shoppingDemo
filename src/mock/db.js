// 引入mockjs
const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;

module.exports = function() {
	const sqlData = {
		//首页商品信息
		goodsData: [],
		//商品评论信息
		goodsCommentDate: [],
		//用户登录
		user: {
			name: Random.cname(),
			avatar: Random.image("155x155", Random.hex())
		},
		//用户购物车
		userTrolley: [],
		//已完成的订单
		userOrder: []
	};

	// mock 首页展示需要的商品数据
	const goodsData = function() {
		for (let i = 8; i > 0; i--) {
			let goodsObject = Mock.mock({
				//生成随机价格
				"price|100-400": 100,
				// Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
				imgsrc: Random.image("155x155", Random.hex()),
				// Random.cname() 随机生成一个常见的中文姓名
				name: "我是商品-" + Random.cname(),
				//Random.id() 生成随机的id
				id: Random.id(),
				//生成随机地址
				area: Random.city(true),
				//生成随机的评论条数
				"comment_num|1-10": 10
			});
			sqlData.goodsData.push(goodsObject);
			//根据生成的商品的id，再生成不同页面需要的信息
			goodsCommentDate(({ id, comment_num } = goodsObject));
		}
	};

	// //mock 商品的评论信息
	const goodsCommentDate = function({ id, comment_num }) {
		let temp = { id, commentArray: [] };
		for (let i = comment_num; i > 0; i--) {
			let commentObj = Mock.mock({
				//生成随机头像
				avatar: Random.image("56x56", Random.hex()),
				//生成随机名字
				name: Random.name(),
				//生成随机日期
				date: Random.date(),
				//生成随机内容
				detail: Random.cparagraph(1, 3)
			});
			temp.commentArray.push(commentObj);
		}
		sqlData.goodsCommentDate.push(temp);
	};

	goodsData();
	return sqlData;
};

// // mock 登录用户
// const productUser = function() {
// 	let productUser = Mock.mock({
// 		//生成名字
// 		user_name: Random.cname(),
// 		//生成随机的头像
// 		user_avatar: Random.dataImage("90x88", "头像")
// 	});

// 	return productUser;
// };

// Mock.mock("/mock/user", "get", productUser);
