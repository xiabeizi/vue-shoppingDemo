<template>
	<div>
		<myHeader headerTitle="商品详情"></myHeader>
		<div class="detail-card">
			<img class="detail-img"
			     :src="productDetail.imgsrc">
			<div class="detail-meta">
				<div class="detail-name">{{productDetail.name}}</div>
				<div class="detail-area">{{productDetail.area}}</div>
				<div class="detail-price">
					<div class="detail-money">￥</div>
					<span> {{productDetail.price}} </span>
				</div>
			</div>
		</div>
		<div class="sup-card">
			<ul class="server">
				<li>
					<img class="server-sup"
					     src="../../commom/images/check-yellow.png"> 7天免费退货
				</li>
				<li>
					<img class="server-sup"
					     src="../../commom/images/check-yellow.png"> 24小时内发货并配送运费险
				</li>
			</ul>
			<router-link tag="div"
			             class="comment"
			             :to="'/comment/' + productDetail.id">
				<span class="comment-text">已买评价</span>
				<div>
					<span class="comment-num">{{ productDetail.comment_num }}条</span>
					<img class="comment-arrow"
					     src="../../commom/images/grey-arrow.png">
				</div>
			</router-link>
		</div>
		<div class="opr-btn">
			<a class="side-btn"
			   @click="addToTrolley">
				加入购物车
			</a>
			<a class="main-btn"
			   @click="checkOut">
				立即购买
			</a>
		</div>
		<toast :showPopup="showPopup"
		       @toggleShowPopup="toggleShowPopup"
		       :msg="msg"
		       :onEnsure="onEnsure"></toast>
	</div>
</template>

<script>
import myHeader from "../header/header.vue";
import toast from "../../components/toast/toast";

export default {
	components: { myHeader, toast },
	data() {
		return {
			showPopup: false,
			msg: "",
			productDetail: {},
			//prevId判断id是否发生变化以确定要不要重新请求数据
			prevId: 0
		};
	},
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		}
	},
	methods: {
		toggleShowPopup(boolean) {
			this.showPopup = boolean;
		},
		onEnsure() {
			this.$router.push({ path: "/trolley" });
		},
		addToTrolley() {
			if (!this.isLogin) {
				this.msg = "还没有登录哦亲, <br>是否跳转到登录页面？";
				this.toggleShowPopup(true);
				this.onEnsure = function() {
					this.$router.push({ path: "/user" });
				};
			} else {
				this.$store.dispatch("addToTrolley", {
					good: this.productDetail
				});
				this.msg = "加入购物车成功, <br>是否跳转到购物车页面？";
				this.toggleShowPopup(true);
				this.onEnsure = function() {
					this.$router.push({ path: "/trolley" });
				};
			}
		},
		checkOut() {
			if (!this.isLogin) {
				this.msg = "还没有登录哦亲, <br>是否跳转到登录页面？";
				this.toggleShowPopup(true);
				this.onEnsure = function() {
					this.$router.push({ path: "/user" });
				};
			} else {
				let id = this.productDetail.id;
				let arr = [id];
				this.$store.dispatch("addToTrolley", { arr });
				this.msg = "购买成功, <br>是否跳转回首页？";
				this.toggleShowPopup(true);
				this.onEnsure = function() {
					this.$router.push({ path: "/home" });
				};
			}
		}
	},
	created() {
		let id = this.$route.params.id;
		this.prevId = id;
		//初始化 请求商品数据
		this.$api.getProductDetail(id).then(Response => {
			this.productDetail = Response.data;
		});
		//隐藏tab烂
		this.$store.commit("toggleTabbar", false);
	},
	activated() {
		let id = this.$route.params.id;
		//判断id是否发生变化
		if (id !== this.prevId) {
			this.$api.getProductDetail(id).then(Response => {
				this.productDetail = Response.data;
			});
		}
		//隐藏tab烂
		this.$store.commit("toggleTabbar", false);
	},
	deactivated() {
		//显示tab栏
		this.$store.commit("toggleTabbar", true);
	}
};
</script>

<style lang="scss">
@import "../../commom/sass/base.scss";
// 商品信息
.detail-card {
	margin-top: $header-height;
	height: px2rem(486);
	background: $cardbg;
	text-align: center;
	.detail-img {
		width: px2rem(312);
		height: px2rem(312);
	}
	.detail-meta {
		padding: 0 px2rem(34) 0 px2rem(40);
		height: px2rem(175);
		.detail-name {
			margin-top: px2rem(42);
			font-size: px2rem(32);
			color: #4a4a52;
			text-align: left;
		}
		.detail-area {
			margin-top: px2rem(14);
			font-size: px2rem(24);
			color: #8b8b8b;
			text-align: left;
		}
		.detail-price {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: px2rem(64);
			line-height: px2rem(64);
			.detail-money {
				margin-right: px2rem(5);
				width: px2rem(40);
				height: px2rem(40);
				background: $icon-bhColor;
				color: $icon-fontColor;
				border-radius: 50%;
				font-size: px2rem(26);
				line-height: px2rem(40);
				text-align: center;
			}
			> span {
				font-size: px2rem(26);
				color: #000;
			}
		}
	}
}
// 服务支持
.sup-card {
	margin: px2rem(22);
	padding: 0 px2rem(22) 0 px2rem(24);
	height: px2rem(222);
	background: $cardbg;
	@include bdrs;
	@include base-boxshadow;
	.server {
		padding: px2rem(36) px2rem(12) px2rem(32);
		border-bottom: 2px solid #eaeaea;
		font-size: px2rem(20);
		line-height: px2rem(40);
		color: #34373e;
		.server-sup {
			width: px2rem(18);
			height: px2rem(14);
			vertical-align: middle;
		}
	}
	.comment {
		display: flex;
		justify-content: space-between;
		padding: px2rem(28) px2rem(8) px2rem(20) px2rem(10);
		font-size: px2rem(24);
		.comment-text {
			color: #4a4a52;
		}
		.comment-num {
			color: #8b8b8b;
		}
		.comment-arrow {
			width: px2rem(8);
			height: px2rem(16);
		}
	}
}
//操作按钮
.opr-btn {
	position: fixed;
	z-index: 1;
	display: flex;
	width: 100%;
	bottom: 0;
	.main-btn,
	.side-btn {
		display: block;
		width: 50%;
		height: px2rem(82);
		line-height: px2rem(82);
		text-align: center;
		font-size: px2rem(24);
		color: #34373e;
	}
	.main-btn {
		background: $themeColor;
	}
	.side-btn {
		background: $sideBtnColor;
	}
}
</style>
